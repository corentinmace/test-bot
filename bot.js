config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
prefix = config.prefix;
servtoken = config.servtoken;
bottoken = config.bottoken;
muted = "530073687882334218"
var spammeur = [];
var cooldown = 900;
var tpsPrison = 5000;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
 client.user.setPresence({ game: { name: `Il y a actuellement ${client.guilds.get(servtoken).memberCount} étudiants !`, type: 0 } });

});

client.on('message', message => {
  if (message.content === '<@528892444444459009>') {
    const embed = new Discord.RichEmbed()
    .setTitle("Liste des commandes :")
    .setColor(0xFFFFFF)
    .addField(".help", "Affiche les commandes disponibles")
    .addField(".createclan [nom] COLOR ", "Nom sans espace, couleur en anglais ou en hexadecimal")
    .addField(".wfu, .au, .snx", "Demande au channel privé du clan si vous pouvez le rejoindre")
    .addField(".accept [@user], .refuse [@user]", "Accepte ou refuse dans votre clan la personne que vous mentionnez")
    .addField(".fire [@user]","Vire du clan la personne qui à été mentionnée")
    .addField(".info", "Affiche les informations du serveur");
    message.author.send({embed});
    message.reply("La liste des commandes vous à été envoyée en mp")
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
      .addField(".createclan [nom] COLOR ", "Nom sans espace, couleur en anglais ou en hexadecimal")
      .addField(".wfu, .au, .snx", "Demande au channel privé du clan si vous pouvez le rejoindre")
      .addField(".accept [@user], .refuse [@user]", "Accepte ou refuse dans votre clan la personne que vous mentionnez")
      .addField(".fire [@user]","Vire du clan la personne qui à été mentionnée")
      .addField(".info", "Affiche les informations du serveur");
      message.channel.send({embed});

  }

   if (message.content.startsWith(prefix + "createclan")) {
     const args = message.content.slice(prefix.length).split(' ');
     const command = args.shift().toLowerCase();
     message.channel.send(`Commande : ${command}\nArguments: ${args}`);

     message.guild.createRole({
  name: args[0],
  color: args[1].toUpperCase(),
})
  .then(role => console.log(`Created new role with name ${role.name} and color ${role.color}`))
  .catch(console.error)

   }

     if (message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "delete")){
       const args = message.content.slice(prefix.length).split(' ');
       const command = args.shift().toLowerCase();
       message.channel.send(`Commande : ${command}\nArguments: ${args}`);
  const deleted = message.guild.roles.find(role => role.name === args[0])
    role.delete('The role needed to go')
   .then(deleted => console.log(`Deleted role ${deleted.name}`))
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

     message.channel.send(`Bienvenue dans la Waifu Army ${user.tag}`);

   }
   if (message.content.startsWith(prefix + "fire") && message.member.roles.has("528573193510846465") && message.member.roles.has("528892097668055042")) {//Remplacer par le rôle de la WFU et Leader de clan
     member.removeRole("528573193510846465"); //Remplacer par le rôle de la Waifu Army
     message.channel.send(`${user.tag} à été viré du clan !`);
     member.send("Le Leader du clan à décidé de te virer. Désolé.");

   }
   if (message.content.startsWith(prefix + "refuse") && message.member.roles.has("528573193510846465") && message.member.roles.has("528892097668055042")) {//Remplacer par le rôle de la WFU et Leader de clan
     member.send("Désolé mais tu n'as pas été accepté à la Waifu Army");
   }

   if (message.content.startsWith(prefix + "accept") && message.member.roles.has("528573281268137984") && message.member.roles.has("528892097668055042")) { //Remplacer par le rôle de la AU et Leader de clan
     member.addRole("528573281268137984"); //Remplacer par le rôle de AU
     message.channel.send(`Bienvenue dans l'Arcane de l'Umbra ${user.tag}`);
   }
   if (message.content.startsWith(prefix + "fire") && message.member.roles.has("528573281268137984") && message.member.roles.has("528892097668055042")) { //Remplacer par le rôle de la AU et Leader de clan
     member.removeRole("528573281268137984"); //Remplacer par le rôle de AU
     message.channel.send(`${user.tag} à été viré du clan`);
     member.send("Le Leader du clan à décidé de te virer. Désolé.");
   }
   if (message.content.startsWith(prefix + "refuse") && message.member.roles.has("528573281268137984") && message.member.roles.has("528892097668055042")) { //Remplacer par le rôle de la WFU et Leader de clan
     member.send("Désolé mais tu n'as pas été accepté à l'Arcane de l'Umbra");
   }

   if (message.content.startsWith(prefix + "accept") && message.member.roles.has("528573233528700948") && message.member.roles.has("528892097668055042")) { //Remplacer par le rôle de snx et Leader de clan
     member.addRole("528573233528700948"); //Remplacer par le role de SNX
     message.channel.send(`Bienvenue dans le snx gang ${user.tag}`);
   }
   if (message.content.startsWith(prefix + "fire") && message.member.roles.has("528573233528700948") && message.member.roles.has("528892097668055042")) { //Remplacer par le rôle de snx et Leader de clan
     member.removeRole("528573233528700948"); //Remplacer par le role de SNX
     message.channel.send(`${user.tag} à été viré du clan`);
     member.send("Le Leader du clan à décidé de te virer. Désolé.");
   }
   if (message.content.startsWith(prefix + "refuse") && message.member.roles.has("528573233528700948")&& message.member.roles.has("528892097668055042")) { //Remplacer par le rôle de snx et Leader de clan
     member.send("Désolé mais tu n'as pas été accepté au snx gang");
   }


  //Commandes admins

  const logs = message.guild.channels.find(ch => ch.name === 'bot-logs');

    // Clear

    if (message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "clear")){
         if (message.member.hasPermission("MANAGE_MESSAGES")) {
             message.channel.fetchMessages()
                .then(function(list){
                     message.channel.bulkDelete(list);
                 }, function(err){message.channel.send("ERROR: ERROR CLEARING CHANNEL.")});
         }
     }




  //kick

	if(message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "kick")){

    	member.kick('Raison').then(() => {
				message.reply(`${user.tag} à  été exclu !`);
			}).catch(err => {

          message.reply('Je n\'ai pas pu exclure ce membre ! ');

          console.error(err);
        });
		}

    //ban

	if(message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "ban")){

    	member.ban('Raison').then(() => {
				message.reply(`${user.tag} à  été banni !`);
			}).catch(err => {

          message.reply('Je n\'ai pas pu bannir ce membre ! ');

          console.error(err);
        });
		}

    //mute
	if (message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "mute")){
			member.addRole(muted);
			message.channel.send(`Taisez-vous ${member} !`);
      const embed = new Discord.RichEmbed()
                          .setTitle("Message de moderation :")
                          .setColor(0xf44242)
        .addField("Un utilisateur à  été mute", `Par ${message.author.username}`)
                          .addField("Username :", member)
        .addField("Raison :", message.member.lastMessage)
                      message.guild.channels.get("530074892373196800").send({embed});
		};

    //unmute
	if (message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "unmute")){
			member.removeRole(muted);
			message.channel.send(`Vous pouvez de nouveau parler ${member}`);
      const embed = new Discord.RichEmbed()
                          .setTitle("Message de moderation :")
                          .setColor(0x64db2e)
        .addField("Un utilisateur à  été unmute", `Par ${message.author.username}`)
                          .addField("Username :", member)
        
                      message.guild.channels.get("530074892373196800").send({embed});
		};
//64db2e

    //anti-spam
  var now = Math.floor(Date.now());
    if ((message.author.id != client.user.id) && message.channel.guild) {
        console.log("c'est bien un user");
        console.log(spammeur.find(auth => auth.author === message.author.id));
        if (spammeur.find(auth => auth.author === message.author.id) === undefined) {
            console.log("n'inclus pas ce mec");
            spammeur.push({
                "time": now,
                "author": message.author.id
            });
            setTimeout(function() {spammeur.splice(spammeur.findIndex(auth => auth.author === message.author.id),1);}, cooldown+1);
            console.log(spammeur);
            return;
        }
    }

    if (spammeur.find(auth => auth.author === message.author.id) != undefined) {
        console.log("trouvé!");
        var index = spammeur.findIndex(auth => auth.author === message.author.id);
        console.log(index);
        if (spammeur[index].time >= now - cooldown) {
            console.log("spam!");
            message.member.addRoles(muted);
            setTimeout(function() {message.member.removeRoles(muted);}, tpsPrison);
            spammeur.splice(index, 1);
            console.log(spammeur);
		const embed = new Discord.RichEmbed()
                        .setTitle("Message de moderation :")
                        .setColor(0xf44242)
			.addField("Un utilisateur à  été mute", `Par : Anti-spam`)
                        .addField("Username :", message.author.username)
			.addField("Dernier message :", message.author.lastMessage)
                    message.guild.channels.get("530074892373196800").send({embed});

        }
    }
});



client.login(bottoken);
