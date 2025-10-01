import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import PostHogClient from "@/lib/posthog";

interface ServerEventData {
  eventName: string;
  eventId: string;
  parameters: Record<string, any>;
  customData: Record<string, any>;
  timestamp: number;
  sourceUrl: string;
  userAgent: string;
}

interface FacebookEventData {
  event_name: string;
  event_time: number;
  event_id: string;
  event_source_url: string;
  user_data: {
    client_ip_address?: string;
    client_user_agent: string;
    fbc?: string;
    fbp?: string;
    em?: string[]; // Hashed emails
    ph?: string[]; // Hashed phone numbers
  };
  custom_data: Record<string, any>;
}

/**
 * Hash email or phone for Facebook's requirements
 */
function hashValue(value: string): string {
  return crypto
    .createHash("sha256")
    .update(value.toLowerCase().trim())
    .digest("hex");
}

/**
 * Get client IP address from request headers
 */
function getClientIP(request: NextRequest): string | undefined {
  // Check various headers for IP (in order of preference)
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }

  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // Fallback (may not be available in all environments)
  return request.ip;
}

/**
 * Convert our tracking data to Facebook CAPI format
 */
function convertToFacebookEvent(
  data: ServerEventData,
  clientIP?: string,
  fbCookies?: { fbc?: string; fbp?: string }
): FacebookEventData {
  const fbEvent: FacebookEventData = {
    event_name: data.eventName,
    event_time: data.timestamp,
    event_id: data.eventId,
    event_source_url: data.sourceUrl,
    user_data: {
      client_user_agent: data.userAgent,
    },
    custom_data: {
      ...data.parameters,
      ...data.customData,
    },
  };

  // Add IP address if available
  if (clientIP) {
    fbEvent.user_data.client_ip_address = clientIP;
  }

  // Add Facebook cookies if available
  if (fbCookies?.fbc) {
    fbEvent.user_data.fbc = fbCookies.fbc;
  }
  if (fbCookies?.fbp) {
    fbEvent.user_data.fbp = fbCookies.fbp;
  }

  // Hash email if present in custom data
  if (data.customData.email) {
    fbEvent.user_data = {
      ...fbEvent.user_data,
      em: [hashValue(data.customData.email)],
    };
    // Remove from custom_data to avoid duplication
    delete fbEvent.custom_data.email;
  }

  return fbEvent;
}

/**
 * Send event to Facebook Conversions API
 */
async function sendToFacebookCAPI(
  events: FacebookEventData[]
): Promise<boolean> {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  if (!accessToken || !pixelId) {
    console.error("Missing Meta CAPI credentials");
    return false;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: events,
          access_token: accessToken,
          partner_agent: "courselift_v1.0", // Your app identifier
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Facebook CAPI Error:", result);
      return false;
    }

    console.log("Successfully sent to Facebook CAPI:", result);
    return true;
  } catch (error) {
    console.error("Facebook CAPI Request Failed:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: ServerEventData = await request.json();

    // Validate required fields
    if (!data.eventName || !data.eventId || !data.timestamp) {
      return NextResponse.json(
        { error: "Missing required event data" },
        { status: 400 }
      );
    }

    // Get client IP
    const clientIP = getClientIP(request);

    // Extract Facebook cookies from request headers
    const cookieHeader = request.headers.get("cookie") || "";
    const fbCookies = {
      fbc: extractCookieValue(cookieHeader, "_fbc"),
      fbp: extractCookieValue(cookieHeader, "_fbp"),
    };

    // Convert to Facebook CAPI format
    const fbEvent = convertToFacebookEvent(data, clientIP, fbCookies);

    // Send to Facebook CAPI
    const success = await sendToFacebookCAPI([fbEvent]);

    if (success) {
      // Send to PostHog
      try {
        const posthogClient = PostHogClient();
        await posthogClient.capture({
          distinctId: data.eventId,
          event: data.eventName,
          timestamp: new Date(data.timestamp),
          properties: {
            ...data.parameters,
            ...data.customData,
            sourceUrl: data.sourceUrl,
            userAgent: data.userAgent,
          },
        });
      } catch (err) {
        console.error("PostHog capture error:", err);
      }

      return NextResponse.json({ success: true, eventId: data.eventId });
    } else {
      return NextResponse.json(
        { error: "Failed to send to Facebook CAPI" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Track Event API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Extract cookie value from cookie string
 */
function extractCookieValue(
  cookieString: string,
  cookieName: string
): string | undefined {
  const match = cookieString.match(new RegExp(`${cookieName}=([^;]+)`));
  return match ? match[1] : undefined;
}

// Also handle GET requests for health checks
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Meta Pixel CAPI Endpoint",
    timestamp: new Date().toISOString(),
  });
}
