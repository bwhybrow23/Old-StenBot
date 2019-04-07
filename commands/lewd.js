const superagent = require("snekfetch");
const Discord = require('discord.js');
const config = require("../config.json");

exports.run = async (client, message, args, level) => {
    if (!message.channel.nsfw) return message.channel.send('You can only use this commands on NSFW Channel!')
    superagent.get('https://nekos.life/api/v2/img/lewd')
        .end((err, response) => {
            const lewdembed = new Discord.RichEmbed()
                .setImage(response.body.url)
                .setColor(`#ff00e9`)
                .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`);

            message.channel.send(lewdembed);
        })
};

module.exports.help = {
    name: "lewd"
};