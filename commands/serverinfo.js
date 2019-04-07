const Discord = require("discord.js");
const config = require("../config.json");

    module.exports.run = async (bot, message, args) => {
      let sicon = message.guild.iconURL;
      let serverembed = new Discord.RichEmbed()
          .setDescription("Server Information")
          .setColor("#a905fc")
          .setThumbnail(sicon)
          .addField("Server Name", message.guild.name)
          .addField("Owned By", `${message.guild.owner} with ID ${message.guild.ownerID}`)
          .addField("Created On", message.guild.createdAt)
          .addField("You Joined", message.member.joinedAt)
          .addField("Total Members", message.guild.memberCount);

          message.channel.send(serverembed);
    }

    module.exports.help = {
      name: "serverinfo"
    }