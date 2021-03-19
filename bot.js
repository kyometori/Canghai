//#region 導入discord.js
const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const command = require('./command')
//#endregion
//#region commmands-指令外加檔導入
//const firstMessage = require('./commands/first-message') //頻道訊息
const privateMessage = require('./commands/private-message')
//const roleClaim = require('./commands/role-claim') //自動身分組
const poll = require('./commands/poll') //自動投票 
//const memberCount = require('./commands/member-count') //人數統計
//const sendMessage = require('./commands/send-message') //定時
//#endregion
//#region mongo-指令外加檔導入
const mongo = require('./mongo/mongo')
const welcome = require('./mongo/welcome') //歡迎訊息 
const messagecount = require('./mongo/message-counter') //用戶數據
//#endregion
//#region redis-指令外加檔導入
const mute = require('./redis/mute')
//#endregion
client.on('ready', async () => {
    console.log("成功登入" + client.user.tag)
    client.user.setActivity("as@幫助 | 製作者:WaDe#6765"); //正在遊玩...
    //client.users.fetch('').then((user) => {user.send('已啟動!!!')}) //發私訊說[已啟動]
    //#region 一般  :7-區塊
    //firstMessage(client, '', '已啟動', ['🔥']) //頻道訊息說[已啟動]
    privateMessage(client, 'pi', 'Pong!') 
    //roleClaim(client)  //自動身分組
    poll(client) //自動投票 
    //memberCount(client) //人數統計
    //#endregion
    //#region mongo :15-區塊
    welcome(client) //歡迎訊息
    messagecount(client) //用戶數據
    //#endregion
    //#region redis :20-區塊
    mute(client)
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
    //#region 指令區
    //#region ping,test皆回復[Pong!]
    command(client, ['ping', 'test'], (message) => {
        message.channel.send('Pong!')
    })
    //#endregion
    //#region 成員數量,servers
    command(client, ['成員數量', 'servers'], (message) => {
        client.guilds.cache.forEach((guild) => {
            //console.log(guild),
            message.channel.send(
                `${guild.name} 共有 ${guild.memberCount} 位成員`
            )
        })
    })
    //#endregion
    //#region 刪除該頻道所有訊息 (未啟用)
    /*command(client, ['cc', 'clearchannel'], (message) => {  
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                //console.log(results),
                message.channel.bulkDelete(results)
            })
        }
    })*/
    //#endregion
    //#region 更新bot狀態
    command(client, 'status', (message) => {
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
    //#region 創建頻道
    command(client, '創建文字頻道', (message) => {  //創建文字頻道
        const name = message.content.replace('as@創建文字頻道 ', '')

        message.guild.channels
            .create(name, {
                type: 'text',
            })
            .then((channel) => {
                //console.log(channel)
                const categoryId = '813290604985319464'
                channel.setParent(categoryId)
            })
    })
    command(client, '創建語音頻道', (message) => {  //創建語音頻道
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
    })
    //#endregion
    //#region 普通embed
    command(client, 'embed', (message) => {
        const logo =
            'https://images-ext-1.discordapp.net/external/Rn2yYpEmFgSjGxvNOwrHO4DUr_PvOH0lVqp6QTP_qMg/https/i.imgur.com/zbXslRQ.png'
        const embed = new Discord.MessageEmbed()
            .setTitle('Example text embed')
            .setURL('https://www.youtube.com/channel/UCbV4xu5u33k_fN8HPLfPnsQ')
            .setAuthor(message.author.username)
            .setImage(logo)
            .setThumbnail(logo)
            .setFooter('This is a footer')
            .setColor('#66f5fd')
            .setTimestamp()
            .addFields(
                {
                    name: 'Field 1',
                    value: 'Hello world',
                    inline: true,
                },
                {
                    name: 'Field 2',
                    value: 'Hello world',
                    inline: true,
                },
                {
                    name: 'Field 3',
                    value: 'Hello world',
                    inline: true,
                },
                {
                    name: 'Field 4',
                    value: 'Hello world',
                }
            )
        message.channel.send(embed)
    })
    //#endregion
    //#region 伺服器信息,serverinfo
    command(client, ['伺服器信息', 'serverinfo'], (message) => {
        const { guild } = message

        const { name, region, memberCount, owner, id, createdAt, verificationLevel, } = guild
        const icon = guild.iconURL()

        const embed = new Discord.MessageEmbed()
            .setTitle(`${name}－ 伺服器信息`)
            .setThumbnail(icon)
            .setColor('#66f5fd')
            .setTimestamp()
            .addFields(
                {
                    name: '地區',
                    value: region,
                    inline: true,
                }, {
                name: '總人數',
                value: memberCount,
                inline: true,
            }, {
                name: '群主',
                value: owner.user.tag,
                inline: true,
            }, {
                name: '伺服器id',
                value: id,
                inline: true,
            }, {
                name: '創建時間',
                value: createdAt,
                inline: true,
            }, {
                name: '驗證等級',
                value: verificationLevel,
                inline: true,
            }
            )

        message.channel.send(embed)
    })
    //#endregion
    //#region 幫助,help
    command(client, ['幫助', 'help'], (message) => {
        const embed = new Discord.MessageEmbed()
            .setColor('#66f5fd')
            .setTitle('插件指令')
            .setTimestamp()
            .setThumbnail('https://ppt.cc/fLWcMx')
            .addFields(
                {
                    name: '前綴',
                    value: 'as@',
                },
                {
                    name: 'ping,test',
                    value: 'pong',
                    inline: true,
                },
                {
                    name: 'as@成員數量',
                    value: '該群成員數量',
                    inline: true,
                }, {
                name: 'as@伺服器信息',
                value: '該群伺服器信息',
                inline: true,
            }
            )
            .setDescription('**會持續增加**')
        message.channel.send(embed)
    })
    //#endregion
    //#region 封鎖,ban
    command(client, ['封鎖', 'ban'], (message) => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`

        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('BAN_MEMBERS')
        ) {
            const target = mentions.users.first()
            console.log(target)
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.ban()
                message.channel.send(`${tag},已把${target}列入封鎖名單`)
            } else {
                message.channel.send(`${tag} 請指定要封鎖的人`)
            }
        }
        else {
            message.channel.send(`${tag} 沒有權限使用該功能.`)
        }
    })
    //#endregion
    //#region 踢除,kick
    command(client, ['踢除', 'kick'], (message) => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`

        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')
        ) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.kick()
                message.channel.send(`${tag},已把${target}剔除該伺服器`)
            } else {
                message.channel.send(`${tag} 請指定要踢除的人`)
            }
        }
        else {
            message.channel.send(`${tag} 沒有權限使用該功能.`)
        }
    })
    //#endregion
    //#region 臨時訊息
    // const guild = client.guilds.cache.get('405916711930560523')
    // const channel = guild.channels.cache.get('698177994040147988')

    // sendMessage(channel, 'hello world', 3)
    //#endregion
    //#endregion
})
//#region key
client.login(config.token)
//#endregion