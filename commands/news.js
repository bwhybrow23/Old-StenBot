const Discord = require("discord.js");
const fs = require("fs");
const config = require("../config.json");

module.exports.run = async (bot, message, args, prefix, err) => {

    //if no args
    if (!args[0]) {
        let newsHelpEmbed = new Discord.RichEmbed()
            .setColor(config.yellow)
            .setTitle("Command: News")
            .addField("Description:", "Set/View The News", true)
            .addField("Usage", ".news set {news} or .news view", true)
            .addField("Example", ".news set StenBot is the best bot!")
            .addField("Note", "News can only be set by anyone with Admin permissions and is on a per server basis.")
            .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`);

        message.channel.send(newsHelpEmbed);
    }

    //if args is set
    if (args[0] === "set") {
        //check perms
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.reply("You do not have permission to execute this command. If you believe this is an error, talk to an Admin.")
        } else {
            //if no args
            if (!args[0]) {
                let newsHelpEmbed = new Discord.RichEmbed()
                    .setColor(config.yellow)
                    .setTitle("Command: News")
                    .addField("Description:", "Set/View The News", true)
                    .addField("Usage", ".news set {news} or .news view", true)
                    .addField("Example", ".news set StenBot is the best bot!")
                    .addField("Note", "News can only be set by anyone with Admin permissions and is on a per server basis.")
                    .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`);

                message.channel.send(newsHelpEmbed);
            }

            //get news
            var newss = JSON.parse(fs.readFileSync(`./bot_data/servers/${message.guild.id}/news.json`, "utf-8"));
            let thestory = args.slice(1).join(" ");
            newss.story = thestory;

            //Save
            fs.writeFileSync(`./bot_data/servers/${message.guild.id}/news.json`, JSON.stringify(newss, null, 4), (err));

            //notify
            let newsSet = new Discord.RichEmbed()
                .setColor(config.green)
                .setDescription("The news has been set!")
                .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`)
                .setTimestamp();

            message.channel.send(newsSet);
        }
    }

    //if args are view
    if (args[0] === "view") {

        //get news
        var newss = JSON.parse(fs.readFileSync(`./bot_data/servers/${message.guild.id}/news.json`, "utf-8"));

        //news embed
        let newsEmbed = new Discord.RichEmbed()
            .setColor(config.yellow)
            .setTitle("Latest News")
            .setDescription(newss.story)
            .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`)
            .setTimestamp();

        //post news
        message.channel.send(newsEmbed);
    }
}


module.exports.help = {
    name: "news"
}