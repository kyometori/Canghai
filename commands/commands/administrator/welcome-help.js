module.exports = {
  commands: ["welcome-help", "歡迎設定"],
  permissionError: "您需要管理員權限才能運行此命令",
  minArgs: 0,
  maxArgs: 0,
  description: "進行歡迎的設定(Make welcome settings)",
  callback: (message, arguments, text) => {
    message.reply(
      `**歡迎進行歡迎設定**\n\n
        **as@setwelcome ** 為設定歡迎訊息(注意:請在你要發送的頻道進行輸入)\n
        **as@simjoin** 為檢視你所設定是否有誤，如果有請重新設定\n\n
        **Welcome to welcome setting**\n\n
        **as@setwelcome ** is to set the welcome message (Note: Please enter it in the channel you want to send)\n
        **as@simjoin** is to check whether your setting is wrong, if so, Please reset it`
    );
  },
  permissions: "ADMINISTRATOR",
};
