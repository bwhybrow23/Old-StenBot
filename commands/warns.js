const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {

  let warnsHelpEmbed = new Discord.RichEmbed()
  .setColor("#a905fc")
  .setTitle("Command: Warns")
  .addField("Description:", "Check a user's warnings.", true)
  .addField("Usage", ".warns @<user>", true)
  .addField("Example", ".warns @Stentorian#9524")
  .addField("Note", "If you would like to see the reasons then you will have to go through the logs as the bot doesn't store the reasons.");

  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You can't do that.");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.channel.send(warnsHelpEmbed);
  let warnlevel = warns[wUser.id].warns || "0";

  let logChannel = message.guild.channels.find(`name`, "logs")

  message.channel.send(`<@${wUser.id}> has **${warnlevel}** warning(s). If you would like to see the reasons, please go to ${logChannel} and search for it manually as the bot is not eligible to retrieve reasons from warnings!`);

}

module.exports.help = {
  name: "warns"
}
