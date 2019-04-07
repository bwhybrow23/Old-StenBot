const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {

    let onlineEmbed = new Discord.RichEmbed()
        .setDescription("StenBot is online! :tada:")
        .setColor("#00ff00")

    message.channel.send(onlineEmbed);
}

module.exports.help = {
    name: "online"
}