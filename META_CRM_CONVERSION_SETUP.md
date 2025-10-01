# Meta CRM Conversions API Setup Guide

This guide walks you through setting up Meta's CRM Conversions API to track lead conversions from your Beehiiv waitlist.

## What is Meta CRM Conversions API?

Meta's CRM Conversions API allows you to send lead status changes from your CRM (in this case, Beehiiv) directly to Meta. This helps Meta:
- Better attribute conversions to your ad campaigns
- Optimize ad delivery for quality leads
- Provide more accurate reporting

## Prerequisites

1. A Meta Business Account
2. A Meta Pixel or Dataset ID
3. An Access Token for the Conversions API

## Step 1: Get Your Dataset ID

Your Dataset ID (formerly called Pixel ID for CRM events) is where your lead conversion events will be sent.

**From the conversionAPI.md document:**
- Dataset ID: `2780431635496611`

This is already specified in the Meta integration guide you provided.

## Step 2: Create an Access Token

1. Go to [Meta Events Manager](https://business.facebook.com/events_manager)
2. Select your dataset/pixel
3. Go to **Settings** → **Conversions API**
4. Click **Generate Access Token**
5. Copy the token (it starts with something like `EAAxxxxx...`)

⚠️ **Important**: This is different from your regular Pixel access token. The CRM Conversions API requires a specific access token.

## Step 3: Set Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# Meta CRM Conversions API
META_CRM_ACCESS_TOKEN=your_access_token_here
META_DATASET_ID=2780431635496611

# Your existing Meta Pixel (for client-side tracking)
NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id_here

# Your existing Beehiiv credentials
BEEHIIV_API_KEY=your_beehiiv_api_key
BEEHIIV_PUBLICATION_ID=your_publication_id
```

### Where to Get These Values:

| Variable | Where to Find It |
|----------|------------------|
| `META_CRM_ACCESS_TOKEN` | Events Manager → Settings → Conversions API → Generate Access Token |
| `META_DATASET_ID` | From the conversionAPI.md (2780431635496611) or Events Manager → Dataset Settings |
| `NEXT_PUBLIC_META_PIXEL_ID` | Your existing Meta Pixel ID (client-side tracking) |

## Step 4: Test Your Integration

### Option A: Send a Test Event (Recommended First)

Test events appear in Events Manager under the "Test events" tab and don't affect your actual data.

1. Get a test event code from Events Manager:
   - Go to Events Manager → Test Events tab
   - Click "Test events" and note the code (e.g., `TEST12345`)

2. Send a test event using curl or Postman:

```bash
curl -X POST http://localhost:3000/api/meta-crm-conversion \
  -H "Content-Type: application/json" \
  -d '{
    "leadStage": "Lead",
    "userData": {
      "email": "test@example.com",
      "firstName": "Test",
      "lastName": "User"
    },
    "crmSource": "Beehiiv",
    "testEventCode": "TEST12345"
  }'
```

3. Check Events Manager → Test Events tab to see if the event appears (usually within seconds)

### Option B: Check API Configuration

```bash
curl http://localhost:3000/api/meta-crm-conversion
```

This should return:
```json
{
  "status": "ok",
  "service": "Meta CRM Conversions API",
  "configured": true,
  "datasetId": "2780...",
  "timestamp": "2025-10-01T..."
}
```

### Option C: Test Live Event

Simply subscribe to your waitlist through your website. The conversion will automatically be sent to Meta.

Check Events Manager → Data Sources → Your Dataset to see the event (appears within ~1 hour).

## Step 5: Monitor in Events Manager

1. Go to [Events Manager](https://business.facebook.com/events_manager)
2. Select your dataset (2780431635496611)
3. Check the **Overview** tab to see incoming events
4. Check the **Diagnostics** tab for any errors

### Expected Events

When someone subscribes to your waitlist, the following event is sent:

```json
{
  "event_name": "Lead",
  "event_time": 1673035686,
  "action_source": "system_generated",
  "custom_data": {
    "event_source": "crm",
    "lead_event_source": "Beehiiv"
  },
  "user_data": {
    "em": ["<hashed_email>"],
    "fn": ["<hashed_first_name>"],
    "ln": ["<hashed_last_name>"],
    "fbc": "<facebook_click_id>",
    "fbp": "<facebook_browser_id>"
  }
}
```

## How It Works

### Integration Flow

```
User Subscribes → Subscribe API → Beehiiv API → Meta CRM Conversions API
                                       ↓                    ↓
                                   (Primary)           (Attribution)
```

1. **User subscribes** through EmailCaptureModal
2. **Subscribe API** (`/api/subscribe`) receives the request
3. **Beehiiv API** is called to add the subscriber
4. **Meta CRM Conversion** is sent (non-blocking) with:
   - Hashed email address
   - Hashed name (if provided)
   - Facebook tracking cookies (fbc, fbp) for attribution
5. **Meta receives** the conversion and attributes it to ad campaigns

### Why Both Client-Side Pixel and Server-Side CRM API?

- **Client-Side Pixel**: Tracks user behavior on your site (page views, clicks, etc.)
- **Server-Side CRM API**: Tracks actual conversions (leads, customers) from your CRM
- **Together**: Provides complete attribution and deduplication via event IDs

## Troubleshooting

### Events Not Appearing in Events Manager

1. **Check environment variables** are set correctly
2. **Check server logs** for error messages
3. **Verify access token** is valid and has correct permissions
4. **Wait up to 1 hour** for events to appear (test events are faster)

### Common Errors

| Error | Solution |
|-------|----------|
| "Invalid OAuth access token" | Regenerate access token in Events Manager |
| "Dataset not found" | Verify META_DATASET_ID is correct |
| "Missing required field" | Ensure email is provided in userData |
| Events show in Test but not Production | Remove testEventCode from requests |

### Check Diagnostics

In Events Manager → Diagnostics, you can see:
- **Event Match Quality**: How well Meta matched your data
- **Customer Information**: Which fields were included
- **Errors**: Any validation or processing errors

### Improving Match Quality

To improve attribution accuracy, you can enhance the integration to include:
- Phone numbers (if collected)
- Location data (city, state, country)
- More precise timestamps
- Lead IDs (if you track Meta's lead form IDs)

## Advanced: Tracking Multiple Lead Stages

The system supports tracking different lead stages:

```typescript
import { LeadStage } from "@/lib/meta-crm-conversion";

// When someone joins waitlist
LeadStage.LEAD

// When someone is qualified (e.g., opens emails, engages)
LeadStage.QUALIFIED

// When someone becomes an opportunity (e.g., shows purchase intent)
LeadStage.OPPORTUNITY

// When someone becomes a customer (e.g., purchases course)
LeadStage.CUSTOMER
```

Example custom conversion:

```bash
curl -X POST http://localhost:3000/api/meta-crm-conversion \
  -H "Content-Type: application/json" \
  -d '{
    "leadStage": "Customer",
    "userData": {
      "email": "customer@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "crmSource": "Beehiiv"
  }'
```

## Data Privacy & Hashing

All personally identifiable information (PII) is automatically hashed using SHA-256 before being sent to Meta, as required by Meta's policies:

- ✅ Emails are hashed
- ✅ Phone numbers are hashed
- ✅ Names are hashed
- ✅ Location data is hashed
- ⚠️ Lead IDs are NOT hashed (they're Meta-generated IDs)

## API Reference

### POST /api/meta-crm-conversion

Send a CRM conversion event to Meta.

**Request Body:**
```typescript
{
  leadStage: "Lead" | "Qualified" | "Opportunity" | "Customer" | string;
  userData: {
    email: string;           // Required
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;          // 2-letter state code
    zipCode?: string;
    country?: string;        // 2-letter country code
    dateOfBirth?: string;    // Format: YYYYMMDD
    gender?: "m" | "f";
    leadId?: string;         // Meta-generated 15-17 digit ID
  };
  crmSource?: string;        // Default: "Beehiiv"
  trackingData?: {
    fbc?: string;            // Facebook click ID cookie
    fbp?: string;            // Facebook browser ID cookie
  };
  testEventCode?: string;    // For test events only
}
```

**Response:**
```typescript
{
  success: boolean;
  message?: string;
  eventsReceived?: number;
  traceId?: string;
  error?: string;
}
```

### GET /api/meta-crm-conversion

Health check and configuration status.

**Response:**
```typescript
{
  status: "ok";
  service: "Meta CRM Conversions API";
  configured: boolean;
  datasetId: string;
  timestamp: string;
}
```

## Files Created

- `lib/meta-crm-conversion.ts` - Core CRM conversion logic
- `app/api/meta-crm-conversion/route.ts` - API endpoint for manual tracking
- `app/api/subscribe/route.ts` - Updated to send conversions on signup
- `META_CRM_CONVERSION_SETUP.md` - This documentation

## Next Steps

1. ✅ Add environment variables to `.env.local`
2. ✅ Test with a test event code
3. ✅ Test with a real waitlist signup
4. ✅ Monitor Events Manager for incoming events
5. ✅ Check Diagnostics for any issues
6. ✅ Set up conversion tracking in your ad campaigns

## Resources

- [Meta Conversions API Documentation](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [CRM Integration Guide](https://developers.facebook.com/docs/marketing-api/conversions-api/crm-integration)
- [Events Manager](https://business.facebook.com/events_manager)
- [Payload Helper Tool](https://developers.facebook.com/docs/marketing-api/conversions-api/payload-helper)

## Support

If you encounter issues:
1. Check server logs for detailed error messages
2. Use Events Manager Diagnostics
3. Test with test events first
4. Verify all environment variables are set correctly

