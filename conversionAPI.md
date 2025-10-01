Instruction guide
The conversion leads integration uses Meta's Conversions API to connect leads data to our system. CRM events uploaded are linked to a dataset ID and will appear in Events Manager. Learn more about Conversions API.
1. Check required parameters
You will need to pass these parameters to the Conversions API.
Make sure that you can get these fields from your CRM. Learn more.
Server event
event_name
The name of a critical stage in your CRM that a lead is changing to.
event_time
The UNIX timestamp for the time when a lead changes to a new stage.
action_source
"Action_source" field should always be "system_generated".
Custom event
lead_event_source
"Lead_event_source" is the name of your CRM (HubSpot, Salesforce, SAP, Oracle etc).
event_source
"Event_source" field should always be "crm".
Customer information parameters
Customer information helps Meta match events from your server with Meta accounts. Sending as many of the following parameters can lead to more accurate event data and better ad performance
Parameter
Priority
Lead ID (recommended) How to find the lead ID?
"Lead ID" is a 15- to 17-digit ID that Meta generates to track leads. Your lead ID should match ours. This is optional, but recommended for better accuracy.
Highest
Click ID
Highest
Hashed email address
Highest
Hashed phone number
High
Other hashed contact information
In addition to a hashed email address and phone number, you can send hashed gender, date of birth, surname, first name, town/city, county/region, postcode and more to Meta.
Medium
Example payload
{
"data": [
{
"action_source": "system_generated",
"custom_data": {
"event_source": "crm",
"lead_event_source": "Your CRM"
},
"event_name": "Lead",
"event_time": 1673035686,
"user_data": {
"em": [
"7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068"
],
"lead_id": 1234567890123456,
"ph": [
"6069d14bf122fdfd931dc7beb58e5dfbba395b1faf05bdcd42d12358d63d8599"
]
}
}
]
}
To help ensure privacy, we require advertisers to hash customer contact information that they use for matching purposes before they send it to Meta. This payload shows the email address(em) and phone number(ph) values hashed using SHA256. Learn more
2. Structure your payload
Use the Payload Helper to construct your payload with all of the required parameters.
Click the Get code button inside the Payload Helper to generate a code template for your programming language.
​
Send customer information and lead ID
Sending lead ID and customer information for your events can help us more accurately match your events and improve your ad performance.
Developer documentation
Here's an example of what your payload should look like.
3. Create endpoint
Create an access token for your dataset (formerly known as pixel).
Use the API endpoint below to post lead status events from your CRM to Meta.
If you're using the Meta Business SDK, copy the access token directly and add it to the access_token parameter of the request.
https://graph.facebook.com/v23.0/2780431635496611/events?access_token=ACCESS_TOKEN
Latest API_VERSION: v23.0
Dataset_ID: 2780431635496611
4. Send event to Meta
Now, you're ready to start uploading events to your dataset.
You can either send a test event or start sending production data straight away.
Send production data
Get data from your CRM
Check your CRM's API and make sure that data from your CRM matches the required parameters. And make sure that your lead_id matches the Meta-generated one and is in the payload.
Trigger events for lead status changes
Whenever a lead's status changes, it must trigger a call to your code. A trigger must occur for every stage of your funnel, including the initial raw lead stage. This logic may be integrated within step 1 of sending your production data.
Send events to Meta
Write a function from scratch or use Meta's business SDK to send your payload to your dataset endpoint. For complete instructions, go to the "Step 4: Send production data" section in the CRM integration guide.
Test event (optional)
Sending a test event first to verify your payload and API connection can help avoid affecting any actual data in your dataset.
Test events can be sent directly from your server or Meta’s GraphAPI Explorer by including a "test_event_code" parameter in the payload.
Test events will appear almost immediately under the Test events tab in Events Manager.
Note that the test event only confirms that communication has been established, but does not validate the data for accuracy. For complete instructions, go to the "Step 3: Test a payload" section in the CRM integration guide.
What happens next:
Make sure that your integration is uploading data at least once a day.
Events usually appear in Events Manager for your pixel in less than one hour if your integration is working.
Once your integration is working, Meta will validate the data. Errors will appear in Diagnostics.