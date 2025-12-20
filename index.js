import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";

dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const SOURCE_GROUP_ID = process.env.SOURCE_GROUP_ID;
const TARGET_GROUP_ID = process.env.TARGET_GROUP_ID;

const bot = new TelegramBot(TOKEN, { polling: true });

console.log("Bot is running...");

bot.on("message", (msg) => {
  const msgIdString = msg.chat.id.toString();
  if (msgIdString === SOURCE_GROUP_ID) {
    bot.forwardMessage(TARGET_GROUP_ID, msg.chat.id, msg.message_id);
  }
});
