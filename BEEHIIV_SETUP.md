# Beehiiv Integration Setup Guide

This guide will help you integrate your Beehiiv waitlist with your Next.js application.

## 🚀 Features

- ✅ Direct API integration with Beehiiv
- ✅ Automatic subscriber creation
- ✅ Custom fields support (name, course topic)
- ✅ Error handling and user feedback
- ✅ Loading states and form validation
- ✅ Duplicate subscriber handling
- ✅ UTM tracking for analytics

## 📋 Prerequisites

1. A Beehiiv account with a publication
2. Beehiiv API access (available on Pro plans and above)
3. Next.js application (this project)

## 🔧 Setup Instructions

### Step 1: Get Your Beehiiv API Credentials

1. **Log in to your Beehiiv account**
2. **Navigate to Settings** → **Integrations** → **API**
3. **Generate an API Key** (if you haven't already)
4. **Note your Publication ID** (found in the same section)

### Step 2: Configure Environment Variables

1. **Create a `.env.local` file** in your project root:
```bash
# Beehiiv API Configuration
BEEHIIV_API_KEY=your_beehiiv_api_key_here
BEEHIIV_PUBLICATION_ID=your_publication_id_here
```

2. **Add your actual credentials**:
   - Replace `your_beehiiv_api_key_here` with your actual API key
   - Replace `your_publication_id_here` with your actual publication ID

### Step 3: Set Up Beehiiv Custom Fields (Optional)

If you want to capture course topics, set up a custom field in Beehiiv:

1. Go to **Settings** → **Custom Fields**
2. Create a new field:
   - **Field Name**: `course_topic`
   - **Field Type**: Text
   - **Field Label**: Course Topic

### Step 4: Test the Integration

1. **Start your development server**:
```bash
npm run dev
```

2. **Open your application** and trigger the email capture modal

3. **Fill out the form** with a test email and submit

4. **Check your Beehiiv dashboard** to verify the subscriber was added

## 🔍 How It Works

### API Endpoint
- **URL**: `/api/subscribe`
- **Method**: POST
- **Payload**:
```json
{
  "email": "user@example.com",
  "name": "John Doe", // optional
  "courseTopic": "Digital Marketing" // optional
}
```

### Beehiiv API Integration
The integration uses Beehiiv's REST API:
- **Endpoint**: `POST /v2/publications/{publication_id}/subscriptions`
- **Authentication**: Bearer token
- **Automatic features**:
  - Welcome email sending
  - Reactivation of existing subscribers
  - UTM tracking (source: website, medium: modal, campaign: waitlist)

### Error Handling
- ✅ Duplicate email detection
- ✅ API rate limiting
- ✅ Network errors
- ✅ Validation errors
- ✅ User-friendly error messages

### Form Features
- ✅ Loading states during submission
- ✅ Success confirmation
- ✅ Error display
- ✅ Form reset after successful submission
- ✅ Disabled state to prevent double submissions

## 🎯 Customization Options

### Modify UTM Parameters
In `/app/api/subscribe/route.ts`, update the UTM tracking:
```typescript
utm_source: 'website',
utm_medium: 'modal',
utm_campaign: 'waitlist' // Change this to your campaign name
```

### Add More Custom Fields
Extend the `custom_fields` object in the API route:
```typescript
subscriberData.custom_fields = {
  course_topic: courseTopic,
  signup_source: 'landing_page',
  // Add more fields here
};
```

### Customize Success Message
In `EmailCaptureModal.tsx`, modify the success state content.

## 🐛 Troubleshooting

### Common Issues

1. **"Server configuration error"**
   - Check that your `.env.local` file exists
   - Verify your API key and publication ID are correct
   - Restart your development server

2. **"Authentication failed"**
   - Double-check your API key
   - Ensure your Beehiiv plan supports API access

3. **"Too many requests"**
   - You've hit the API rate limit
   - Wait a few minutes before trying again

4. **Subscriber not appearing in Beehiiv**
   - Check the API response in browser console
   - Verify your publication ID is correct
   - Check if the email already exists

### Debug Mode
Add console logging to the API route for debugging:
```typescript
console.log('Subscribing:', { email, name, courseTopic });
console.log('Beehiiv response:', responseData);
```

## 🔒 Security Notes

- ✅ API keys are server-side only (not exposed to client)
- ✅ Input validation on both client and server
- ✅ Error messages don't expose sensitive information
- ✅ Rate limiting protection

## 📊 Analytics Integration

The integration automatically adds UTM parameters for tracking:
- **utm_source**: website
- **utm_medium**: modal  
- **utm_campaign**: waitlist

You can track these in your Beehiiv analytics dashboard.

## 🆘 Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Beehiiv API credentials
3. Test with a simple curl request to confirm API access
4. Check Beehiiv's API documentation for updates

## 📝 API Reference

For more details on Beehiiv's API, visit:
- [Beehiiv API Documentation](https://developers.beehiiv.com/)
- [Create Subscriber Endpoint](https://developers.beehiiv.com/api-reference/subscriptions/create)

---

🎉 **Congratulations!** Your Beehiiv waitlist integration is now complete and ready to capture subscribers!
