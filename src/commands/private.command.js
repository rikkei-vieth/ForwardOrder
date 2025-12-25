import { getListGroups } from "../services/group.service.js";

/**
 * handle command in private
 * 
 * @param {string} command - command name
 * @param {Object} msg - message object
 * @param {Object} bot - bot object
 * @returns {Promise<void>}
 */
const handlePrivateCommand = async (command, msg, bot) => {
  switch (command) {
    case "start":
      return start(msg, bot);
    case "help":
      return help(msg, bot);
    case "groups":
      return groups(msg, bot);
    default:
      return unknownCommand(msg, bot);
  }
};

/**
 * start command
 * 
 * @param {Object} msg - message object
 * @param {Object} bot - bot object
 * @returns {Promise<void>}
 */
const start = async (msg, bot) => {
  const chatId = msg.chat.id;

  return bot.sendMessage(
    chatId,
    `🤖 *TeleBot*

Xin chào *${msg.from.first_name}*
Gõ /help để xem danh sách lệnh.`,
    { parse_mode: "Markdown" }
  );
};

/**
 * help command
 * 
 * @param {Object} msg - message object
 * @param {Object} bot - bot object
 * @returns {Promise<void>}
 */
const help = async (msg, bot) => {
  return bot.sendMessage(
    msg.chat.id,
    `/start - Khởi động bot
/help - Hướng dẫn
/groups - Danh sách group`
  );
};

/**
 * groups command
 * 
 * @param {Object} msg - message object
 * @param {Object} bot - bot object
 * @returns {Promise<void>}
 */
const groups = async (msg, bot) => {
  const groups = await getListGroups();
  const groupList = groups.map((g) => `- ${g.title} (ID: ${g.chatId})`).join("\n");

  return bot.sendMessage(
    msg.chat.id,
    `📋 Danh sách group
    ${groupList}`
  );
};

/**
 * unknown command
 * 
 * @param {Object} msg - message object
 * @param {Object} bot - bot object
 * @returns {Promise<void>}
 */
const unknownCommand = async (msg, bot) => {
  return bot.sendMessage(
    msg.chat.id,
    "❓ Lệnh không hợp lệ. Gõ /help để xem danh sách lệnh."
  );
};

export { handlePrivateCommand };