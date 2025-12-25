const botCommands = [
  {
    command: "start",
    description: "Khởi động bot & xem danh sách lệnh",
  },
  {
    command: "help",
    description: "Hướng dẫn sử dụng bot",
  },
  {
    command: "groups",
    description: "Danh sách group bot đang tham gia",
  },
];

const groupCommands = [
  {
    command: "order",
    description: "chỉ định group này là group nhận order",
  },
  {
    command: "loader",
    description: "chỉ định group này là group xử lý order",
  },
];

export { botCommands, groupCommands };