import { db } from "../config/firebase.config.js";
import CONSTANTS from "../constants/constants.js";

/**
 * Get list group
 */
const getGroups = async () => {
  const groups = await db.collection(CONSTANTS.GROUP_COLLECTION).get();
  return groups.docs.map((doc) => doc.data());
};

/**
 * Get group by chatId
 * @param {string} chatId - chat id
 * @returns {Promise<Object>}
 */
const getGroup = async (chatId) => {
  const group = await db
    .collection(CONSTANTS.GROUP_COLLECTION)
    .doc(String(chatId))
    .get();
  return group.data();
};

/**
 * Save group
 */
const storeGroup = async (groupChat) => {
  const groupRef = db
    .collection(CONSTANTS.GROUP_COLLECTION)
    .doc(String(groupChat.chatId));

  await groupRef.set(
    {
      ...groupChat,
      addedAt: new Date(),
    },
    { merge: true }
  );
};

/**
 * Delete group
 */
const removeGroup = async (chatId) => {
  const groupRef = db
    .collection(CONSTANTS.GROUP_COLLECTION)
    .doc(String(chatId));
  await groupRef.delete();
};

export { getGroups, getGroup, storeGroup, removeGroup };
