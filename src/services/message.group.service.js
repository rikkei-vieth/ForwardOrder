import { getMessageDoneOrder, getMessageOrder } from "../helpers/group.message.js";
import { getListGroups } from "./group.service.js";

export async function handleGroupMessage(msg, bot) {
  // is order message
  const isOrderMessage = msg.text.startsWith("Order");

  // is done message
  const isDoneMessage = msg.text.startsWith("Done Order");

  const msgIdString = msg.chat.id.toString();

  // get list group
  const listGroup = await getListGroups();
  console.log("listGroup", listGroup);
  
  const orderGroup = listGroup.find((group) => group.type === "order");
  const loaderGroup = listGroup.find((group) => group.type === "loader");

  if (isOrderMessage) {
    orderGroup.forEach(async (group) => {
      const messageText = getMessageOrder(msg);
      bot.sendMessage(group.chatId, messageText);
    });
  }

  if (isDoneMessage) {
    loaderGroup.forEach(async (group) => {
      const messageText = getMessageDoneOrder(isDoneMessage, msg);
      bot.sendMessage(group.chatId, messageText);
    });
  }
}
