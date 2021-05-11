module.exports = {
  commands: "say",
  expectedArgs: "<content>",
  minArgs: 1,
  /*callback: (message, args) => {
    let channelID = args.shift();

    if (channelID.startsWith("<#") && channelID.endsWith(">")) {
      channelID = channelID.slice(2, -1);
    }

    const channel = message.guild.channels.cache.get(channelID);

    if (!channel) {
      return message.channel.send(`${message.author}，請指定一個頻道`);
    }

    channel.send(args.join(" "));
  },*/
  /*callback: async (message, args) => {
    let channelID = args.shift();

    if (channelID.startsWith("<#") && channelID.endsWith(">")) {
      channelID = channelID.slice(2, -1);
    }

    const channel = await message.channels.fetch(channelID);

    if (!channel || (message.guild.id !== channel.guild && channel.guild.id)) {
      return message.channel.send(`${message.author}，請指定一個頻道`);
    } else {
      channel.send(args.join(" "));
    }
  },*/
  callback: (message, args) => {
    let saytext;
    let textChannel = message.mentions.channels.first();

    if (textChannel) {
      saytext = args.slice(1).join(" ");
      if (!saytext) {
        message.channel.send(``);
      } else {
        message.delete();
        textChannel.send(saytext);
        message.channel.send(
          `輸入者:\n${message.author.tag}\n頻道:\n${textChannel}\n發送的訊息內容:\n${saytext}`
        );
      }
    } else {
      saytext = args.join(" ");
      if (!saytext) {
        message.channel.send(``);
      } else {
        message.delete();
        message.channel.send(saytext);
      }
    }
  },
  /*
  callback: (message) => {
    const { content } = message;

    let saytext = content;

    const split = saytext.split(" ");

    split.shift();
    saytext = split.join(" ");
    if (!saytext) {
        return message.channel
        .send("You have not specified something to say")
        .then((msg) => {
          msg.delete({ timeout: 30000 });
        })
    }
    else {
      message.channel.send(saytext)
    }

  }, */
  permissions: [],
  requiredRoles: [],
};
