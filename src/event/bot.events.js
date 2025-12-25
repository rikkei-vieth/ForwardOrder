import { deleteGroup, saveGroup } from "../services/group.service.js";

export function registerMyChatMember(bot) {
  bot.on("my_chat_member", async (msg) => {
    const chat = msg.chat;

    const oldStatus = msg.old_chat_member.status;
    const newStatus = msg.new_chat_member.status;

    console.log(
      `my_chat_member | chatId=${chat.id} | ${oldStatus} → ${newStatus}`
    );

    // BOT ĐƯỢC ADD
    if (
      (oldStatus === "left" ||
        oldStatus === "kicked" ||
        oldStatus === "member") &&
      newStatus === "administrator"
    ) {
      await saveGroup(chat);
    }

    // BOT BỊ REMOVE
    if (
      (oldStatus === "member" || oldStatus === "administrator") &&
      (newStatus === "left" || newStatus === "kicked")
    ) {
      await deleteGroup(chat.id);
    }
  });
}
