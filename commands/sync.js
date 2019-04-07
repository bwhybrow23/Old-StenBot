const Discord = require("discord.js")
const fs = require("fs");
const config = require("../config.json");

exports.run = (bot, message, args) => {

    if (message.member.id === (config.botowner)) {

        var usersCounter = 0;
        var serverCounter = 0;

        //users sync
        message.guild.members.forEach(member => {

            if (fs.existsSync(`./bot_data/users/${member.id}.json`) == false) {
                let userfile = {
                    "money": "\"" + 0 + "\"",
                    "username": "\"" + member.username + "\"",
                    "tag": "\"" + member.discriminator + "\"",
                    "id": "\"" + member.id + "\"",
                    "firstjoined": "\"" + member.joinedAt + "\""
                };
                fs.writeFileSync(`./bot_data/users/${member.id}.json`, JSON.stringify(userfile, null, 4), (err) => {
                    if (err) return;
                });
                usersCounter = usersCounter + 1;

            };
        });

        //server sync
        bot.guilds.forEach(guild => {

            if (fs.existsSync(`./bot_data/servers/${message.guild.id}`) == false)
                fs.mkdirSync(`./bot_data/servers/${message.guild.id}`, (err) => {
                    if (err) return;
                });

            if (fs.existsSync(`./bot_data/servers/${message.guild.id}/warnings.json`) == false) {
                let warningsFile = {};
                fs.writeFileSync(`./bot_data/servers/${message.guild.id}/warnings.json`, JSON.stringify(warningsFile, null, 4), (err) => {
                    if (err) return;
                });
            };

            if (fs.existsSync(`./bot_data/servers/${guild.id}/news.json`) == false) {
                let newsFile = {
                    "story": "No news has been set. Use `.news set` to set the news."
                };
                fs.writeFileSync(`./bot_data/servers/${guild.id}/news.json`, JSON.stringify(newsFile, null, 4), (err) => {
                    if (err) return;
                });
            };
        

            if (fs.existsSync(`./bot_data/servers/${message.guild.id}/config.json`) == false) {
                let configFile = {
                    "prefix": ".",
                    "blacklist": "false",
                    "premium": "false",
                    "nameAtTimeOfSync": "\"" + guild.name + "\""
                };
                fs.writeFileSync(`./bot_data/servers/${message.guild.id}/config.json`, JSON.stringify(configFile, null, 4), (err) => {
                    if (err) return;
                });

                serverCounter = serverCounter + 1;
            };

        })

        let syncEmbed = new Discord.RichEmbed()
            .setColor(config.yellow)
            .setDescription(`**${usersCounter}** members data has been synced. **${serverCounter}** guilds data has been synced.`);

        message.channel.send(syncEmbed);

    } else {
        message.reply(`You do not have permission to run this command.`);
    };

};

module.exports.help = {
    name: "sync"
}