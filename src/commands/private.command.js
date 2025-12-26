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

Hello *${msg.from.first_name}*
Press /help to see the list of commands.`,
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
    `/start - Start bot
/help - Help
/groups - List of groups`
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
    `📋 List of groups
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
    "❓ Invalid command. Press /help to see the list of commands."
  );
};

export { handlePrivateCommand };