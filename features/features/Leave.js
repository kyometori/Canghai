const mongo = require("@util/mongo");
const command = require("@util/command");
const leaveSchema = require("@schemas/Leave-schema");
const Discord = require("discord.js");

module.exports = (client) => {
  //!setleave <message>
  const cache = {}; // guildId: [channelId, text]

  command(client, "setleave", async (message) => {
    const { member, channel, content, guild } = message;

    if (!member.hasPermission("ADMINISTRATOR")) {
      channel.send("您沒有運行此命令的權限。");
      return;
    }

    let text = content;

    const split = text.split(" ");

    if (split.length < 2) {
      channel.send("請提供離開信息");
      return;
    }

    split.shift();
    text = split.join(" ");

    cache[guild.id] = [channel.id, text];

    await mongo().then(async (mongoose) => {
      try {
        await leaveSchema.findOneAndUpdate(
          {
            _id: guild.id,
          },
          {
            _id: guild.id,
            channelId: channel.id,
            text,
          },
          {
            upsert: true,
          }
        );
        const icon = guild.iconURL();
        const embed = new Discord.MessageEmbed()
          .setAuthor(`${guild.name} 離開訊息設定`, `${icon}`)
          .setColor()
          .setFooter(`由${message.author.tag}輸入`)
          .setTimestamp()
          .addField("設定訊息", `${text}`)
          .addField("發送頻道ID", `${channel.id}`, true)
          .addField("備註", "<name> Discord 名稱\n<tag> Discord標籤", true);
        channel.send(embed);
      } finally {
        mongoose.connection.close();
      }
    });
  });

  command(client, "delleave", async (message) => {
    const { member, channel, guild } = message;
    if (!member.hasPermission("ADMINISTRATOR")) {
      channel.send("您沒有運行此命令的權限。");
      return;
    }

    await mongo().then(async (mongoose) => {
      try {
        const search = await leaveSchema.findOne({ _id: `${guild.id}` });
        //console.log(search);
        if (search === null) {
          channel.send("本伺服器沒設定離開訊息，使用`as@setleave`進行設定");
          return;
        }
        await leaveSchema.deleteOne({ _id: `${guild.id}` });
        channel.send("已關閉離開訊息");
        cache[message.guild.id] = null;
      } finally {
        mongoose.connection.close();
      }
    });
  });

  const onleave = async (member) => {
    const { guild } = member;

    let data = cache[guild.id];

    if (!data) {
      console.log(`從數據庫中獲取離開數據 [${guild.id},${guild.name}]`);

      await mongo().then(async (mongoose) => {
        try {
          const result = await leaveSchema.findOne({ _id: guild.id });
          if (!result) return;
          cache[guild.id] = data = [result.channelId, result.text];
        } finally {
          mongoose.connection.close();
        }
      });
    }
    if (!data) return;
    const channelId = data[0];
    const text = data[1];

    const channel = guild.channels.cache.get(channelId);
    channel.send(
      text
        .replace(/<name>/g, `${member.user.username}`)
        .replace(/<tag>/g, `${member.user.tag}`)
    );
  };

  command(client, "simleave", (message) => {
    onleave(message.member);
  });

  client.on("guildMemberRemove", (member) => {
    onleave(member);
  });
};
