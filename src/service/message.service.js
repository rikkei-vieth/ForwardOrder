import { getMessageDoneOrder } from "../utils/group.message";

// listen message send anorher group
export default function registerMessageHandler(bot) {
  bot.on("message", async (msg) => {
    console.log(msg);

    // Ignore messages from bots or non-text messages
    if (msg.from.is_bot || !msg.text) return;

    // is order message
    const isOrderMessage = msg.text.startsWith("Order");

    // is done message
    const isDoneMessage = msg.text.startsWith("Done Order");

    const msgIdString = msg.chat.id.toString();

    // If order message and not from source or target group, ignore
    if (
      (isOrderMessage && msgIdString !== SOURCE_GROUP_ID) ||
      (isDoneMessage && msgIdString !== TARGET_GROUP_ID)
    ) {
      return;
    }

    const chatId =
      msgIdString === SOURCE_GROUP_ID ? TARGET_GROUP_ID : SOURCE_GROUP_ID;

    const userFullName = `${msg.from.first_name || ""} ${
      msg.from.last_name || ""
    }`.trim();

    const userName = msg.from.username
      ? `@${msg.from.username}`
      : "No username";

    const messageText = isOrderMessage
      ? `📦 New Order Received!\n\nOrder_Id: ${msg.message_id}\n\n${msg.text}\n\nCustomer: ${userFullName}\nUsername: ${userName}`
      : isDoneMessage
      ? getMessageDoneOrder(isDoneMessage, msg)
      : msg.text;

    bot.sendMessage(chatId, messageText);
  });
}
