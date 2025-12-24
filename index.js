import bot from "./src/config/bot.config.js";
import { botCommands } from "./src/constants/bot.commands.js";
import { registerMyChatMember } from "./src/event/bot.events.js";
import { registerMessageEvent } from "./src/event/message.event.js";
import { registerCommandHandler } from "./src/handlers/command.handler.js";

const SOURCE_GROUP_ID = process.env.SOURCE_GROUP_ID;
const TARGET_GROUP_ID = process.env.TARGET_GROUP_ID;

await bot.setMyCommands(botCommands);
console.log("Bot is running...");

registerCommandHandler(bot);
registerMyChatMember(bot);
registerMessageEvent(bot);
