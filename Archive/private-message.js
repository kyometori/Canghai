module.exports = (client, triggerText, replyText) => {
  client.on('message', (message) => {
    if (
      message.channel.type !== 'dm' &&
      message.content.toLowerCase() === triggerText.toLowerCase()
    ) {
      message.author.send(replyText)
    }
  })
}

/*
  !== 為頻道
  === 為私訊
*/

//---bot.js---
const privateMessage = require('路徑')

privateMessage(client, 'pi', 'Pong!')