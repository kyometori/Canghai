module.exports = {
    commands: 'status',
    permissionError: '您需要管理員權限才能運行此命令',
    expectedArgs: '<狀態>\n狀態是修改bot的狀態',
    minArgs: 2,
    maxArgs: 5,
    callback: (message, client) => {
        const content = message.content.replace('as@status ', '')
        // "!status hello world" -> "hello world"

        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            },
        })
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}
