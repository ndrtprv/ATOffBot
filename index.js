require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const ATOffBot = new TelegramBot(process.env.TOKEN, { polling: true });

ATOffBot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;
  
    if (messageText === '/start') {
        ATOffBot.sendMessage(chatId, 'Welcome to the club, buddy!');
    }
});