import { NextRequest, NextResponse } from "next/server";
import {
  createCRMConversionEvent,
  sendCRMConversionToMeta,
  LeadStage,
} from "@/lib/meta-crm-conversion";

interface SubscribeRequest {
  email: string;
  name?: string;
  courseTopic?: string;
}

interface BeehiivSubscriber {
  email: string;
  name?: string;
  custom_fields?: Record<string, any>;
  reactivate_existing?: boolean;
  send_welcome_email?: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

interface BeehiivResponse {
  data?: {
    id: string;
    email: string;
    status: string;
  };
  error?: {
    message: string;
    code?: string;
  };
}

/**
 * Extract cookie value from request headers
 */
function getCookieFromRequest(
  request: NextRequest,
  cookieName: string
): string | undefined {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(new RegExp(`${cookieName}=([^;]+)`));
  return match ? match[1] : undefined;
}

/**
 * Send conversion event to Meta CRM Conversions API
 * This is a non-blocking async function that tracks lead conversions
 */
async function sendMetaCRMConversion(
  email: string,
  name?: string,
  fbc?: string,
  fbp?: string
): Promise<void> {
  try {
    // Parse name into first and last name if provided
    const [firstName, ...lastNameParts] = (name || "").split(" ");
    const lastName = lastNameParts.join(" ");

    // Create and send the conversion event
    const event = createCRMConversionEvent(
      LeadStage.LEAD,
      {
        email,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
      },
      "Beehiiv", // CRM source name
      {
        fbc,
        fbp,
      }
    );

    const result = await sendCRMConversionToMeta(event);

    if (result.success) {
      console.log("Meta CRM conversion tracked successfully:", {
        email,
        traceId: result.response?.fbtrace_id,
      });
    } else {
      console.error("Failed to track Meta CRM conversion:", result.error);
    }
  } catch (error) {
    // Don't fail the subscription if conversion tracking fails
    console.error("Error sending Meta CRM conversion:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: SubscribeRequest = await request.json();
    const { email, name, courseTopic } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Extract Facebook tracking cookies for conversion attribution
    const fbc = getCookieFromRequest(request, "_fbc");
    const fbp = getCookieFromRequest(request, "_fbp");

    // Get environment variables
    const apiKey = process.env.BEEHIIV_API_KEY;
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

    if (!apiKey || !publicationId) {
      console.error("Missing Beehiiv API credentials");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Prepare subscriber data for Beehiiv API
    const subscriberData: BeehiivSubscriber = {
      email,
      reactivate_existing: true,
      send_welcome_email: true,
      utm_source: "website",
      utm_medium: "modal",
      utm_campaign: "waitlist",
    };

    // Add name if provided
    // if (name) {
    //   subscriberData.name = name;
    // }

    // Add course topic as custom field if provided
    // if (courseTopic) {
    //   subscriberData.custom_fields = {
    //     course_topic: courseTopic,
    //   };
    // }

    // Make request to Beehiiv API
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "User-Agent": "YourApp/1.0",
        },
        body: JSON.stringify(subscriberData),
      }
    );

    const responseData: BeehiivResponse = await response.json();

    if (!response.ok) {
      console.error("Beehiiv API Error:", {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      });

      // Handle specific error cases
      if (response.status === 400) {
        const errorMessage =
          responseData.error?.message || "Invalid request data";
        if (
          errorMessage.toLowerCase().includes("already exists") ||
          errorMessage.toLowerCase().includes("duplicate")
        ) {
          return NextResponse.json(
            {
              success: true,
              message: "You are already subscribed to our waitlist!",
            },
            { status: 200 }
          );
        }
        return NextResponse.json({ error: errorMessage }, { status: 400 });
      }

      if (response.status === 401) {
        return NextResponse.json(
          { error: "Authentication failed" },
          { status: 500 }
        );
      }

      if (response.status === 429) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: "Failed to subscribe to waitlist" },
        { status: 500 }
      );
    }

    // Track conversion in Meta CRM Conversions API
    // This runs asynchronously and doesn't block the response
    sendMetaCRMConversion(email, name, fbc, fbp);

    // Success response
    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to the waitlist!",
      subscriber: {
        id: responseData.data?.id,
        email: responseData.data?.email,
        status: responseData.data?.status,
      },
    });
  } catch (error) {
    console.error("Subscribe API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
