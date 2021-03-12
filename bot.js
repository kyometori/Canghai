const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json') 
const command = require('./command') 
const firstMessage = require('./first-message') //  :12 頻道訊息
const privateMessage = require('./private-message') // :15 發私訊

client.on('ready', () => {
    console.log("成功登入" + client.user.tag)

    firstMessage(client, '819820219052458014', '已啟動', ['🔥']) //頻道訊息說[已啟動]

    privateMessage(client, 'pi', 'Pong!')  
    client.users.fetch('400275443854344192').then((user) => { //發私訊說[已啟動]
        user.send('已啟動!!!')
    })
    //client.user.setActivity("As@指令"); //正在遊玩...

    //#region 
    command(client, ['ping', 'test'], (message) => { //ping,test皆回復[Pong!]
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