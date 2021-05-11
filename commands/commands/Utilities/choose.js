const Discord = require("discord.js");

module.exports = {
  commands: "choose",
  expectedArgs: "<Options1> | <Options2>",
  minArgs: 3,
  maxArgs: 3,
  description: "輸入選項，會自動選擇",
  callback: (message, arguments) => {
    const options = [arguments[0], arguments[2]];

    if (arguments[1] === "|") {
      const option = options[Math.floor(Math.random() * options.length)];
      const embed = new Discord.MessageEmbed()
        .setColor("#66f5fd")
        .setDescription(`🤔 **我選擇 ${option} **`);
      message.channel.send(embed);
    } else {
      const embed1 = new Discord.MessageEmbed()
        .setTitle("You need to provide at  2 options!")
        .setColor("#66f5fd")
        .setDescription(
          "Example: `s@choose cat | dog` to choose one of a cat, dog for you."
        );
      message.channel.send(embed1);
    }
  }
};
