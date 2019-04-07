const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args, prefix) => {

    let gay = Math.round(Math.random() * 100);

    let person = message.mentions.users.first().username || message.author.username;

    let gayembed = new Discord.RichEmbed()
        .setColor("#f442d4")
        .setTitle(`:gay_pride_flag: **I think ${person} is ${gay}% gay!** :gay_pride_flag:`);
        
    return message.channel.send(gayembed);
};

module.exports.help = {
    name: "gay"
};