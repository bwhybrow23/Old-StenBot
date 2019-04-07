const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {

    let dblue = config.dblue;
    let red = config.red;

    let bug = args.slice(0).join(" ");

    let bugHelpEmbed = new Discord.RichEmbed()
    .setColor(dblue)
    .setTitle("Command: Bug")
    .addField("Description:", "Report any bugs with the bot.", true)
    .addField("Usage", "`.bug <bug>`", true)
    .addField("Example", "`.bug I can access owner commands`")
    .addField("Note", "All bugs are reported to Stentorian and are immediately looked at. Any information provided is grateful.");
  
    if (args.length === 0)
    return message.channel.send(bugHelpEmbed);
  
    message.delete().catch(O_o => {});
  
    let bugEmbed = new Discord.RichEmbed()
    .setDescription(`Bug from ${message.author}!`)
    .setColor(red)
    .addField("Bug",`${bug}`)
    .addField("Bug Reported By", `${message.author.username}`)
    .setTimestamp()
    .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`);
  
    let botowner = bot.users.get(config.botowner);

    botowner.send(bugEmbed);

}

module.exports.help = {
  name: "bug"
}
