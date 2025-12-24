import { handlePersonMessage } from "../services/person.service.js";
import { handleGroupMessage } from "../services/group.service.js";

export function registerMessageEvent(bot) {
  bot.on("message", async (msg) => {
    // 1️⃣ bỏ qua message không có sender
    if (!msg.from) return;

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
