module.exports = {
    commands: ['踢除', 'kick'],
    expectedArgs: '<name>',
    permissionError: '您需要管理員權限才能運行此命令',
    minArgs: 1,
    maxArgs: 1,
    callback: (message) => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`

        const target = mentions.users.first()
        if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.kick()
            message.channel.send(`${tag},已把${target}剔除該伺服器`)
        } else {
            message.channel.send(`${tag} 請指定要踢除的人`)
        }
    },
    permissions: ['ADMINISTRATOR', 'KICK_MEMBERS'],
}
