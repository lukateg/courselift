import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest) {
  try {
    const body: SubscribeRequest = await request.json();
    const { email, name, courseTopic } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

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
