const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')

client.on('ready', () => {
    console.log("成功登入" + client.user.tag)
    //client.user.setActivity("As@指令"); //正在遊玩...

    //#region 
    command(client, ['ping', 'test'], (message) => { //ping
        message.channel.send('Pong!')
    })
    command(client, 'servers', (message) => {  //成員數量
        client.guilds.cache.forEach((guild) => {
            //console.log(guild),
            message.channel.send(
                `${guild.name} 共有 ${guild.memberCount} 位成員`
            )
        })
    })
    /*command(client, ['cc', 'clearchannel'], (message) => {  //刪除該頻道所有訊息
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                //console.log(results),
                message.channel.bulkDelete(results)
            })
        }
    })*/
    command(client, 'status', (message) => {  //更新bot狀態
        const content = message.content.replace('as@status ', '')
        // "!status hello world" -> "hello world"

        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            },
        })
    })
    //#endregion
})

client.login(config.token)
