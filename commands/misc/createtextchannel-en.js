module.exports = {
    commands: 'createtextchannel',
    expectedArgs: '<name>',
    minArgs: 1,
    maxArgs: 1,
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
}
