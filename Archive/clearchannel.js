//刪除該頻道所有訊息
command(client, ['cc', 'clearchannel'], (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        message.channel.messages.fetch().then((results) => {
            //console.log(results),
            message.channel.bulkDelete(results)
        })
    }
})
