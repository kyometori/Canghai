//#region 導入discord.js
const Discord = require('discord.js')
const client = new Discord.Client()
//#endregion
//#region 指令外加檔導入
const config = require('./config.json')
const command = require('./command')
const firstMessage = require('./first-message') //  :12 頻道訊息
const privateMessage = require('./private-message') // :15 發私訊
//#endregion

client.on('ready', () => {
    console.log("成功登入" + client.user.tag)

    firstMessage(client, '819820219052458014', '已啟動', ['🔥']) //頻道訊息說[已啟動]

    // privateMessage(client, 'pi', 'Pong!')
    // client.users.fetch('400275443854344192').then((user) => { //發私訊說[已啟動]
    //     user.send('已啟動!!!')
    // })
    //client.user.setActivity("As@指令"); //正在遊玩...

    //#region 指令區
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
    //#region 伺服器信息
    command(client, '伺服器信息', (message) => {
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
    //#endregion
})

//#region key
client.login(config.token)
//#endregion