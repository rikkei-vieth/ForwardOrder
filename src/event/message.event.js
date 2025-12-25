import { handlePersonMessage } from "../services/person.service.js";
import { handleGroupMessage } from "../services/message.group.service.js";

/**
 * register message event
 *
 * @param {Object} bot - bot object
 * @returns {Promise<void>}
 */
export function registerMessageEvent(bot) {
  bot.on("message", async (msg) => {
    console.log(msg);

    // 1️⃣ reject when message has no from or text or cation
    if (!msg.from && !msg.text && !msg.caption) return;

    // ⚠️ COMMAND → STOP
    if (msg?.text?.startsWith("/") || msg?.text?.startsWith("!")) return;

    // 2️⃣ message do bot gửi → bỏ qua
    if (msg.from.is_bot) return;

    const chatType = msg.chat.type;

    try {
      // 3️⃣ message cá nhân gửi cho bot
      if (chatType === "private") {
        await handlePersonMessage(msg, bot);
        return;
      }

      // 4️⃣ message trong group
      if (chatType === "group" || chatType === "supergroup") {
        await handleGroupMessage(msg, bot);
        return;
      }
    } catch (error) {
      console.error("❌ Message handler error:", error);
    }
  });
}
