require('dotenv').config();
const { searchYouTube } = require('./my_channel');

const TelegramBot = require('node-telegram-bot-api');
const ATOffBot = new TelegramBot(process.env.TOKEN, { polling: true });

ATOffBot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;
  
    if (messageText === '/start') {
        ATOffBot.sendMessage(chatId, 'Welcome to the club, buddy!');
    }

    if (messageText.includes('/searchYouTube ')) {
        const query = messageText.replace('/searchYouTube ', '');
        const channelId = process.env.CHANNEL_ID;

        try {
            const results = await searchYouTube(channelId, query);

            if (!results.length) {
                return ATOffBot.sendMessage(chatId, "No videos found for your query.");
            }

            const reply = results.map((r) => `${r.title} - ${r.url}`).join('\n');

            if (!reply || reply.length === 0) {
                return ATOffBot.sendMessage(chatId, 'No videos found or an error occurred.');
            }
            if (reply.length > 4096) {
                return ATOffBot.sendMessage(chatId, 'Result too long to send.');
            }

            ATOffBot.sendMessage(chatId, reply);
        } catch (error) {
            console.error('Error in searchYouTube:', error);
            ATOffBot.sendMessage(chatId, "An error occurred while searching YouTube. Please try again later.");
        }
    }
});