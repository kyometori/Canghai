module.exports = {
    commands: '創建語音頻道',
    callback: (message) => {
        const name = message.content.replace('as@創建語音頻道 ', '')

        message.guild.channels
            .create(name, {
                type: 'voice',
            })
            .then((channel) => {
                const categoryId = '813290604985319464'
                channel.setParent(categoryId)
                channel.setUserLimit(10)
            })
    },
    permissions: [],
    requiredRoles: [],
}
