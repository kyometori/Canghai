module.exports = {
    commands: 'clear',
    permissionError: '您需要管理員權限才能運行此命令',
    callback: async (message, args) => {
        if (!args[0]) return message.reply("請輸入要清除的消息數量！");

        if (isNaN(args[0])) return message.reply("請輸入真實數字！");

        if (args[0] > 100) return message.reply("您最多可以刪除100條消息！");

        if (args[0] < 1) return message.reply("您必須刪除至少一條消息！");

        await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
            message.channel.bulkDelete(messages)
        })

    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}
