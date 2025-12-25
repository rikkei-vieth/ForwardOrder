/**
 * Get message content for order
 *
 * @param {*} msg
 * @returns
 */
const getMessageOrder = (msg) => {
  return `📦 New Order Received!\n\n${msg.text}`;
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

  const orderIdLine = newMsgLine.find((line) =>
    line?.toLowerCase().startsWith("order #")
  );

  return `✅ Order Completed!\n\n ${orderIdLine}`;
};

export { getMessageOrder, getMessageDoneOrder };
