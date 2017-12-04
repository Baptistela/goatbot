exports.run = async(client, message, args) => {

    if  (!message.member.hasPermissions(["BAN_MEMBERS"])) return message.reply("Você nao tem o direito de usar esse comando!");
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first(); 
    if (reason.length < 1) return message.reply('Você precisa inserir uma razão para banir!');
    if (message.mentions.users.size < 1) return message.reply('Você precisa selecionar quem você quem banir!').catch(console.error);

    if (!message.guild.member(user).bannable) return message.reply("Você não posso banir esse usuario");
    let member = await message.guild.member(user).ban()
 
    const Discord = require("discord.js");
    const embed = new Discord.RichEmbed()
        .setColor('#FF0000')
        .setTimestamp()
        .addField('Ação:', '__***Ban***__')
        .addField('Usuario:', `${user.username}`)
        .addField('Staff:', `${message.author.username}`)
        .addField('Razão', reason)
        .setFooter('An Official Baptistella Bot')
    return message.channel.sendEmbed(embed).catch(console.error);
    
};