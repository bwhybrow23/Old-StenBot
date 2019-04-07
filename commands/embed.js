const Discord = require("discord.js");
const config = require("../config.json");

exports.run = (bot, message, args) => {

    let dblue = config.dblue;
    let green = config.green;

    if (!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("Insufficient Permissions to do this!");

    message.delete();

    let embedHelp = new Discord.RichEmbed()
    .setColor(dblue)
    .setTitle("Command: Embed")
    .addField("Description:", "Turns text into a Discord Embed.", true)
    .addField("Usage", ".embed <text>", true)
    .addField("Example", ".embed This is a really cool embed.")
    .addField("Note", "Only people with the `MANAGE SERVER` permission can use this. Any abuse will not be tollerated.");

    if (!args[0]) return message.channel.send(embedHelp)

    const customEmbed = new Discord.RichEmbed()
        .setDescription(args.join(" "))
        .setColor(green)
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`);

    message.channel.send(customEmbed);
};

exports.help = {
    name: 'embed'
};