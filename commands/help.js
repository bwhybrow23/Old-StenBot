const Discord = require("discord.js");
const config = require("../config.json");

  module.exports.run = async (bot, message, args) => {

    let dblue = config.dblue;
    
    let mainEmbed = new Discord.RichEmbed()
    .setColor(dblue)
    .setTitle("Help:")
    .setDescription("If a command has `<>` in it, that means that it is an optional argument. If it has `{}` in it, it is a required argument.");

    let memberEmbed1 = new Discord.RichEmbed()
    .setColor(dblue)
    .setTitle("Member Commands: 1/2")
    .setDescription("These are the commands available to everyone on the server!")
    .addField(".botinfo", "All publically visible information regarding the bot.")
    .addField(".bug {bug}", "Report any bugs that the developers should know about.")
    .addField(".credit", "People who helped with StenBot. Whether that's with coding or ideas.")
    .addField(".donate", "Help keep StenBot alive! All donations are appreciated and are noticed.")
    .addField(".haveibeenpwned {email}", "A command that checks various databases to see whether the email has been sold/leaked.")
    .addField(".help", "Displays this help menu!")
    .addField(".invite", "Displays instructions on how to invite StenBot to your Discord Server.")
    .addField(".invitelist", "Shows all invites, who created the invite and how many uses it has had.")
    .addField(".lewd", "**NSFW Command*** A command for drawn pornography.")
    .addField(".me <@user>", "Find out information about you or someone else.")
    .addField(".membercount", "Displays the amount of members on the server and what they're mode is (Online, Idle, Do Not Disturb, Offline)")
    .addField(".ping", "Displays latency information about the bot's connection with Discord.")
    .addField(".report {@user} {reason}", "Report a user to staff to review.")
    .addField(".serverinfo", "Displays information about the server such as the owner and it was created!")
    .addField(".store", "Links to server's store's website.")
    .addField(".suggest {idea}", "Suggest anything that you would like added to the server.")
    .addField(".suggestcmd {command/feature}", "Have a command or feature suggestion for the bot? Suggest it and it will be sent to Stentorian.")
    .addField(".website", "Links you to the server website or any information about it.");

    let memberEmbed2 = new Discord.RichEmbed()
    .setColor(dblue)
    .setTitle("Member Commands: 2/2")
    .setDescription("These are the commands available to everyone on the server!")
    .addField("1", "1")

    let funEmbed = new Discord.RichEmbed()
    .setColor(dblue)
    .setTitle("Fun Commands")
    .setDescription("These are commands that add a bit of fun to the server.")
    .addField(".8ball {question}", "Ask the bot any question and it will reply.")
    .addField(".achievement {achievement}", "Give yourself a Minecraft achievement. You deserve it!")
    .addField(".cat", "Displays a random image of a cat.")
    .addField(".cowsay {text}", "Get a cow to say anything you want.")
    .addField(".dog", "Displays a random image of a dog.")
    .addField(".gay <@user>", "It's pretty self explanatory.");

    let staffEmbed = new Discord.RichEmbed()
    .setColor(dblue)
    .setTitle("Staff Commands")
    .setDescription("These are the commands available to the staff of InfiniteIsles only!")
    .addField(".ban {@user} {reason}", "Bans specified user from the server.")
    .addField(".clear {no. of msgs}", "Clear specified number of messages from the chat.")
    .addField(".dm {@user} {message}", "**ADMIN ONLY** Send a DM from the bot to the user in a cool embed.")
    .addField(".embed {text}", "**ADMIN ONLY** Displays any text you want inside of a cool Discord embed.")
    .addField(".kick {@user} {reason}", "Kicks the specified user from the server.")
    .addField(".mute {@user} {reason}", "Restricts the specified user from talking until unmuted `!unmute`")
    .addField(".tempmute {@user} {time} {reason}", "Temporarily mute a user for a certain period of time.")
    .addField(".unmute {@user}", "Unmutes specified player if they are muted.")
    .addField(".warn {@user} {reason}", "Warns specified user. Usually used for minor things to keep track of the user.")
    .addField(".warns {@user}", "Check the amount of warnings the specified user has on the server.");
    
    message.author.send(mainEmbed);
    message.author.send(memberEmbed1)
    message.author.send(memberEmbed2);
    message.author.send(funEmbed);

    let helpSentEmbed = new Discord.RichEmbed()
    .setColor(config.green)
    .setDescription("Help has been sent to your DMs! If you have not recieved it then please make sure your DMs are open for messages!");
    
    message.channel.send(helpSentEmbed);

    let supportTeam = message.guild.roles.find("id", config.supportTeam);
    if (message.member.roles.has(supportTeam.id)) return message.author.send(staffEmbed);
    
  }

  module.exports.help = {
    name: "help"
  }