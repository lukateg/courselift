/**
 * Meta Pixel event tracking utilities
 * Handles graceful degradation when tracking is blocked or disabled
 */

interface EventParameters {
  [key: string]: string | number | boolean;
}

/**
 * Safely track Meta Pixel events with error handling
 */
export function trackEvent(
  eventName: string,
  parameters?: EventParameters
): void {
  try {
    if (typeof window !== "undefined" && window.fbq) {
      if (parameters) {
        window.fbq("trackCustom", eventName, parameters);
      } else {
        window.fbq("track", eventName);
      }
    }
  } catch (error) {
    // Silently fail - don't break user experience if tracking fails
    console.debug("Tracking failed:", error);
  }
}

/**
 * Track standard Meta Pixel events
 */
export const trackStandardEvent = {
  // Lead generation event (most important for your waitlist)
  lead: (parameters?: EventParameters) => {
    trackEvent("Lead", parameters);
  },

  // Complete registration (for successful waitlist signup)
  completeRegistration: (parameters?: EventParameters) => {
    trackEvent("CompleteRegistration", parameters);
  },

  // View content (for video plays, FAQ opens, etc.)
  viewContent: (parameters?: EventParameters) => {
    trackEvent("ViewContent", parameters);
  },

  // Initiate checkout (if you add paid options later)
  initiateCheckout: (parameters?: EventParameters) => {
    trackEvent("InitiateCheckout", parameters);
  },
};

/**
 * Track custom events specific to your landing page
 */
export const trackCustomEvent = {
  // Waitlist signup attempt (before API call)
  waitlistStart: (source: string) => {
    trackEvent("WaitlistStart", {
      event_source: source,
      content_name: "course_waitlist",
      content_category: "lead_generation",
    });
  },

  // Successful waitlist signup (after API success)
  waitlistComplete: (email: string, source: string) => {
    trackEvent("WaitlistComplete", {
      event_source: source,
      content_name: "course_waitlist",
      content_category: "lead_generation",
    });

    // Also track as Lead and CompleteRegistration for Facebook optimization
    trackStandardEvent.lead({
      content_name: "course_waitlist",
      value: 1, // Assign value for optimization
      currency: "USD",
    });

    trackStandardEvent.completeRegistration({
      content_name: "course_waitlist",
      status: "completed",
    });
  },

  // Video interaction events
  videoPlay: (videoName: string, position: "hero" | "content") => {
    trackEvent("VideoPlay", {
      content_name: videoName,
      content_type: "video",
      video_position: position,
    });

    // Also track as ViewContent
    trackStandardEvent.viewContent({
      content_type: "video",
      content_name: videoName,
    });
  },

  videoPause: (videoName: string, watchTime: number) => {
    trackEvent("VideoPause", {
      content_name: videoName,
      content_type: "video",
      watch_time_seconds: watchTime,
    });
  },

  videoComplete: (videoName: string, totalDuration: number) => {
    trackEvent("VideoComplete", {
      content_name: videoName,
      content_type: "video",
      duration_seconds: totalDuration,
    });
  },

  // Modal interactions
  modalOpen: (modalType: string, trigger: string) => {
    trackEvent("ModalOpen", {
      modal_type: modalType,
      trigger_source: trigger,
    });
  },

  modalClose: (modalType: string, method: string) => {
    trackEvent("ModalClose", {
      modal_type: modalType,
      close_method: method,
    });
  },

  // Section engagement
  sectionView: (sectionName: string) => {
    trackEvent("SectionView", {
      section_name: sectionName,
      content_name: "landing_page",
    });
  },

  // CTA clicks (for non-conversion CTAs)
  ctaClick: (ctaText: string, location: string) => {
    trackEvent("CTAClick", {
      cta_text: ctaText,
      cta_location: location,
      content_name: "landing_page",
    });
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
