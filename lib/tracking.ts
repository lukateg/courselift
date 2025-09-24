/**
 * Meta Pixel event tracking utilities with CAPI support
 * Handles both client-side pixel and server-side Conversions API
 */

// Extend window type for Meta Pixel
// declare global {
//   interface Window {
//     fbq: any;
//   }
// }

interface EventParameters {
  [key: string]: string | number | boolean;
}

interface TrackingOptions {
  eventId?: string;
  sendToServer?: boolean;
  customData?: Record<string, any>;
}

// Standard Meta events that should use fbq('track')
const STANDARD_EVENTS = new Set([
  "PageView",
  "ViewContent",
  "Search",
  "AddToCart",
  "AddToWishlist",
  "InitiateCheckout",
  "AddPaymentInfo",
  "Purchase",
  "Lead",
  "CompleteRegistration",
  "Contact",
  "CustomizeProduct",
  "Donate",
  "FindLocation",
  "Schedule",
  "StartTrial",
  "SubmitApplication",
  "Subscribe",
]);

/**
 * Generate a unique event ID for deduplication between pixel and CAPI
 */
export function generateEventId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Track Meta Pixel events with proper standard/custom distinction
 */
export function trackEvent(
  eventName: string,
  parameters?: EventParameters,
  options: TrackingOptions = {}
): void {
  try {
    if (typeof window === "undefined") return;

    const {
      eventId = generateEventId(),
      sendToServer = false,
      customData = {},
    } = options;
    const isStandardEvent = STANDARD_EVENTS.has(eventName);

    // Client-side pixel tracking
    if (window.fbq) {
      const trackingParams = {
        ...parameters,
        ...(eventId && { eventID: eventId }), // Add eventID for deduplication
      };

      if (isStandardEvent) {
        // Use fbq('track') for standard events
        if (Object.keys(trackingParams).length > 0) {
          window.fbq("track", eventName, trackingParams);
        } else {
          window.fbq("track", eventName);
        }
      } else {
        // Use fbq('trackCustom') for custom events
        window.fbq("trackCustom", eventName, trackingParams);
      }
    }

    // Server-side CAPI tracking (for important conversion events)
    if (sendToServer) {
      const userData = getUserData();
      const serverEventData = {
        eventName,
        eventId,
        parameters: parameters || {},
        customData: {
          ...customData,
          ...userData, // Include Facebook cookies and user agent
        },
        timestamp: Math.floor(Date.now() / 1000),
        sourceUrl: window.location.href,
        userAgent: navigator.userAgent,
      };

      // Send to server-side API route (non-blocking)
      fetch("/api/track-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: document.cookie, // Pass cookies for _fbc and _fbp extraction
        },
        body: JSON.stringify(serverEventData),
      }).catch((error) => {
        console.debug("Server-side tracking failed:", error);
      });
    }
  } catch (error) {
    // Silently fail - don't break user experience if tracking fails
    console.debug("Client-side tracking failed:", error);
  }
}

/**
 * Track standard Meta Pixel events with enhanced options
 */
export const trackStandardEvent = {
  // Page view (handled by pixel component)
  pageView: (parameters?: EventParameters, options?: TrackingOptions) => {
    trackEvent("PageView", parameters, options);
  },

  // Lead generation event (most important for your waitlist)
  lead: (parameters?: EventParameters, options?: TrackingOptions) => {
    trackEvent("Lead", parameters, { sendToServer: true, ...options });
  },

  // Complete registration (for successful waitlist signup)
  completeRegistration: (
    parameters?: EventParameters,
    options?: TrackingOptions
  ) => {
    trackEvent("CompleteRegistration", parameters, {
      sendToServer: true,
      ...options,
    });
  },

  // View content (for video plays, FAQ opens, etc.)
  viewContent: (parameters?: EventParameters, options?: TrackingOptions) => {
    trackEvent("ViewContent", parameters, options);
  },

  // Initiate checkout (if you add paid options later)
  initiateCheckout: (
    parameters?: EventParameters,
    options?: TrackingOptions
  ) => {
    trackEvent("InitiateCheckout", parameters, {
      sendToServer: true,
      ...options,
    });
  },

  // Contact form submissions
  contact: (parameters?: EventParameters, options?: TrackingOptions) => {
    trackEvent("Contact", parameters, { sendToServer: true, ...options });
  },
};

/**
 * Track custom events specific to your landing page
 */
export const trackCustomEvent = {
  // Waitlist signup attempt (before API call)
  waitlistStart: (source: string, options?: TrackingOptions) => {
    const eventId = options?.eventId || generateEventId();

    trackEvent(
      "WaitlistStart",
      {
        event_source: source,
        content_name: "course_waitlist",
        content_category: "lead_generation",
      },
      { eventId, ...options }
    );

    return eventId; // Return for use in subsequent events
  },

  // Successful waitlist signup (after API success)
  waitlistComplete: (email: string, source: string, startEventId?: string) => {
    const baseEventId = startEventId || generateEventId();

    // Track custom completion event
    trackEvent(
      "WaitlistComplete",
      {
        event_source: source,
        content_name: "course_waitlist",
        content_category: "lead_generation",
      },
      {
        eventId: `${baseEventId}_complete`,
        sendToServer: true,
        customData: { email_domain: email.split("@")[1] },
      }
    );

    // Track as standard Lead event with server-side backup
    trackStandardEvent.lead(
      {
        content_name: "course_waitlist",
        value: 1, // Assign value for optimization
        currency: "USD",
      },
      {
        eventId: `${baseEventId}_lead`,
        customData: { source, email_domain: email.split("@")[1], email },
      }
    );

    // Track as standard CompleteRegistration event
    trackStandardEvent.completeRegistration(
      {
        content_name: "course_waitlist",
        status: "completed",
      },
      {
        eventId: `${baseEventId}_registration`,
        customData: { source },
      }
    );
  },

  // Video interaction events
  videoPlay: (
    videoName: string,
    position: "hero" | "content",
    options?: TrackingOptions
  ) => {
    const eventId = options?.eventId || generateEventId();

    // Track custom video play event
    trackEvent(
      "VideoPlay",
      {
        content_name: videoName,
        content_type: "video",
        video_position: position,
      },
      { eventId: `${eventId}_custom`, ...options }
    );

    // Also track as standard ViewContent event
    trackStandardEvent.viewContent(
      {
        content_type: "video",
        content_name: videoName,
      },
      {
        eventId: `${eventId}_viewcontent`,
        customData: { video_position: position },
      }
    );
  },

  videoPause: (
    videoName: string,
    watchTime: number,
    options?: TrackingOptions
  ) => {
    trackEvent(
      "VideoPause",
      {
        content_name: videoName,
        content_type: "video",
        watch_time_seconds: watchTime,
      },
      options
    );
  },

  videoComplete: (
    videoName: string,
    totalDuration: number,
    options?: TrackingOptions
  ) => {
    trackEvent(
      "VideoComplete",
      {
        content_name: videoName,
        content_type: "video",
        duration_seconds: totalDuration,
      },
      { sendToServer: true, ...options }
    ); // Track completion on server too
  },

  // Modal interactions
  modalOpen: (
    modalType: string,
    trigger: string,
    options?: TrackingOptions
  ) => {
    trackEvent(
      "ModalOpen",
      {
        modal_type: modalType,
        trigger_source: trigger,
      },
      options
    );
  },

  modalClose: (
    modalType: string,
    method: string,
    options?: TrackingOptions
  ) => {
    trackEvent(
      "ModalClose",
      {
        modal_type: modalType,
        close_method: method,
      },
      options
    );
  },

  // Section engagement
  sectionView: (sectionName: string, options?: TrackingOptions) => {
    trackEvent(
      "SectionView",
      {
        section_name: sectionName,
        content_name: "landing_page",
      },
      options
    );
  },

  // CTA clicks (for non-conversion CTAs)
  ctaClick: (ctaText: string, location: string, options?: TrackingOptions) => {
    trackEvent(
      "CTAClick",
      {
        cta_text: ctaText,
        cta_location: location,
        content_name: "landing_page",
      },
      options
    );
  },
};

/**
 * Initialize user engagement tracking
 * Call this once when the page loads
 */
export function initEngagementTracking(): (() => void) | undefined {
  if (typeof window === "undefined") return;

  // Track time on page (send after 30 seconds)
  setTimeout(() => {
    trackEvent("TimeOnPage", {
      duration_seconds: 30,
      content_name: "landing_page",
    });
  }, 30000);

  // Track when user is about to leave (beforeunload)
  const handleBeforeUnload = () => {
    trackEvent("PageExit", {
      content_name: "landing_page",
    });
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  // Cleanup function (useful for SPA routing)
  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}

/**
 * Helper function to get user data for server-side events
 */
export function getUserData() {
  if (typeof window === "undefined") return {};

  return {
    client_ip_address: undefined, // Server will determine this
    client_user_agent: navigator.userAgent,
    fbc: getCookieValue("_fbc"), // Facebook click ID
    fbp: getCookieValue("_fbp"), // Facebook browser ID
  };
}

/**
 * Get cookie value by name
 */
function getCookieValue(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }

  return undefined;
}
