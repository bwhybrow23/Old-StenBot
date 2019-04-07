const Discord = require("discord.js")
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.avatarURL;
  let botembed = new Discord.RichEmbed()
      .setDescription("Bot Information")
      .setColor("#a905fc")
      .setThumbnail(bicon)
      .addField("Bot Name", bot.user.username)
      .addField("Owned By", "Stentorian#9524")
      .addField("Created On", bot.user.createdAt)
      .addField("Number Of Guilds", bot.guilds.size)
      .addField("Total Users", bot.users.size)
      .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`);

      message.channel.send(botembed);
}

module.exports.help = {
  name: "botinfo"
}