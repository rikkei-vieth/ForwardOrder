import { handleGroupCommand } from "../commands/group.command.js";
import { handlePrivateCommand } from "../commands/private.command.js";
import { botCommands, groupCommands } from "../constants/bot.commands.js";

/**
 * register command handler
 *
 * @param {Object} bot - bot object
 * @returns {Promise<void>}
 */
export const registerCommandHandler = (bot) => {
  bot.onText(/^\/(\w+)(?:@([a-zA-Z0-9_]+))/, async (msg, match) => {
    const chat = msg.chat;
    // handle command in private chat
    if (chat.type == "private") {
      const command = match[1];
      // if command is not in the list, skip
      if (!botCommands.some((cmd) => cmd.command === command)) return;
      await handlePrivateCommand(command, msg, bot);
      return;
    }

    // handle command in group
    if (chat.type == "group" || chat.type == "supergroup") {
      const command = match[1];

      const botName = process.env.BOT_NAME;
      if (match[2] !== botName) return;

      // if command is not in the list, skip
      if (!groupCommands.some((cmd) => cmd.command === command)) return;
      await handleGroupCommand(command, msg, bot);
      return;
    }
  });
};
