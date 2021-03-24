//#region 導入discord.js
const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const command = require('./command')
const path = require('path')
const fs = require('fs')
//#endregion

//#region
const firstMessage = require('./extra/first-message') //頻道訊息
const poll = require('./extra/poll') //自動投票 
//#endregion

//#region mongo-指令外加檔導入
const mongo = require('./mongo/mongo')
const welcome = require('./mongo/welcome') //歡迎訊息
const leave=require('./mongo/Leave')
//#endregion

//#region redis-指令外加檔導入
const mute = require('./redis/mute')
//#endregion

client.on('ready', async () => {
    console.log("成功登入" + client.user.tag)
    client.user.setActivity("as@幫助 | 製作者:WaDe#6765"); //正在遊玩...

    //#region command
    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)
    const readCommands = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file))
                commandBase(client, option)
            }
        }
    }
    readCommands('commands')
    //#endregion

    //#region mongodb
    await mongo().then((mongoose) => {
        try {
            console.log('已連接到mongo!')
        } finally {
            mongoose.connection.close()
        }
    })
    //#endregion

    //#region 一般
    //client.users.fetch('').then((user) => {user.send('已啟動!!!')}) //發私訊說[已啟動]
    firstMessage(client, '819820219052458014', '已啟動', ['🔥']) //頻道訊息說[已啟動]
    poll(client) //自動投票
    //#endregion

    //#region mongo
    welcome(client) //歡迎訊息
    leave(client)
    //#endregion

    //#region redis
    mute(client)
    //#endregion

})

//#region key
client.login(config.token)
//#endregion