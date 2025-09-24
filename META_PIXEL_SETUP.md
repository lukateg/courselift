# Meta Pixel & Conversions API Implementation Guide

## 🎯 Overview

This implementation provides a comprehensive Meta Pixel tracking setup with:
- ✅ Client-side Pixel tracking for immediate attribution
- ✅ Server-side Conversions API (CAPI) for enhanced reliability
- ✅ Event deduplication between client and server
- ✅ Proper standard vs custom event handling
- ✅ SPA-aware PageView tracking

## 🔧 Environment Variables Required

Add these to your `.env.local` file:

```bash
# Meta Pixel Configuration
NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id_here

# Meta Conversions API Configuration  
META_CAPI_ACCESS_TOKEN=your_capi_access_token_here

# Optional: Beehiiv Newsletter (if using)
BEEHIIV_API_KEY=your_beehiiv_api_key_here
BEEHIIV_PUBLICATION_ID=your_beehiiv_publication_id_here
```

## 📊 Event Setup Tool Configuration

**IMPORTANT**: To avoid duplicate events, disable these in Facebook's Event Setup Tool:

### ❌ DISABLE in Event Setup Tool:
- PageView tracking (handled by our code)
- Lead generation forms (handled by our code)
- Button clicks for signup/waitlist (handled by our code)
- Video play events (handled by our code)

### ✅ KEEP ENABLED in Event Setup Tool:
- URL-based tracking for pages not covered by our events
- Any third-party form integrations (if applicable)

## 🏗️ Implementation Details

### Standard Events (use `fbq('track')`)
- **PageView** - Automatic on route changes
- **Lead** - Waitlist signups with server backup
- **CompleteRegistration** - Successful signups with server backup
- **ViewContent** - Video plays and content engagement

### Custom Events (use `fbq('trackCustom')`)
- **WaitlistStart** - Form submission attempt
- **WaitlistComplete** - Successful email capture
- **VideoPlay** - Video interaction tracking
- **ScrollDepth** - User engagement metrics
- **ModalOpen/Close** - UI interaction tracking

### Event Deduplication Strategy

1. **Event IDs**: Each event gets a unique ID for deduplication
2. **Client-Server Coordination**: Same event ID used for both pixel and CAPI
3. **Continuation IDs**: Related events (start → complete) share base IDs
4. **Hash Parameters**: Emails are SHA-256 hashed for server-side matching

## 🔄 Event Flow Example: Waitlist Signup

```javascript
// 1. User opens modal
trackCustomEvent.modalOpen("email_capture", "hero_cta")
// → Client: fbq('trackCustom', 'ModalOpen', {...})

// 2. User starts form submission  
const eventId = trackCustomEvent.waitlistStart("hero_cta")
// → Client: fbq('trackCustom', 'WaitlistStart', {eventID: "abc123_start"})

// 3. Successful submission
trackCustomEvent.waitlistComplete(email, "hero_cta", eventId)
// → Client: fbq('trackCustom', 'WaitlistComplete', {eventID: "abc123_complete"})
// → Client: fbq('track', 'Lead', {eventID: "abc123_lead"}) 
// → Client: fbq('track', 'CompleteRegistration', {eventID: "abc123_registration"})
// → Server: CAPI with same event IDs + hashed email
```

## 🛠️ API Endpoints

### `/api/track-event` (POST)
Handles server-side event tracking via Conversions API.

**Request Format:**
```typescript
{
  eventName: string,
  eventId: string,
  parameters: Record<string, any>,
  customData: Record<string, any>, // includes email, user data
  timestamp: number,
  sourceUrl: string,
  userAgent: string
}
```

**Features:**
- Automatic IP detection from headers
- Facebook cookie extraction (_fbc, _fbp)
- Email SHA-256 hashing for privacy
- Error handling and retry logic

## 🎨 Usage Examples

### Track Custom Video Play
```javascript
import { trackCustomEvent } from '@/lib/tracking';

const handleVideoPlay = () => {
  trackCustomEvent.videoPlay("course_preview", "hero");
};
```

### Track Form Submission with Continuation
```javascript
import { trackCustomEvent } from '@/lib/tracking';

const handleFormStart = () => {
  const eventId = trackCustomEvent.waitlistStart("footer_cta");
  setTrackingEventId(eventId); // Store for completion
};

const handleFormSuccess = (email) => {
  trackCustomEvent.waitlistComplete(email, "footer_cta", trackingEventId);
};
```

### Track Standard Events with Server Backup
```javascript
import { trackStandardEvent } from '@/lib/tracking';

// High-value conversion with server backup
trackStandardEvent.lead({
  content_name: "course_waitlist",
  value: 1,
  currency: "USD"
}, { 
  sendToServer: true,
  customData: { source: "hero_cta", email: "user@example.com" }
});
```

## 🔍 Testing & Verification

### 1. Browser DevTools
- Open Network tab
- Look for calls to `facebook.net`
- Check for `eventID` parameters in requests

### 2. Facebook Events Manager
- Go to Events Manager → Data Sources → Your Pixel
- Check "Test Events" tab for real-time events
- Verify event deduplication is working (no duplicates)

### 3. Server-Side Verification
```bash
# Test the CAPI endpoint
curl -X GET https://yoursite.com/api/track-event
# Should return: {"status": "ok", "service": "Meta Pixel CAPI Endpoint"}
```

### 4. Event Quality Score
- Check Diagnostics tab in Events Manager
- Look for good match quality between pixel and CAPI events
- Aim for 8.0+ Event Match Quality score

## 🚨 Common Issues & Solutions

### Duplicate Events
- **Problem**: Same event showing up twice in Events Manager
- **Solution**: Ensure Event Setup Tool rules are disabled for code-tracked events

### Low Match Quality
- **Problem**: Server events not matching client events well
- **Solution**: Verify _fbc and _fbp cookies are being passed correctly

### Events Not Firing
- **Problem**: No events appearing in Events Manager
- **Solution**: Check browser console for tracking errors, verify pixel ID

### CAPI Authentication Errors
- **Problem**: Server-side events failing
- **Solution**: Verify META_CAPI_ACCESS_TOKEN has proper permissions

## 📈 Performance Considerations

- ✅ Non-blocking server requests (no impact on UX)
- ✅ Throttled scroll tracking (100ms intervals)
- ✅ Graceful degradation when tracking blocked
- ✅ Minimal client-side JavaScript overhead
- ✅ Error boundaries prevent tracking failures from breaking app

## 🔐 Privacy & Compliance

- ✅ Email hashing for CAPI (SHA-256)
- ✅ Graceful handling of blocked tracking
- ✅ No PII stored in custom events
- ✅ Cookie-based deduplication only
- ✅ User can disable tracking without breaking site

## 🚀 Ready for Production

This implementation is production-ready and includes:
- Error handling and fallbacks
- Performance optimizations  
- Privacy compliance features
- Comprehensive event tracking
- Server-side reliability backup
- Event deduplication logic
