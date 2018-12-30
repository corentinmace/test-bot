config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
prefix = config.prefix;
servtoken = config.servtoken;
bottoken = config.bottoken;



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
 client.user.setPresence({ game: { name: `Il y a actuellement ${client.guilds.get(servtoken).memberCount} étudiants !`, type: 0 } });

});

client.on('message', message => {
  if (message.content === '<@528892444444459009>') {
    message.reply( '.help si tu as besoin d\'aide');
  }
  if(message.content === prefix + "info"){

  			let sicon = message.guild.iconURL;
  			let serverembed = new Discord.RichEmbed()
  			.setDescription("Informations du serveur")
  			.setColor("0xFFFFFF")
  			.setThumbnail(sicon)
  			.addField("Nom du serveur", message.guild.name)
  			.addField("Crée le", message.guild.createdAt)
  			.addField("Rejoins le", message.member.joinedAt)
  			.addField("Nombres de membres", message.guild.memberCount);

  			return message.channel.send(serverembed);
  			}

  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();
  const user = message.mentions.users.first();
	const member = message.guild.member(user);




  if (message.content === prefix + "help"){ //Affiche les commandes disponibles
      const embed = new Discord.RichEmbed()
      .setTitle("Liste des commandes :")
      .setColor(0xFFFFFF)
      .addField(".help", "Affiche les commandes disponibles")
      .addField(".createclan [nom] COLOR ", "Nom sans espace, couleur en anglais en majuscule ou en hexadecimal")
      .addField(".wfu, .au, .snx", "Demande au channel privé du clan si vous pouvez le rejoindre")
      .addField(".accept [@user], .refuse [@user]", "Accepte ou refuse dans votre clan la personne que vous mentionnez")
      .addField(".info", "Affiche les informations du serveur");
      message.channel.send({embed});

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
     const snx = message.guild.channels.find(ch => ch.name === 'chicha');

   if (message.content.startsWith(prefix + "WFU") || message.content.startsWith(prefix + "wfu")) {


     wfu.send(`${message.author} veut rejoindre la Waifu Army !`);
   }

   if (message.content.startsWith(prefix + "AU") || message.content.startsWith(prefix + "au")) {


     au.send(`${message.author} veut rejoindre l'Arcane de l'Umbra !`);
   }

   if (message.content.startsWith(prefix + "SNX") || message.content.startsWith(prefix + "snx")) {


     snx.send(`${message.author} veut rejoindre le snx gang !`);
   }

   if (message.content.startsWith(prefix + "accept") && message.member.roles.has("528573193510846465") && message.member.roles.has("528892097668055042")) {//Remplacer par le rôle de la WFU et Leader de clan
     member.addRole("528573193510846465"); //Remplacer par le rôle de la Waifu Army

     message.reply(`Bienvenue dans la Waifu Army ${user.tag}`);

   }
   if (message.content.startsWith(prefix + "fire") && message.member.roles.has("528573193510846465") && message.member.roles.has("528892097668055042")) {//Remplacer par le rôle de la WFU et Leader de clan
     member.removeRole("528573193510846465"); //Remplacer par le rôle de la Waifu Army

     message.reply(`${user.tag} à été viré du clan !`);

   }
   if (message.content.startsWith(prefix + "refuse") && message.member.roles.has("528573193510846465") && message.member.roles.has("528892097668055042")) {//Remplacer par le rôle de la WFU et Leader de clan
     member.send("Désolé mais tu n'as pas été accepté à la Waifu Army");
   }

   if (message.content.startsWith(prefix + "accept") && message.member.roles.has("528573281268137984") && message.member.roles.has("528892097668055042")) { //Remplacer par le rôle de la AU et Leader de clan
     member.addRole("528573281268137984"); //Remplacer par le rôle de AU
     message.reply(`Bienvenue dans l'Arcane de l'Umbra ${user.tag}`);
   }
   if (message.content.startsWith(prefix + "fire") && message.member.roles.has("528573281268137984") && message.member.roles.has("528892097668055042")) { //Remplacer par le rôle de la AU et Leader de clan
     member.removeRole("528573281268137984"); //Remplacer par le rôle de AU
     message.reply(`${user.tag} à été viré du clan`);
   }
   if (message.content.startsWith(prefix + "refuse") && message.member.roles.has("528573281268137984") && message.member.roles.has("528892097668055042")) { //Remplacer par le rôle de la WFU et Leader de clan
     member.send("Désolé mais tu n'as pas été accepté à l'Arcane de l'Umbra");
   }

   if (message.content.startsWith(prefix + "accept") && message.member.roles.has("528573233528700948") && message.member.roles.has("528892097668055042")) { //Remplacer par le rôle de snx et Leader de clan
     member.addRole("528573233528700948"); //Remplacer par le role de SNX
     message.reply(`Bienvenue dans le snx gang ${user.tag}`);
   }
   if (message.content.startsWith(prefix + "fire") && message.member.roles.has("528573233528700948") && message.member.roles.has("528892097668055042")) { //Remplacer par le rôle de snx et Leader de clan
     member.removeRole("528573233528700948"); //Remplacer par le role de SNX
     message.reply(`${user.tag} à été viré du clan`);
   }
   if (message.content.startsWith(prefix + "refuse") && message.member.roles.has("528573233528700948")&& message.member.roles.has("528892097668055042")) { //Remplacer par le rôle de snx et Leader de clan
     member.send("Désolé mais tu n'as pas été accepté au snx gang");
   }

});



client.login(bottoken);
