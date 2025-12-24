export async function handlePersonMessage(msg, bot) {
  const userId = msg.from.id;
  const text = msg.text || "";

  console.log("👤 Person message:", {
    userId,
    text,
  });

  // ví dụ phản hồi
  await bot.sendMessage(
    userId,
    "Xin chào 👋 mình đã nhận được tin nhắn của bạn"
  );
}
