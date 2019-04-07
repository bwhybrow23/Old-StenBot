const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
    let invites = await message.guild.fetchInvites().catch(error => {
        return message.channel.send('Sorry, I don\'t have the proper permissions to view invites!');
    });

    invites = invites.array();

    let possibleinvites = [];
    invites.forEach(function(invites) {
        possibleinvites.push(`${invites.inviter.username} ||  ${invites.uses}`)
    })

    const lbEmbed = new Discord.RichEmbed()
        .setTitle(`**INVITE LIST**`)
        .setColor("0xCB5A5E")
        .addField('Invites', `\`\`\`${possibleinvites.join('\n')}\`\`\``)
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`);

    message.channel.send(lbEmbed);
}

module.exports.help = {
    name: "invitelist"
}