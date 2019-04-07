const config = require("./config.json");
const Discord = require("discord.js");
const fs = require("fs");
var utils = require('bot-utils');
const bot = new Discord.Client({
    disableEveryone: true
});
bot.commands = new Discord.Collection();

//stuff for commands folder to work
fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        //console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

//new server
bot.on("guildCreate", async message => {
    //send in console
    console.log(`${bot.user.username} has joined a new server. ID: ${guild.id} Name: ${guild.name}`);

    //send to sten
    let newServerEmbed = new Discord.RichEmbed()
        .setColor(config.yellow)
        .setDescription("New Server")
        .addField("Server Name", guild.name)
        .addField("Server ID", guild.id)
        .addField("Server Owner", guild.owner.tag)
        .setFooter("New Server |")
        .setTimestamp();

    config.botowner.send(newServerEmbed);
})

//server config files
bot.on("guildCreate", async =>{

    if (fs.existsSync(`./bot_data/servers/${guild.id}`) == false)
        fs.mkdirSync(`./bot_data/servers/${guild.id}`, (err) => {
            if (err) return;
        });

    if (fs.existsSync(`./bot_data/servers/${guild.id}/warnings.json`) == false) {
        let warningsFile = {};
        fs.writeFileSync(`./bot_data/servers/${guild.id}/warnings.json`, JSON.stringify(warningsFile, null, 4), (err) => {
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

    if (fs.existsSync(`./bot_data/servers/${guild.id}/config.json`) == false) {
        let configFile = {
            "prefix": ".",
            "blacklist": "false",
            "premium": "false",
            "nameAtTimeOfSync": "\"" + guild.name + "\""
        };
        fs.writeFileSync(`./bot_data/servers/${guild.id}/config.json`, JSON.stringify(configFile, null, 4), (err) => {
            if (err) return;
        });
    };

    //give user file for each member
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

})

//member config files
bot.on("guildMemberAdd", member => {

    if (fs.existsSync(`./bot_data/users/${member.id}.json`) == false) {
        let userfile = {
            "money": "\"" + 0 + "\"",
            "username": "\"" + member.username + "\"",
            "tag": "\"" + member.discriminator + "\"",
            "id": "\"" + member.id + "\"",
            "firstjoined": "\"" + member.joinedAt + "\""
        };
        fs.writeFileSync(`./bot_data/users/${member.id}.json`, JSON.stringify(userFile, null, 4), (err) => {
            if (err) return;
        });
    };

});

//welcome message
bot.on("guildMemberAdd", async member => {
    console.log(`${member.tag} with ID ${member.id} joined the server.`);

    let welcomeChannel = member.guild.channels.find(`name`, "welcome-leave");
    if (!welcomeChannel) return console.log("Could not log a member joining as the server doesn't have a log channel!");
    let generalChannel = member.guild.channels.find(`name`, "general");
    if (!welcomeChannel) return generalChannel("Cannot log the member that has joined the server. Please create a channel called #welcome-leave. :smiley:");

    let welcomeEmbed = new Discord.RichEmbed()
        .setColor("GREEN")
        .setDescription(`Welcome ${member} to ${member.guild.name}! :smiley:`)
        .setFooter("User Joined")
        .setTimestamp();

    welcomeChannel.send(welcomeEmbed);
});

//leave message
bot.on("guildMemberRemove", async member => {
    console.log(`${member.tag} with ID ${member.id} left the server.`);

    let leaveChannel = member.guild.channels.find(`name`, "welcome-leave");
    if (!leaveChannel) return console.log("Could not log a member leaving as the server doesn't have a log channel!");
    let generalChannel = member.guild.channels.find(`name`, "general");
    if (!leaveChannel) return generalChannel("Cannot log the member that has left the server. Please create a channel called #welcome-leave. :smiley:");

    let leaveEmbed = new Discord.RichEmbed()
        .setColor("RED")
        .setDescription(`${member} has sadly left the server! :sad:`)
        .setFooter("User Left")
        .setTimestamp();

    leaveChannel.send(leaveEmbed);
});

//playing statuses
var presences = [
    "StenDevelopment",
    "@StenBot prefix",
    "Alone",
    "With Code",
    ".help",
    `On ${bot.guilds.size} servers!`
]

//do this when bot is ready
bot.on('ready', async () => {
    //says in console
    let date = new Date;
    console.log(`StenBot Version ${config.version} is online! \nAt ${date}`);

//changes playing status every X seconds
    bot.user.setActivity(utils.randItemFromArray(presences)).then(() => {
        setTimeout(() => {
            bot.user.setActivity(utils.randItemFromArray(presences))
        }, 600000)
    })
})

//STUFF TO FUNCTION
bot.on("message", async message => {
    if (message.author.bot) return;
    //disable DM
    if (message.channel.dm === "dm") return;

    //variables to work bot
    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);

});

//logging
bot.on('messageDelete', msg => {
    if (msg.author.bot) return;
    const logs = msg.guild.channels.find(channel => channel.name === "logs");
    let deleteMSGEmbed = new Discord.RichEmbed()
        .setColor("#ff00e1")
        .setThumbnail(msg.author.displayAvatarURL)
        .setAuthor(msg.author.tag)
        .setDescription(`**Message Deleted in <#${msg.channel.id}>**`)
        .addField("Message:", msg.content)
        .setTimestamp();
    logs.send(deleteMSGEmbed);
});

bot.on('messageUpdate', (omsg, nmsg) => {
    if (omsg.author.bot || nmsg.author.bot) return;
    const logs = nmsg.guild.channels.find(channel => channel.name === "logs");
    let editMSGEmbed = new Discord.RichEmbed()
        .setColor("#ff00e1")
        .setThumbnail(nmsg.author.displayAvatarURL)
        .setAuthor(nmsg.author.tag)
        .setDescription(`**Message Edited in <#${nmsg.channel.id}>**`)
        .addField("Before:", omsg.content)
        .setTimestamp();
    logs.send(editMSGEmbed);
});

//to connect
bot.login(config.token);