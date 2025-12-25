import CONSTANTS from "../constants/constants.js";
import {
  getGroups,
  storeGroup,
  removeGroup,
  getGroup,
} from "../repositories/group.repository.js";

/**
 * Get list of groups
 */
export async function getListGroups() {
  const groups = await getGroups();
  return groups;
}

/**
 * Get group by chatId
 * @param {string} chatId - chat id
 * @returns {Promise<Object>}
 */
export async function getGroupByChatId(chatId) {
  const group = await getGroup(chatId);
  return group;
}

/**
 * Add / Update group
 */
export async function saveGroup(chat, type = CONSTANTS.TYPE_UNKNOWN) {
  const group = await getGroup(chat.id);
  if (group && group.type !== type && group.type !== CONSTANTS.TYPE_UNKNOWN) {
    return `❌Failure: Group ${chat.title} has already been assigned as the group ${group.type}`;
  }

  const groupData = {
    chatId: chat.id,
    title: chat.title || "",
    type: type,
    addedAt: new Date(),
  };

  await storeGroup(groupData);

  return `✅Success: setting group ${chat.title} as group ${type}`;
}

/**
 * Delete group
 */
export async function deleteGroup(chatId) {
  await removeGroup(String(chatId));

  console.log("✅ Group deleted:", chatId);
}
