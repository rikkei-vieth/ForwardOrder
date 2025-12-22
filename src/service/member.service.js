// listen event when user interact with bot (add or remove bot, set permissions, etc.)
export default function registerMemberHandler(bot) {
  bot.on("my_chat_member", (msg) => {
    console.log(msg);

    const oldStatus = msg.old_chat_member.status;
    const newStatus = msg.new_chat_member.status;
    const chat = msg.chat;

    console.log(
      `[BOT STATUS] ${chat.title} (${chat.id}): ${oldStatus} → ${newStatus}`
    );

    if (oldStatus === "left" && newStatus === "member") {
      console.log("🤖 Bot vừa được add vào group");
    }

    if (newStatus === "kicked") {
      console.log("❌ Bot bị kick khỏi group");
    }

    // when bot is promoted to admin
    if (oldStatus !== "administrator" && newStatus === "administrator") {
      // save info group to group.all.json
      const groupInformation = {
        id: chat.id,
        title: chat.title,
      };

      // get data from group.all.json
      const groupString = fs.readFileSync("./src/data/group.all.json", "utf-8");
      const groupData = JSON.parse(groupString);

      // find if group already exists
      const groupExists = groupData.some((g) => g.id === chat.id);
      if (!groupExists) {
        groupData.push(groupInformation);
        fs.writeFileSync(
          "./src/data/group.all.json",
          JSON.stringify(groupData, null, 2)
        );
        console.log(`✅ Group ${chat.title} saved to group.all.json`);
      } else {
        console.log(`ℹ️ Group ${chat.title} already exists in group.all.json`);
      }
    }

    // when bot is demoted from admin
    if (oldStatus === "administrator" && newStatus !== "administrator") {
      const groupChatId = chat.id;

      // get data from group.all.json
      const groupString = fs.readFileSync("./src/data/group.all.json", "utf-8");
      let groupData = JSON.parse(groupString);
      // filter out the group that matches the chat id
      groupData = groupData.filter((g) => g.id !== groupChatId);
      fs.writeFileSync(
        "./src/data/group.all.json",
        JSON.stringify(groupData, null, 2)
      );
    }
  });
}
