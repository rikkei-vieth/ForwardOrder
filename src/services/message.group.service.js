import CONSTANTS from "../constants/constants.js";
import {
  getMessageDoneOrder,
  getMessageOrder,
} from "../helpers/group.message.js";
import { getListGroups } from "./group.service.js";

export async function handleGroupMessage(msg, bot) {
  // is order message
  const isOrderMessage = msg.text?.toLowerCase().startsWith("order");

  // is done message
  const isDoneMessage = msg.caption?.toLowerCase()?.startsWith("done order");

  // get list group
  const listGroup = await getListGroups();

  const orderGroup = listGroup.filter(
    (group) => group.type === CONSTANTS.TYPE_ORDER
  );
  const loaderGroup = listGroup.filter(
    (group) => group.type === CONSTANTS.TYPE_LOADER
  );

  if (isOrderMessage) {
    loaderGroup.forEach(async (group) => {
      const messageText = getMessageOrder(msg);
      bot.sendMessage(group.chatId, messageText);
    });
  }

  if (isDoneMessage) {
    const photo = msg.photo[msg.photo.length - 1]; // ảnh nét nhất
    const fileId = photo.file_id;
    orderGroup.forEach(async (group) => {
      bot.sendPhoto(group.chatId, fileId, { caption: msg.caption });
    });
  }
}
