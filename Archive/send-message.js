//臨時訊息
module.exports = (channel, text, duration = 10) => {
  channel.send(text).then((message) => {
    if (duration === -1) {
      return
    }

    setTimeout(() => {
      message.delete()
    }, 1000 * duration)
  })
}

//---bot.js---
const sendMessage = require('路徑') //定時

//#region 
const guild = client.guilds.cache.get('405916711930560523')
const channel = guild.channels.cache.get('698177994040147988')

sendMessage(channel, 'hello world', 3)
//#endregion