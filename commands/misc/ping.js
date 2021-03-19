module.exports = {
    commands: ['ping', 'test'],
    minArgs: 0,
    maxArgs: 0,
    callback: (message) => {
        message.reply('Pong!')
    }
}
