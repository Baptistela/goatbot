const Discord = require('discord.js')
const bot = new Discord.Client();
const PREFIX = "$";
const fs = require('fs');

//
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      let eventFunction = require(`./events/${file}`);
      let eventName = file.split(".")[0];
  bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
    });
  });
  bot.on("message", message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;
   
    let command = message.content.split(" ")[0];
    command = command.slice(PREFIX.length);
   
    let args = message.content.split(" ").slice(1);
    // The list of if/else is replaced with those simple 2 lines:
   
    try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(bot, message, args);
    } catch (err) {
      console.error(err);
    }
   
  }); 


//
bot.on("ready", () =>   {
   console.log("BOT ONLINE")
   console.log("----------")
   });
//
bot.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find('name', 'welcome');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Bem Vindo ao Servidor, ${member}`);
  });
//

// // //
client.login(process.env.BOT_TOKEN);
