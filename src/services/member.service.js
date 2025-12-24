import CONSTANTS from "../constants/constants.js";
import { db } from "../config/firebase.config.js";

/**
 * Get list of groups
 */
export async function getGroups() {
  const groupsSnapshot = await db
    .collection(CONSTANTS.GROUP_COLLECTION)
    .orderBy("addedAt", "desc")
    .get();

  return groupsSnapshot.docs.map((doc) => doc.data());
}

/**
 * Add / Update group
 */
export async function saveGroup(chat) {
  const groupRef = db
    .collection(CONSTANTS.GROUP_COLLECTION)
    .doc(String(chat.id));

  await groupRef.set(
    {
      chatId: chat.id,
      title: chat.title || "",
      type: chat.type,
      addedAt: new Date(),
    },
    { merge: true }
  );

  console.log("✅ Group saved:", chat.id);
}

/**
 * Delete group
 */
export async function deleteGroup(chatId) {
  await db.collection(CONSTANTS.GROUP_COLLECTION).doc(String(chatId)).delete();
  console.log("🗑️ Group deleted:", chatId);
}
