module.exports = {
  commands: ["leave-help", "離開設定"],
  permissionError: "您需要管理員權限才能運行此命令",
  minArgs: 0,
  maxArgs: 0,
  description: "進行離開的設定(Make leave settings)",
  callback: (message, arguments, text) => {
    message.reply(
      `**歡迎進行離開設定**\n\n
        **as@setleave ** 為設定離開訊息(注意:請在你要發送的頻道進行輸入)\n
        **as@simleave** 為檢視你所設定是否有誤，如果有請重新設定\n\n
        **Welcome to leave settings**\n\n
        **as@setleave ** is to set the leave message (Note: Please enter it in the channel you want to send)\n
        **as@simleave** is to check whether your setting is wrong, if so, Please reset`
    );
  },
  permissions: "ADMINISTRATOR",
};
