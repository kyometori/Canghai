const loadCommands = require("../../load-commands");
const { prefix } = require("@root/config.json");

module.exports = {
  commands: ["help", "h", "幫助"],
  description: "描述該機器人的所有命令",
  callback: (message, arguments, text) => {
    let reply = "我是【TW】克勞斯，以下是我支持的命令：\n\n";

    const commands = loadCommands();

    for (const command of commands) {
      // Check for permissions
      let permissions = command.permission;

      if (permissions) {
        let hasPermission = true;
        if (typeof permissions === "string") {
          permissions = [permissions];
        }

        for (const permission of permissions) {
          if (!message.member.hasPermission(permission)) {
            hasPermission = false;
            break;
          }
        }

        if (!hasPermission) {
          continue;
        }
      }

      // Format the text
      const mainCommand =
        typeof command.commands === "string"
          ? command.commands
          : command.commands[0];
      const args = command.expectedArgs ? ` ${command.expectedArgs}` : "";
      const { description } = command;

      reply += `**${prefix}${mainCommand}${args}** = ${description}\n`;
    }

    message.channel.send(reply);
  },
};
