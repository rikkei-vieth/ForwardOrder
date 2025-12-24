import { handleCommand } from "../services/command.service.js";

export const registerCommandHandler = (bot) => {
  bot.onText(/^\/(\w+)/, async (msg, match) => {
    const chat = msg.chat;
    // Chỉ cho chạy trong private chat
    if (chat.type !== "private") return;

    const command = match[1];

    await handleCommand(command, msg, bot);
  });
};
