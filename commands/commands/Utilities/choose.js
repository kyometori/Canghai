const Discord = require("discord.js");

module.exports = {
  commands: "choose",
  expectedArgs: "<Options1> | <Options2>",
  minArgs: 2,
  description: "輸入選項，會自動選擇",
  callback: (message, arguments) => {
    const options = arguments;
    const option = options[Math.floor(Math.random() * options.length)];
    const embed = new Discord.MessageEmbed()
      .setColor("#66f5fd")
      .setDescription(`🤔 **我選擇 ${option} **`);
    message.channel.send(embed);
  }
};
