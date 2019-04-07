const Discord = require("discord.js");
var cowsay = require("cowsay");
const config = require("../config.json");

exports.run = (client, message, args) => {

    let text = args.join(" ");

    let helpEmbed = new Discord.RichEmbed()
        .setColor("#a905fc")
        .setTitle("Command: Cowsay")
        .addField("Description:", "Get a cow to say anything!", true)
        .addField("Usage", "`.cowsay <text>`", true)
        .addField("Example", "`.cowsay Hello world!`")
        .addField("Note", "Don't abuse this command please :)")
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`);

    if (!text) return message.channel.send(helpEmbed);

    message.channel.send("```" + cowsay.say({
            text: text
        }) + "```");
}

module.exports.help = {
    name: "cowsay"
}