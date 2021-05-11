require("module-alias/register");

//#region 導入discord.js
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("@root/config.json");
const command = require("@util/command");
const loadCommands = require("@root/commands/load-commands");
//#endregion

//#region @util
const firstMessage = require("@util/first-message"); //頻道訊息
const poll = require("@features/poll"); //自動投票
//#endregion

//#region mongo-指令外加檔導入
const mongo = require("@util/mongo");
const welcome = require("@features/welcome"); //歡迎訊息
const leave = require("@features/Leave"); //離開
//#endregion

//#region redis-指令外加檔導入
const mute = require("@features/mute");
//#endregion

client.on("ready", () => {
  //#region 啟動資訊
  console.log(
    `-----------------------------------------------------\n` +
      `機器人登入成功!!!!\n` +
      `-----------------------------------------------------\n` +
      `機器人資訊:\n` +
      `機器人名稱: ${client.user.username} (${client.user.tag})\n` +
      `機器人ID: ${client.user.id}\n` +
      `機器人群組數量: ${client.guilds.cache.size}\n` +
      `機器人管理人數: ${client.users.cache.size}\n` +
      `機器人管理上線人數: ${
        client.users.cache.filter(
          (member) => member.presence.status === "online"
        ).size
      }\n` +
      `機器人管理閒置人數: ${
        client.users.cache.filter((member) => member.presence.status === "idle")
          .size
      }\n` +
      `機器人管理勿擾人數: ${
        client.users.cache.filter((member) => member.presence.status === "dnd")
          .size
      }\n` +
      `機器人管理下線人數: ${
        client.users.cache.filter(
          (member) => member.presence.status === "offline"
        ).size
      }\n` +
      `-----------------------------------------------------\n` +
      `機器人所在群組名稱: \n\n${client.guilds.cache
        .map((g) => g.name)
        .join(`\n`)}\n\n` +
      `上次將客戶端視為處於該READY狀態的時間:\n ${client.readyAt}\n`
  );
  //#endregion

  //#region 正再遊玩顯示
  setInterval(() => {
    var games = [
      `查詢指令:as@help`,
      `作者:WaDe#6765`,
      `支持作者:\nhttps://discord.gg/szmDnMmhGx`,
      `正在${client.guilds.cache.size}個伺服器服務中`,
    ];
    var game = games[Math.floor(Math.random() * games.length)];
    client.user.setActivity(`${game}`, { type: "PLAYING" });
    return;
  }, 5000);
  //#endregion
});

client.on("ready", async () => {
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
  firstMessage(client, "638726963745390594", "已啟動", ["🔥"]); //頻道訊息說[已啟動]
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
