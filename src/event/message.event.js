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

    // reject when message has no from or text or caption
    if (!msg.from && !msg.text && !msg.caption) return;

    // COMMAND -> STOP
    if (msg?.text?.startsWith("/") || msg?.text?.startsWith("!")) return;

    // message sent by bot -> skip
    if (msg.from.is_bot) return;

    const chatType = msg.chat.type;

    try {
      // message sent by person to bot
      if (chatType === "private") {
        await handlePersonMessage(msg, bot);
        return;
      }

      // message in group
      if (chatType === "group" || chatType === "supergroup") {
        await handleGroupMessage(msg, bot);
        return;
      }
    } catch (error) {
      console.error("❌ Message handler error:", error);
    }
  });
}
