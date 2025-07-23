const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
});

async function refreshAccessToken() {
    try {
        const { token } = await oauth2Client.getAccessToken();
        console.log('Access Token:', token);
    } catch (error) {
        console.error('Failed to refresh token:', error.response.data);
    }
}

refreshAccessToken();