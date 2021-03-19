module.exports = {
    commands: 'createtextchannel',
    callback: (message) => {
        const name = message.content.replace('as@createtextchannel ', '')

        message.guild.channels
            .create(name, {
                type: 'text',
            })
            .then((channel) => {
                //console.log(channel)
                const categoryId = '813290604985319464'
                channel.setParent(categoryId)
            })
    },
    permissions: [],
    requiredRoles: [],
}
