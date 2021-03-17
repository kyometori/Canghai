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