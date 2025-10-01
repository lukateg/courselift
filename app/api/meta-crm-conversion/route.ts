import { NextRequest, NextResponse } from "next/server";
import {
  createCRMConversionEvent,
  sendCRMConversionToMeta,
  LeadStage,
  sendTestCRMConversion,
} from "@/lib/meta-crm-conversion";

/**
 * Request body for CRM conversion tracking
 */
interface CRMConversionRequest {
  leadStage: LeadStage | string;
  userData: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    dateOfBirth?: string;
    gender?: "m" | "f";
    leadId?: string;
  };
  crmSource?: string;
  trackingData?: {
    fbc?: string; // Facebook click ID
    fbp?: string; // Facebook browser ID
  };
  testEventCode?: string; // If provided, sends as test event
}

/**
 * POST /api/meta-crm-conversion
 * Send CRM lead conversion events to Meta
 */
export async function POST(request: NextRequest) {
  try {
    const body: CRMConversionRequest = await request.json();
    const { leadStage, userData, crmSource, trackingData, testEventCode } =
      body;

    // Validate required fields
    if (!leadStage) {
      return NextResponse.json(
        { error: "leadStage is required" },
        { status: 400 }
      );
    }

    if (!userData || !userData.email) {
      return NextResponse.json(
        { error: "userData with at least email is required" },
        { status: 400 }
      );
    }

    // Handle test event
    if (testEventCode) {
      const result = await sendTestCRMConversion(testEventCode, userData);
      return NextResponse.json(result);
    }

    // Create the conversion event
    const event = createCRMConversionEvent(
      leadStage,
      userData,
      crmSource || "Beehiiv",
      {
        fbc: trackingData?.fbc,
        fbp: trackingData?.fbp,
      }
    );

    // Send to Meta
    const result = await sendCRMConversionToMeta(event);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "CRM conversion event sent successfully",
        eventsReceived: result.response?.events_received,
        traceId: result.response?.fbtrace_id,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Meta CRM Conversion API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/meta-crm-conversion
 * Health check endpoint
 */
export async function GET() {
  const hasAccessToken = !!process.env.META_CAPI_ACCESS_TOKEN;
  const datasetId =
    process.env.META_DATASET_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const hasDatasetId = !!datasetId;

  return NextResponse.json({
    status: "ok",
    service: "Meta CRM Conversions API",
    configured: hasAccessToken && hasDatasetId,
    usingDatasetId: !!process.env.META_DATASET_ID,
    usingPixelId:
      !process.env.META_DATASET_ID && !!process.env.NEXT_PUBLIC_META_PIXEL_ID,
    datasetId: datasetId ? `${datasetId.substring(0, 4)}...` : "not set",
    timestamp: new Date().toISOString(),
  });
}
