/**
 * Meta CRM Conversions API Integration
 * For tracking lead status changes through Meta's CRM Conversion API
 * Based on: https://developers.facebook.com/docs/marketing-api/conversions-api/crm-integration
 */

import crypto from "crypto";

/**
 * Standard lead stages that can be tracked
 */
export enum LeadStage {
  LEAD = "Lead", // Initial lead captured
  QUALIFIED = "Qualified", // Lead has been qualified
  OPPORTUNITY = "Opportunity", // Converted to sales opportunity
  CUSTOMER = "Customer", // Converted to paying customer
}

/**
 * User data that should be hashed before sending to Meta
 */
interface UserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  dateOfBirth?: string; // Format: YYYYMMDD
  gender?: "m" | "f"; // m or f
  leadId?: string; // Meta-generated 15-17 digit lead ID (if available)
}

/**
 * Meta CRM Conversion Event structure
 */
interface MetaCRMConversionEvent {
  event_name: string;
  event_time: number; // UNIX timestamp
  action_source: "system_generated";
  custom_data: {
    event_source: "crm";
    lead_event_source: string; // Your CRM name (e.g., "Beehiiv", "HubSpot")
  };
  user_data: {
    em?: string[]; // Hashed email(s)
    ph?: string[]; // Hashed phone(s)
    fn?: string[]; // Hashed first name(s)
    ln?: string[]; // Hashed last name(s)
    ct?: string[]; // Hashed city
    st?: string[]; // Hashed state
    zp?: string[]; // Hashed zip/postal code
    country?: string[]; // Hashed country
    db?: string[]; // Hashed date of birth
    ge?: string[]; // Hashed gender
    lead_id?: number; // Meta-generated lead ID
    fbc?: string; // Facebook click ID cookie
    fbp?: string; // Facebook browser ID cookie
  };
}

/**
 * Response from Meta CRM Conversions API
 */
interface MetaCRMConversionResponse {
  events_received: number;
  messages: string[];
  fbtrace_id: string;
}

/**
 * Hash a value using SHA-256 as required by Meta
 */
function hashValue(value: string): string {
  if (!value) return "";
  return crypto
    .createHash("sha256")
    .update(value.toLowerCase().trim())
    .digest("hex");
}

/**
 * Normalize and hash user data according to Meta's requirements
 */
function hashUserData(userData: UserData): MetaCRMConversionEvent["user_data"] {
  const hashed: MetaCRMConversionEvent["user_data"] = {};

  // Hash email
  if (userData.email) {
    hashed.em = [hashValue(userData.email)];
  }

  // Hash phone (remove non-digits first)
  if (userData.phone) {
    const cleanPhone = userData.phone.replace(/\D/g, "");
    hashed.ph = [hashValue(cleanPhone)];
  }

  // Hash first name
  if (userData.firstName) {
    hashed.fn = [hashValue(userData.firstName)];
  }

  // Hash last name
  if (userData.lastName) {
    hashed.ln = [hashValue(userData.lastName)];
  }

  // Hash city
  if (userData.city) {
    hashed.ct = [hashValue(userData.city)];
  }

  // Hash state (use 2-letter state code)
  if (userData.state) {
    hashed.st = [hashValue(userData.state)];
  }

  // Hash zip code (remove spaces, hyphens)
  if (userData.zipCode) {
    const cleanZip = userData.zipCode.replace(/[\s-]/g, "");
    hashed.zp = [hashValue(cleanZip)];
  }

  // Hash country (use 2-letter country code)
  if (userData.country) {
    hashed.country = [hashValue(userData.country)];
  }

  // Hash date of birth (format: YYYYMMDD)
  if (userData.dateOfBirth) {
    hashed.db = [hashValue(userData.dateOfBirth)];
  }

  // Hash gender (m or f)
  if (userData.gender) {
    hashed.ge = [hashValue(userData.gender)];
  }

  // Lead ID (not hashed - this is the Meta-generated ID)
  if (userData.leadId) {
    hashed.lead_id = parseInt(userData.leadId, 10);
  }

  return hashed;
}

/**
 * Create a Meta CRM Conversion event payload
 */
export function createCRMConversionEvent(
  leadStage: LeadStage | string,
  userData: UserData,
  crmSource: string = "Beehiiv",
  additionalData?: {
    fbc?: string; // Facebook click ID
    fbp?: string; // Facebook browser ID
    eventTime?: number; // Custom timestamp (defaults to now)
  }
): MetaCRMConversionEvent {
  const event: MetaCRMConversionEvent = {
    event_name: leadStage,
    event_time: additionalData?.eventTime || Math.floor(Date.now() / 1000),
    action_source: "system_generated",
    custom_data: {
      event_source: "crm",
      lead_event_source: crmSource,
    },
    user_data: hashUserData(userData),
  };

  // Add Facebook tracking cookies if available
  if (additionalData?.fbc) {
    event.user_data.fbc = additionalData.fbc;
  }
  if (additionalData?.fbp) {
    event.user_data.fbp = additionalData.fbp;
  }

  return event;
}

/**
 * Send CRM conversion event(s) to Meta
 */
export async function sendCRMConversionToMeta(
  events: MetaCRMConversionEvent | MetaCRMConversionEvent[]
): Promise<{
  success: boolean;
  response?: MetaCRMConversionResponse;
  error?: string;
}> {
  // Use the same Conversions API token as regular CAPI
  // Dataset and Pixel are the same thing in Meta's system
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const datasetId =
    process.env.META_DATASET_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;

  if (!accessToken) {
    console.error("Missing META_CAPI_ACCESS_TOKEN environment variable");
    return { success: false, error: "Missing access token" };
  }

  if (!datasetId) {
    console.error(
      "Missing META_DATASET_ID or NEXT_PUBLIC_META_PIXEL_ID environment variable"
    );
    return { success: false, error: "Missing dataset/pixel ID" };
  }

  // Ensure events is an array
  const eventsArray = Array.isArray(events) ? events : [events];

  try {
    const url = `https://graph.facebook.com/v23.0/${datasetId}/events`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: eventsArray,
        access_token: accessToken,
      }),
    });

    const result: MetaCRMConversionResponse = await response.json();

    if (!response.ok) {
      console.error("Meta CRM Conversion API Error:", {
        status: response.status,
        result,
      });
      return {
        success: false,
        error: `API returned ${response.status}: ${JSON.stringify(result)}`,
      };
    }

    return { success: true, response: result };
  } catch (error) {
    console.error("Meta CRM Conversion API Request Failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send a test event to verify integration
 * Test events appear in Events Manager under the "Test events" tab
 */
export async function sendTestCRMConversion(
  testEventCode: string,
  userData: UserData
): Promise<{ success: boolean; response?: any; error?: string }> {
  // Use the same Conversions API token as regular CAPI
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const datasetId =
    process.env.META_DATASET_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;

  if (!accessToken || !datasetId) {
    return { success: false, error: "Missing Meta credentials" };
  }

  const testEvent = createCRMConversionEvent(LeadStage.LEAD, userData);

  try {
    const url = `https://graph.facebook.com/v23.0/${datasetId}/events`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [testEvent],
        test_event_code: testEventCode,
        access_token: accessToken,
      }),
    });

    const result = await response.json();

    return { success: response.ok, response: result };
  } catch (error) {
    console.error("Test event failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
