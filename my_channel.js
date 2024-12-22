require('dotenv').config();
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// Initialize OAuth2 client
const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

// Set credentials
oauth2Client.setCredentials({
    access_token: process.env.ACCESS_TOKEN,
    refresh_token: process.env.REFRESH_TOKEN,
});

// Ensure tokens are refreshed
oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
        console.log('New refresh token:', tokens.refresh_token);
    }
    console.log('New access token:', tokens.access_token);
});

// Initialize YouTube Data API with OAuth2 client
const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client,
});

// Search YouTube function
async function searchYouTube(channelId, query) {
    try {
        const response = await youtube.search.list({
            part: 'snippet',
            q: query,
            channelId: channelId,
            maxResults: 5,
            type: 'video',
        });

        return response.data.items.map((item) => ({
            title: item.snippet.title,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        }));
    } catch (error) {
        console.error('Error fetching YouTube data:', error);
        throw error;
    }
}

module.exports = { searchYouTube };