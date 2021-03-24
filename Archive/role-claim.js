//自動身分組

//#region
const firstMessage = require("路徑"); //檔案內容在下面

module.exports = (client) => {
  const channelId = "698177994040147988";

  const getEmoji = (emojiName) =>
    client.emojis.cache.find((emoji) => emoji.name === emojiName);

  const emojis = {
    emoji_8: "普通水手",
  };

  const reactions = [];

  let emojiText = "Add a reaction to claim a role\n\n";
  for (const key in emojis) {
    const emoji = getEmoji(key);
    reactions.push(emoji);

    const role = emojis[key];
    emojiText += `${emoji} = ${role}\n`;
  }

  firstMessage(client, channelId, emojiText, reactions);

  const handleReaction = (reaction, user, add) => {
    if (user.id === "806555021340573756") {
      return;
    }

    const emoji = reaction._emoji.name;

    const { guild } = reaction.message;

    const roleName = emojis[emoji];
    if (!roleName) {
      return;
    }

    const role = guild.roles.cache.find((role) => role.name === roleName);
    const member = guild.members.cache.find((member) => member.id === user.id);

    if (add) {
      member.roles.add(role);
    } else {
      member.roles.remove(role);
    }
  };

  client.on("messageReactionAdd", (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, true);
    }
  });

  client.on("messageReactionRemove", (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, false);
    }
  });
};
//#endregion

//---bot.js---
const roleClaim = require("路徑");

roleClaim(client);

//---first-message.js---
const addReactions = (message, reactions) => {
  message.react(reactions[0]);
  reactions.shift();
  if (reactions.length > 0) {
    setTimeout(() => addReactions(message, reactions), 750);
  }
};

module.exports = async (client, id, text, reactions = []) => {
  const channel = await client.channels.fetch(id);

  channel.messages.fetch().then((messages) => {
    if (messages.size) {
      // Send a new message
      channel.send(text).then((message) => {
        addReactions(message, reactions);
      });
    } else {
      // Edit the existing message
      for (const message of messages) {
        //console.log(message)
        message[1].edit(text);
        addReactions(message[1], reactions);
      }
    }
  });
};
