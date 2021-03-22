module.exports = {
    commands: ['封鎖', 'ban'],
    expectedArgs: '<name>',
    permissionError: '您需要管理員權限才能運行此命令',
    minArgs: 1,
    maxArgs: 1,
    callback: (message) => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`

        const target = mentions.users.first()
        console.log(target)
        if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.ban()
            message.channel.send(`${tag},已把${target}列入封鎖名單`)
        } else {
            message.channel.send(`${tag} 請指定要封鎖的人`)
        }
    },
    permissions: ['ADMINISTRATOR', 'BAN_MEMBERS'],
}
