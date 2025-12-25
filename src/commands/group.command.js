import { saveGroup } from "../services/group.service.js";

/**
 * handle command in group
 * 
 * @param {string} command - command name
 * @param {Object} msg - message object
 * @param {Object} bot - bot object
 * @returns {Promise<void>}
 */
const handleGroupCommand = async (command, msg, bot) => {
  switch (command) {
    case "order":
      return registerOrderGroup(msg, bot);
    case "loader":
      return registerLoaderGroup(msg, bot);
    default:
      return unknownCommand(msg, bot);
  }
};

/**
 * register order group
 * 
 * @param {Object} msg - message object
 * @param {Object} bot - bot object
 * @returns {Promise<void>}
 */
const registerOrderGroup = async (msg, bot) => {
  const result = await saveGroup(msg.chat, "order");
  return bot.sendMessage(
    msg.chat.id,
    result
  );
};

/**
 * register loader group
 * 
 * @param {Object} msg - message object
 * @param {Object} bot - bot object
 * @returns {Promise<void>}
 */
const registerLoaderGroup = async (msg, bot) => {
  const result = await saveGroup(msg.chat, "loader");
  return bot.sendMessage(
    msg.chat.id,
    result
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

export { handleGroupCommand };