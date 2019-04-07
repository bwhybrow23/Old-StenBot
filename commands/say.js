const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {

  let sayHelp = new Discord.RichEmbed()
  .setColor(config,dblue)
  .setTitle("Command: Say")
  .addField("Description:", "Get the Bot to say a message", true)
  .addField("Usage", ".say <message>", true)
  .addField("Example", ".say Dyno is bad")
  .addField("Note", "Any abuse of this command will result in a command ban to that user!");

  let botowner = bot.users.get(config.botowner);

  if(message.author.id !== (botowner)) return message.reply("Insufficient Permissions");

  let botmessage = args.join(" ");

  if(!botmessage) return message.channel.send(sayHelp);

  message.delete().catch();
  message.channel.send(botmessage);
}

module.exports.help = {
  name: "say"
}
