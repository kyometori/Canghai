const { prefix } = require("../config.json");

const validatePermissions = (permissions) => {
  const validPermissions = [
    "CREATE_INSTANT_INVITE", //允許創建即時邀請
    "KICK_MEMBERS", //允許踢成員
    "BAN_MEMBERS", //允許禁止會員
    "ADMINISTRATOR", //允許所有權限並繞過通道權限覆蓋
    "MANAGE_CHANNELS", //允許管理和編輯頻道
    "MANAGE_GUILD", //允許對公會進行管理和編輯
    "ADD_REACTIONS", //允許對消息添加反應
    "VIEW_AUDIT_LOG", //允許查看審核日誌
    "PRIORITY_SPEAKER", //允許在語音通道中使用優先
    "STREAM", //允許用戶上線
    "VIEW_CHANNEL", //允許公會成員查看頻道，包括閱讀文本頻道中的消息
    "SEND_MESSAGES", //允許在頻道中發送消息
    "SEND_TTS_MESSAGES", //允許發送/tts消息
    "MANAGE_MESSAGES", //允許刪除其他用戶的消息
    "EMBED_LINKS", //具有此權限的用戶發送的鏈接將被自動嵌入
    "ATTACH_FILES", //允許上傳圖像和文件
    "READ_MESSAGE_HISTORY", //允許閱讀消息歷史記錄
    "MENTION_EVERYONE", //允許使用@everyone標籤來通知頻道中的所有用戶，並使用@here標籤來通知頻道中的所有在線用戶
    "USE_EXTERNAL_EMOJIS", //允許使用來自其他服務器的自定義表情符號
    "VIEW_GUILD_INSIGHTS", //允許查看行會見解
    "CONNECT", //允許加入語音通道
    "SPEAK", //允許在語音通道中講話
    "MUTE_MEMBERS", //允許靜音語音通道中的成員
    "DEAFEN_MEMBERS", //允許語音通道中的成員耳聾
    "MOVE_MEMBERS", //允許成員在語音通道之間移動
    "USE_VAD", //允許在語音通道中使用語音活動
    "CHANGE_NICKNAME", //允許修改自己的暱稱
    "MANAGE_NICKNAMES", //允許修改其他用戶的暱稱
    "MANAGE_ROLES", //允許管理和編輯角色
    "MANAGE_WEBHOOKS", //允許管理和編輯Webhooks
    "MANAGE_EMOJIS", //允許管理和編輯表情符號
  ];

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`未知權限-"${permission}"`);
    }
  }
};

module.exports = (client, commandOptions) => {
  let {
    commands,
    expectedArgs = "",
    permissionError = "您沒有運行此命令的權限。",
    minArgs = 0,
    maxArgs = null,
    permissions = [],
    requiredRoles = [],
    callback,
  } = commandOptions;

  // Ensure the command and aliases are in an array,確保命令和別名位於數組中
  if (typeof commands === "string") {
    commands = [commands];
  }

  console.log(`註冊命令 "${commands[0]}"`);

  // Ensure the permissions are in an array and are all valid,確保權限在一個數組中並且全部有效
  if (permissions.length) {
    if (typeof permissions === "string") {
      permissions = [permissions];
    }

    validatePermissions(permissions);
  }

  // Listen for messages,聽消息
  client.on("message", (message) => {
    const { member, content, guild } = message;

    for (const alias of commands) {
      const command = `${prefix}${alias.toLowerCase()}`;

      if (
        content.toLowerCase().startsWith(`${command} `) ||
        content.toLowerCase() === command
      ) {
        // A command has been ran,命令已經執行

        // Ensure the user has the required permissions,確保用戶具有所需的權限
        for (const permission of permissions) {
          if (!member.hasPermission(permission)) {
            message.reply(permissionError);
            return;
          }
        }

        // Ensure the user has the required roles,確保用戶具有所需角色
        for (const requiredRole of requiredRoles) {
          const role = guild.roles.cache.find(
            (role) => role.name === requiredRole
          );

          if (!role || !member.roles.cache.has(role.id)) {
            message.reply(`您必須具有 "${requiredRole}" 身分組來使用此命令。`);
            return;
          }
        }

        // Split on any number of spaces,在任意數量的空格上分割
        const arguments = content.split(/[ ]+/);

        // Remove the command which is the first index,刪除作為第一個索引的命令
        arguments.shift();

        // Ensure we have the correct number of arguments,確保我們有正確數量的參數
        if (
          arguments.length < minArgs ||
          (maxArgs !== null && arguments.length > maxArgs)
        ) {
          message.reply(
            `語法不正確！ 請使用 ${prefix}${alias} ${expectedArgs}`
          );
          return;
        }

        // Handle the custom command code,處理自定義命令代碼
        callback(message, arguments, arguments.join(" "), client);

        return;
      }
    }
  });
};
