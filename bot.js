//#region 導入discord.js
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const command = require("./command");
const loadCommands = require("./commands/load-commands");
//#endregion

//#region
const firstMessage = require("./extra/first-message"); //頻道訊息
const poll = require("./extra/poll"); //自動投票
//#endregion

//#region mongo-指令外加檔導入
const mongo = require("./mongo/mongo");
const welcome = require("./mongo/welcome"); //歡迎訊息
const leave = require("./mongo/Leave");
//#endregion

//#region redis-指令外加檔導入
const mute = require("./redis/mute");
//#endregion

client.on("ready", async () => {
  console.log("成功登入" + client.user.tag);
  client.user.setActivity("as@幫助 | 製作者:WaDe#6765"); //正在遊玩...

  //#region commands
  loadCommands(client);
  //#endregion

  //#region mongodb
  await mongo().then((mongoose) => {
    try {
      console.log("已連接到mongo!");
    } finally {
      mongoose.connection.close();
    }
  });
  //#endregion

  //#region 一般
  //client.users.fetch('').then((user) => {user.send('已啟動!!!')}) //發私訊說[已啟動]
  firstMessage(client, "819820219052458014", "已啟動", ["🔥"]); //頻道訊息說[已啟動]
  poll(client); //自動投票
  //#endregion

  //#region mongo
  welcome(client); //歡迎訊息
  leave(client);
  //#endregion

  //#region redis
  mute(client);
  //#endregion
});

//#region key
client.login(config.token);
//#endregion
