const redis = require("@util/redis");
const command = require("@util/command");

module.exports = (client) => {
  const redisKeyPrefix = "muted-";

  redis.expire((message) => {
    if (message.startsWith(redisKeyPrefix)) {
      const split = message.split("-");

      const memberId = split[1];
      const guildId = split[2];

      const guild = client.guilds.cache.get(guildId);
      const member = guild.members.cache.get(memberId);

      const role = getRole(guild);

      member.roles.remove(role);
    }
  });

  const getRole = (guild) => {
    return guild.roles.cache.find((role) => role.name === "Muted");
  };

  const giveRole = (member) => {
    const role = getRole(member.guild);
    if (role) {
      member.roles.add(role);
      console.log("Muted " + member.id);
    }
  };

  const onJoin = async (member) => {
    const { id, guild } = member;

    const redisClient = await redis();
    try {
      redisClient.get(`${redisKeyPrefix}${id}-${guild.id}`, (err, result) => {
        if (err) {
          console.error("Redis GET error:", err);
        } else if (result) {
          giveRole(member);
        } else {
          console.log("用戶沒有被靜音");
        }
      });
    } finally {
      redisClient.quit();
    }
  };

  command(client, "simjoin", (message) => {
    onJoin(message.member);
  });

  client.on("guildMemberAdd", (member) => {
    onJoin(member);
  });

  command(client, "mute", async (message) => {
    // as@mute @ duration duration_type

    const syntax = "as@mute <@> <duration as a number> <m, h, d, or life>";

    const { member, channel, content, mentions, guild } = message;

    if (!member.hasPermission("ADMINISTRATOR")) {
      channel.send("您沒有運行此命令的權限。");
      return;
    }

    const split = content.trim().split(" ");

    if (split.length !== 4) {
      channel.send("請使用正確的命令語法：" + syntax);
      return;
    }

    const duration = split[2];
    const durationType = split[3];

    if (isNaN(duration)) {
      channel.send("請提供持續時間。" + syntax);
      return;
    }

    const durations = {
      m: 60,
      h: 60 * 60,
      d: 60 * 60 * 24,
      life: -1,
    };

    if (!durations[durationType]) {
      channel.send("請提供有效的持續時間類型。" + syntax);
      return;
    }

    const seconds = duration * durations[durationType];

    const target = mentions.users.first();

    if (!target) {
      channel.send("請標記用戶為靜音.");
      return;
    }

    const { id } = target;

    console.log("ID:", id);

    const targetMember = guild.members.cache.get(id);
    giveRole(targetMember);

    const redisClient = await redis();
    try {
      const redisKey = `${redisKeyPrefix}${id}-${guild.id}`;

      if (seconds > 0) {
        redisClient.set(redisKey, "true", "EX", seconds);
      } else {
        redisClient.set(redisKey, "true");
      }
    } finally {
      redisClient.quit();
    }
  });
};
