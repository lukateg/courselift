# Environment Variables Setup

This document lists all required environment variables for the project.

## Required Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

### Meta CRM Conversions API

For tracking lead conversions to Meta's CRM system:

```bash
META_CRM_ACCESS_TOKEN=your_meta_crm_access_token_here
META_DATASET_ID=2780431635496611
```

**Where to get these:**
- Go to [Meta Events Manager](https://business.facebook.com/events_manager)
- Select your dataset/pixel
- Navigate to Settings → Conversions API
- Click "Generate Access Token"
- Dataset ID is shown in the URL or Settings

### Meta Pixel (Client-Side Tracking)

For tracking user behavior on your website:

```bash
NEXT_PUBLIC_META_PIXEL_ID=your_meta_pixel_id_here
META_CAPI_ACCESS_TOKEN=your_meta_capi_access_token_here
```

**Where to get these:**
- Go to [Meta Events Manager](https://business.facebook.com/events_manager)
- Select your pixel
- Find the Pixel ID in Settings
- Generate CAPI access token in Settings → Conversions API

### Beehiiv Newsletter Integration

For managing your email waitlist:

```bash
BEEHIIV_API_KEY=your_beehiiv_api_key_here
BEEHIIV_PUBLICATION_ID=your_beehiiv_publication_id_here
```

**Where to get these:**
- Log in to your [Beehiiv Dashboard](https://app.beehiiv.com/)
- Go to Settings → API
- Generate an API key if you don't have one
- Find your Publication ID in the same section

### PostHog Analytics

For product analytics and user tracking:

```bash
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Where to get these:**
- Log in to your [PostHog Dashboard](https://app.posthog.com/)
- Go to Project Settings
- Copy the Project API Key
- Use the default host or your self-hosted instance URL

## Example .env.local File

```bash
# Meta CRM Conversions API
META_CRM_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
META_DATASET_ID=2780431635496611

# Meta Pixel (Client-Side)
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
META_CAPI_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Beehiiv
BEEHIIV_API_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
BEEHIIV_PUBLICATION_ID=pub_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

## Variable Explanations

| Variable | Purpose | Required | Public |
|----------|---------|----------|--------|
| `META_CRM_ACCESS_TOKEN` | Server-side CRM conversion tracking | Yes | No |
| `META_DATASET_ID` | Dataset ID for CRM conversions | Yes | No |
| `NEXT_PUBLIC_META_PIXEL_ID` | Client-side Meta Pixel tracking | Yes | Yes |
| `META_CAPI_ACCESS_TOKEN` | Server-side event tracking | Yes | No |
| `BEEHIIV_API_KEY` | Beehiiv API authentication | Yes | No |
| `BEEHIIV_PUBLICATION_ID` | Your Beehiiv publication | Yes | No |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog analytics | Yes | Yes |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog server URL | Yes | Yes |

## Security Notes

1. **Never commit `.env.local` to version control**
2. **Never share access tokens publicly**
3. **Rotate tokens periodically for security**
4. **Use different tokens for development and production**
5. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser

## Testing Configuration

To verify your environment variables are set correctly:

```bash
# Check Meta CRM Conversion API
curl http://localhost:3000/api/meta-crm-conversion

# Check regular Meta CAPI endpoint
curl http://localhost:3000/api/track-event
```

Both should return `configured: true` if environment variables are set correctly.

## Troubleshooting

### "Missing Meta credentials" error

- Ensure `META_CRM_ACCESS_TOKEN` and `META_DATASET_ID` are set in `.env.local`
- Restart your development server after adding environment variables

### "Invalid OAuth access token" error

- Your access token may have expired or been revoked
- Generate a new access token in Meta Events Manager

### Environment variables not loading

1. Ensure `.env.local` is in the root directory (same level as `package.json`)
2. Restart your development server (`npm run dev`)
3. Check for typos in variable names
4. Ensure no trailing spaces or quotes around values

## Related Documentation

- [META_CRM_CONVERSION_SETUP.md](./META_CRM_CONVERSION_SETUP.md) - Full setup guide for Meta CRM Conversions API
- [BEEHIIV_SETUP.md](./BEEHIIV_SETUP.md) - Beehiiv integration guide
- [META_PIXEL_SETUP.md](./META_PIXEL_SETUP.md) - Meta Pixel setup guide

