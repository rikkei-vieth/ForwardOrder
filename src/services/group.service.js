import { getGroups, storeGroup, removeGroup, getGroup } from "../repositories/group.repository.js";

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
export async function saveGroup(chat, type = "unknown") {
  const group = await getGroup(chat.id);
  if (group && group.type !== type) {
    return `❌Thất bại: Group ${chat.title } đã được chỉ định là ${group.type} rồi`;
  }

  const groupData = {
      chatId: chat.id,
      title: chat.title || "",
      type: type,
      addedAt: new Date(),
    }

  await storeGroup(groupData);

  return `✅Thành công: thiết lập group ${chat.title} là ${type}`;
}

/**
 * Delete group
 */
export async function deleteGroup(chatId) {
  await removeGroup(String(chatId));

  console.log("✅ Group deleted:", chatId);
}
