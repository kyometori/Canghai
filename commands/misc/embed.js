const Discord = require('discord.js')
module.exports = {
    commands: 'embed',
    permissionError: '您需要管理員權限才能運行此命令',
    callback: (message) => {
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
    },
    permissions: [],
    requiredRoles: [],
}

