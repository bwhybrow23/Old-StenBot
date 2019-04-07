const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {

    let clearEmbed = new Discord.RichEmbed()
        .setDescription("Messages Cleared")
        .setColor("#34a392")
        .addField("Cleared Amount", `${args[0]}`)
        .addField("Cleared By", `<@${message.author.id}> with ID: ${message.author.id}`)
        .addField("Cleared In", message.channel)
        .addField("Cleared on", message.createdAt);

    let logChannel = message.guild.channels.find(`name`, "logs");
    if (!logChannel) return message.channel.send("Can't find log channel! Please create a channel called #logs");

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Insufficient Permissions");

    let clearHelp = new Discord.RichEmbed()
        .setColor("#a905fc")
        .setTitle("Command: Clear")
        .addField("Description:", "Clear a certain number of messages", true)
        .addField("Usage", "`.clear <number of messages>`", true)
        .addField("Example", "`.clear 45`")
        .addField("Note", "Any messages older than 14 days old cannot be deleted due to Discord's API.")
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`);

    if (!args[0]) return message.channel.send(clearHelp);

    message.channel.bulkDelete(args[0]).then(() => {
        logChannel.send(clearEmbed);
        message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(2000));
    });
}

module.exports.help = {
    name: "clear"
}