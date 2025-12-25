import CONSTANTS from "../constants/constants.js";
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
    case "help":
      return bot.sendMessage(
        msg.chat.id,
        `📚 Danh sách lệnh nhóm: 

/loader@${process.env.BOT_NAME} - Đăng ký nhóm Loader
/order@${process.env.BOT_NAME} - Đăng ký nhóm Order
`
      );
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
  const result = await saveGroup(msg.chat, CONSTANTS.TYPE_ORDER);
  return bot.sendMessage(msg.chat.id, result);
};

/**
 * register loader group
 *
 * @param {Object} msg - message object
 * @param {Object} bot - bot object
 * @returns {Promise<void>}
 */
const registerLoaderGroup = async (msg, bot) => {
  const result = await saveGroup(msg.chat, CONSTANTS.TYPE_LOADER);
  return bot.sendMessage(msg.chat.id, result);
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
