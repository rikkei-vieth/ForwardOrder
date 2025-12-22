import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";

dotenv.config();

const TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });

export default bot;
