import admin from "firebase-admin";
import fs from "fs";

const keyJsonStr = fs.readFileSync(
  "./telebot-b4d3a-firebase-adminsdk-fbsvc-afd82cfb90.json",
  "utf8"
);
const serviceAccount = JSON.parse(keyJsonStr);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export { db };
