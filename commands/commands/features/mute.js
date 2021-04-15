module.exports = {
  commands: "mute",
  expectedArgs: "<@> <duration as a number> <m, h, d, or life>",
  permissionError: "您需要管理員權限才能運行此命令",
  minArgs: 3,
  maxArgs: 3,
  description: "禁言成員",
  callback: (message, arguments, text) => {},
  permissions: ["ADMINISTRATOR", "MANAGE_ROLES"],
  requiredRoles: [],
};
