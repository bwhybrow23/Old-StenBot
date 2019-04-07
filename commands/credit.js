const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {

    let creditEmbed = new Discord.RichEmbed()
        .setDescription("StenBot Credit")
        .setColor("#a905fc")
        .addField("Founder/Coder", `Stentorian#9524`)
        .addField("Problem Solver", `dode5656#5324`)
        .addField("Bot Host", "Samb8104#0291")
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`);

    message.channel.send(creditEmbed);
}

module.exports.help = {
    name: "credit"
}