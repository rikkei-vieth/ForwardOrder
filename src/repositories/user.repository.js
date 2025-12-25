import { db } from "../config/firebase.config.js";
import CONSTANTS from "../constants/constants.js";

/**
 * Get user by id
 */
const getUserById = async (id) => {
  const userRef = db.collection(CONSTANTS.USER_COLLECTION).doc(String(id));
  const user = await userRef.get();
  return user.data();
}

/**
 * Save user
 */
const saveUser = async (user) => {
  const userRef = db.collection(CONSTANTS.USER_COLLECTION).doc(String(user.id));
  await userRef.set(user);
}

/**
 * Delete user
 */
const deleteUser = async (id) => {
  const userRef = db.collection(CONSTANTS.USER_COLLECTION).doc(String(id));
  await userRef.delete();
}

export { getUserById, saveUser, deleteUser };