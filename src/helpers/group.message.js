/**
 * Get message content for order
 *
 * @param {*} msg
 * @returns
 */ 
const getMessageOrder = (msg) => {
  const userFullName = `${msg.from.first_name || ""} ${
    msg.from.last_name || ""
  }`.trim();

  const userName = msg.from.username ? `@${msg.from.username}` : "No username";

  return `📦 New Order Received!\n\nOrder_Id: ${msg.message_id}\n\n${msg.text}\n\nCustomer: ${userFullName}\nUsername: ${userName}`;
};

/**
 * Get message content for done order
 *
 * @param {*} isDoneMessage
 * @param {*} msg
 * @returns
 */
const getMessageDoneOrder = (isDoneMessage, msg) => {
  if (!isDoneMessage) return "";

  const msgReply = msg.reply_to_message;
  if (!msgReply) return "";

  // split by new lines
  const msgSplit = msgReply.text.split("\n");

  // remove \n from each line
  const newMsgLine = msgSplit.map((line) => line.replace("\n", ""));

  const orderIdLine = newMsgLine.find((line) => line.startsWith("Order_Id:"));

  const customerNameLine = newMsgLine.find((line) =>
    line.startsWith("Customer:")
  );

  const userNameLine = newMsgLine.find((line) => line.startsWith("Username:"));

  return `✅ Order Completed!\n\n ${orderIdLine}\n\n${customerNameLine}\n${userNameLine}`;
};

export { getMessageOrder, getMessageDoneOrder };
