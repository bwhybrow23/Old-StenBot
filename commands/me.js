const Discord = require('discord.js');
const moment = require("moment");
const config = require("../config.json");

exports.run = async (client, message, args) => {
    let user;
    // If the user mentions someone, display their stats. If they just run userinfo without mentions, it will show their own stats.
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else {
        user = message.author;
    }
    // Define the member of a guild.
    const member = message.guild.member(user);

    //Discord rich embed
    const meEmbed = new Discord.RichEmbed()
        .setColor('#9404e2')
        .setThumbnail(user.avatarURL)
        .setTitle(`${user.username}#${user.discriminator}`)
        .addField("ID:", `${user.id}`, true)
        .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
        .addField("Created At:", `${moment.utc(user.createdAt).format('Do MMMM YYYY, HH:mm')}`, true)
        .addField("Joined Server:", `${moment.utc(member.joinedAt).format('Do MMMM YYYY, HH:mm')}`, true)
        .addField("Bot:", `${user.bot}`, true)
        .addField("Status:", `${user.presence.status}`, true)
        .addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
        .addField("Roles:", member.roles.map(roles => `${roles.name}`).join(', '), false)
        .setFooter(`User Info for ${message.author.tag}`);

    message.channel.send(meEmbed);
}

module.exports.help = {
    name: "me"
}