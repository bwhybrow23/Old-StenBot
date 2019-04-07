const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {

    message.channel.send("Ping?").then(m => m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`))
}

module.exports.help = {
    name: "ping"
};