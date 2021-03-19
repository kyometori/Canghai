module.exports = {
    commands: ['add', 'addition'],
    expectedArgs: '<num1> <num2>',
    permissionError: '您需要管理員權限才能運行此命令',
    minArgs: 2,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        const num1 = +arguments[0]
        const num2 = +arguments[1]

        message.reply(`總和是 ${num1 + num2}`)
    },
    permissions: [],
    requiredRoles: [],
}
