const mongo = require("@util/mongo");
const command = require("@util/command");
const welcomeSchema = require("@schemas/welcome-schema");
const Discord = require("discord.js");

module.exports = (client) => {
  //!setwelcome <message>
  const cache = {}; // guildId: [channelId, text]

  command(client, "setwelcome", async (message) => {
    const { member, channel, content, guild } = message;

    if (!member.hasPermission("ADMINISTRATOR")) {
      channel.send("您沒有運行此命令的權限。");
      return;
    }

    let text = content;

    const split = text.split(" ");

    if (split.length < 2) {
      channel.send("請提供歡迎信息");
      return;
    }

    split.shift();
    text = split.join(" ");

    cache[guild.id] = [channel.id, text];

    await mongo().then(async (mongoose) => {
      try {
        await welcomeSchema.findOneAndUpdate(
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
          .setAuthor(`${guild.name} 歡迎訊息設定`, `${icon}`)
          .setColor()
          .setFooter(`由${message.author.tag}輸入`)
          .setTimestamp()
          .addField("設定訊息", `${text}`)
          .addField("發送頻道ID", `${channel.id}`, true)
          .addField("備註", "<user> 提及該人\n<tag>  Discord標籤", true);
        channel.send(embed);
      } finally {
        mongoose.connection.close();
      }
    });
  });

  command(client, "delwelcome", async (message) => {
    const { member, channel, guild } = message;
    if (!member.hasPermission("ADMINISTRATOR")) {
      channel.send("您沒有運行此命令的權限。");
      return;
    }

    await mongo().then(async (mongoose) => {
      try {
        const search = await welcomeSchema.findOne({ _id: `${guild.id}` });
        //console.log(search);
        if (search === null) {
          channel.send("本伺服器沒設定歡迎訊息，使用`as@setwelcome`進行設定");
          return;
        }
        await welcomeSchema.deleteOne({ _id: `${guild.id}` });
        channel.send("已關閉歡迎訊息");
        cache[message.guild.id] = null;
      } finally {
        mongoose.connection.close();
      }
    });
  });

  const onJoin = async (member) => {
    const { guild } = member;

    let data = cache[guild.id];

    if (!data) {
      console.log(`從數據庫中獲取歡迎數據 [${guild.id},${guild.name}]`);

      await mongo().then(async (mongoose) => {
        try {
          const result = await welcomeSchema.findOne({ _id: guild.id });
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
        .replace(/<tag>/g, `${member.user.tag}`)
        .replace(/<user>/g, `<@${member.id}>`)
    );
  };

  command(client, "simjoin", (message) => {
    onJoin(message.member);
  });

  client.on("guildMemberAdd", (member) => {
    onJoin(member);
  });
};
