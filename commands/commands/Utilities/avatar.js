const { MessageEmbed } = require("discord.js");

module.exports = {
  commands: "avatar",
  expectedArgs: "<@mention>",
  permissionError: "您需要管理員權限才能運行此命令",
  maxArgs: 1,
  description: "Get a user's/your Avatar",
  callback: async (message) => {
    const member = message.mentions.users.first() || message.author;
    const avatar = member.displayAvatarURL({ dynamic: true, size: 1024 });

    const embed = new MessageEmbed()
      .setTitle(`${member.tag}\'s Avatar`)
      .setImage(avatar);
    message.channel.send(embed);
  },
};
