module.exports = (client) => {
  const channelId = "727206192652353596"; // welcome channel
  const targetChannelId = "693724799146655764"; // rules and info

  client.on("guildMemberAdd", (member) => {
    // console.log(member)
    const message = `Please welcome <@${
      member.id
    }> to the server! Please check out ${member.guild.channels.cache
      .get(targetChannelId)
      .toString()}`;

    const channel = member.guild.channels.cache.get(channelId);
    channel.send(message);
  });
};
