module.exports = {
    commands: ['invites', '邀請排名'],
    minArgs: 0,
    maxArgs: 0,
    callback: (message) => {
        const { guild } = message

        guild.fetchInvites().then((invites) => {
            const inviteCounter = {
                bob: 0,
                joe: 0,
            }

            invites.forEach((invite) => {
                const { uses, inviter } = invite
                const { username, discriminator } = inviter

                const name = `${username}#${discriminator}`

                inviteCounter[name] = (inviteCounter[name] || 0) + uses
            })

            let replyText = '\nInvites:'

            const sortedInvites = Object.keys(inviteCounter).sort(
                (a, b) => inviteCounter[b] - inviteCounter[a]
            )

            console.log(sortedInvites)

            sortedInvites.length = 3

            for (const invite of sortedInvites) {
                const count = inviteCounter[invite]
                replyText += `\n${invite} 已邀請 ${count} 位人!`
            }

            message.reply(replyText)
        })
    },
}
