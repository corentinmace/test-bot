config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
prefix = config.prefix;
servtoken = config.servtoken;
bottoken = config.bottoken;



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (message.content === '<@512176143072231434>') {
    message.reply( '.help si tu as besoin d\'aide');
  }


  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();
  const user = message.mentions.users.first();
	const member = message.guild.member(user);




  if (message.content === prefix + "help") {
    message.reply(".help pour afficher les commandes, .createclan, ect");
  }


  if (message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "clear")){
       if (message.member.hasPermission("MANAGE_MESSAGES")) {
           message.channel.fetchMessages()
              .then(function(list){
                   message.channel.bulkDelete(list);
               }, function(err){message.channel.send("ERROR: ERROR CLEARING CHANNEL.")});
       }
   }


   if (message.content.startsWith(prefix + "createclan")) {
     const args = message.content.slice(prefix.length).split(' ');
     const command = args.shift().toLowerCase();
     message.channel.send(`Command name: ${command}\nArguments: ${args}`);

     message.guild.createRole({
  name: args[0],
  color: args[1],
})
  .then(role => console.log(`Created new role with name ${role.name} and color ${role.color}`))
  .catch(console.error)

   }

   //REQUEST
     const wfu = message.guild.channels.find(ch => ch.name === 'yamete');
     const au = message.guild.channels.find(ch => ch.name === 'les-portes-de-lenfer');

   if (message.content.startsWith(prefix + "WFU")) {


     wfu.send(`${message.author} veut rejoindre la Waifu Army !`);
   }

   if (message.content.startsWith(prefix + "AU")) {


     au.send(`${message.author} veut rejoindre l'Arcane de l'Umbra !`);
   }

   if (message.content.startsWith(prefix + "accept") && message.member.roles.has("528573193510846465")) {
     member.addRole("528573193510846465");
     message.reply(`Bienvenue dans la Waifu Army @${user.tag}`);
   }
   if (message.content.startsWith(prefix + "refuse") && message.member.roles.has("528573193510846465")) {
     member.send("Désolé mais tu n'as pas été accepté à la Waifu Army");
   }

   if (message.content.startsWith(prefix + "accept") && message.member.roles.has("528573281268137984")) {
     member.addRole("528573281268137984");
     message.reply(`Bienvenue dans l'Arcane de l'Umbra @${user.tag}`);
   }
   if (message.content.startsWith(prefix + "refuse") && message.member.roles.has("528573281268137984")) {
     member.send("Désolé mais tu n'as pas été accepté à l'Arcane de l'Umbra");
   }
});



client.login(bottoken);
