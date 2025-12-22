import bot from "./src/config/bot.config.js";
import registerMemberHandler from "./src/service/member.service.js";

const SOURCE_GROUP_ID = process.env.SOURCE_GROUP_ID;
const TARGET_GROUP_ID = process.env.TARGET_GROUP_ID;

console.log("Bot is running...");

registerMemberHandler(bot);
