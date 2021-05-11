module.exports = {
  commands: ["botinvite", "invitebot", "botlink", "botinvitelink"],
  maxArgs: 0,
  description: "Provides a link to share the bot with others.",
  callback: (message) => {
    const botInvite = "https://top.gg/bot/806555021340573756#/";
    return message
      .reply(`The link to invite the bot is: ${botInvite}`)
      .then((msg) => {
        msg.delete({ timeout: 30000 });
      });
  },
  permissions: [],
  requiredRoles: [],
};
