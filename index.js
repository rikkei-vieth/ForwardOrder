import bot from "./src/config/bot.config.js";
import { botCommands, groupCommands } from "./src/constants/bot.commands.js";
import { registerMyChatMember } from "./src/event/bot.events.js";
import { registerMessageEvent } from "./src/event/message.event.js";
import { registerCommandHandler } from "./src/handlers/command.handler.js";


await bot.setMyCommands(botCommands, { scope: {
    type: 'all_private_chats'
  } });
await bot.setMyCommands(groupCommands, { scope: {
    type: 'all_group_chats'
  } });
console.log("Bot is running...");

registerCommandHandler(bot);
registerMyChatMember(bot);
registerMessageEvent(bot);
