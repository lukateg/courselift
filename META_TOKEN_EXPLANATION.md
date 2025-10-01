# Why META_CAPI_ACCESS_TOKEN and META_CRM_ACCESS_TOKEN Are the Same

## TL;DR

**YES** - They are the **same token**. You only need **one** Conversions API access token from Meta.

## Proof

### 1. From Your conversionAPI.md Documentation

Line 67 states:
> "Create an access token for your **dataset (formerly known as pixel)**"

**Key insight**: Dataset and Pixel are the same thing in Meta's system!

### 2. Same API Endpoint

Both regular Conversions API and CRM Conversions API use the **same endpoint pattern**:

**Regular CAPI** (for pixel events):
```
https://graph.facebook.com/v18.0/{PIXEL_ID}/events
```

**CRM CAPI** (for lead events):
```
https://graph.facebook.com/v23.0/{DATASET_ID}/events
```

Notice: Same `/events` endpoint, just different API versions. The `PIXEL_ID` and `DATASET_ID` are the same number!

### 3. Meta's Official Documentation

From your conversionAPI.md:
```
https://graph.facebook.com/v23.0/2780431635496611/events?access_token=ACCESS_TOKEN
```

This is the **exact same pattern** as the regular Conversions API, proving they use the same authentication.

### 4. The Token Meta Provides

You received from Meta:
```
Conversion api access token:
EAAJK2YlIoAcBPvfHX5hsV0KlOnESOWpLSkmOPGnjWdD6WpX3fg6qZAYWqjfQcwyZBZBvi9uu4VRocIYsHSX4yGLFEONtoWuGB0CNZCkyBsSl8E3ZCnAjZC2m18kOLjUu8VdkxSqoinUHqblZBFlwG2Af4jZCLZAyh05bGGS7GnFZBTIO2fvuZB2BdMvxZCv3F855ubUU6AZDZD
```

This **one token** is used for:
- ✅ Regular pixel event tracking (PageView, Lead, etc.)
- ✅ CRM lead conversion tracking
- ✅ Server-side Conversions API calls
- ✅ All events sent to your pixel/dataset

## How This Works in Practice

### What You Need:

1. **One Access Token**: `META_CAPI_ACCESS_TOKEN`
2. **One Pixel/Dataset ID**: `NEXT_PUBLIC_META_PIXEL_ID` (or `META_DATASET_ID`)

### Your .env.local Should Look Like:

```bash
# Single Conversions API token (works for everything!)
META_CAPI_ACCESS_TOKEN=EAAJK2YlIoAcBPvfHX5hsV0KlOnESOWpLSkmOPGnjWdD6WpX3fg6qZAYWqjfQcwyZBZBvi9uu4VRocIYsHSX4yGLFEONtoWuGB0CNZCkyBsSl8E3ZCnAjZC2m18kOLjUu8VdkxSqoinUHqblZBFlwG2Af4jZCLZAyh05bGGS7GnFZBTIO2fvuZB2BdMvxZCv3F855ubUU6AZDZD

# Your Pixel/Dataset ID (use the one from your conversionAPI.md)
NEXT_PUBLIC_META_PIXEL_ID=2780431635496611
```

That's it! No separate `META_CRM_ACCESS_TOKEN` needed.

## Why the Confusion?

In the initial implementation, I incorrectly created two separate environment variables:
- ❌ `META_CAPI_ACCESS_TOKEN` - for regular pixel events
- ❌ `META_CRM_ACCESS_TOKEN` - for CRM conversion events

This was **wrong** because:
1. Meta only provides **one** Conversions API token
2. Dataset and Pixel are the **same entity**
3. Both types of events use the **same API endpoint**

## What Changed in the Code

### Before (Incorrect):
```typescript
// In lib/meta-crm-conversion.ts
const accessToken = process.env.META_CRM_ACCESS_TOKEN; // ❌ Wrong!
const datasetId = process.env.META_DATASET_ID;
```

### After (Correct):
```typescript
// In lib/meta-crm-conversion.ts
const accessToken = process.env.META_CAPI_ACCESS_TOKEN; // ✅ Correct!
const datasetId = process.env.META_DATASET_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
```

Now both regular pixel tracking AND CRM conversion tracking use the **same token**.

## Testing

To verify everything works:

```bash
# Check health of CRM conversion endpoint
curl http://localhost:3000/api/meta-crm-conversion
```

Should return:
```json
{
  "status": "ok",
  "service": "Meta CRM Conversions API",
  "configured": true,
  "usingPixelId": true,
  "datasetId": "2780..."
}
```

## Summary

- ✅ **One token** for all Conversions API calls
- ✅ Dataset ID = Pixel ID (same thing)
- ✅ Simpler configuration
- ✅ Matches Meta's official documentation
- ✅ Your token from Meta works for everything

You were 100% correct to question this! 🎯

