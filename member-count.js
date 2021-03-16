module.exports = (client) => {
  const channelId = '819481535891243048'

  const updateMembers = (guild) => {
    const channel = guild.channels.cache.get(channelId)
    channel.setName(`所有人員數: ${guild.memberCount.toLocaleString()}`)
  }

  client.on('guildMemberAdd', (member) => updateMembers(member.guild))
  client.on('guildMemberRemove', (member) => updateMembers(member.guild))

  const guild = client.guilds.cache.get('405916711930560523')
  updateMembers(guild)
}
