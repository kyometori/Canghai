module.exports = {
    commands: ['成員數量', 'servers'],
    permissionError: '您需要管理員權限才能運行此命令',
    callback: (message, arguments, text, client) => {
        client.guilds.cache.forEach((guild) => {
            //console.log(guild),
            message.channel.send(
                `${guild.name} 共有 ${guild.memberCount} 位成員`
            )
        })
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}
