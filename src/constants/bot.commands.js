const botCommands = [
  {
    command: "start",
    description: "Start bot & see the list of commands",
  },
  {
    command: "help",
    description: "Guide to use bot",
  },
  {
    command: "groups",
    description: "List of groups bot is participating in",
  },
];

const groupCommands = [
  { command: "help", description: "Guide to use bot" },
  {
    command: "order",
    description: "Specify this group is the group that receives order",
  },
  {
    command: "loader",
    description: "Specify this group is the group that processes order",
  },
];

export { botCommands, groupCommands };
