const 
	chalk = require('chalk'),
	fs = require('fs'),
	util = require('util'),
	CircularJSON = require('circular-json'),
	Discord = require('discord.js'),
	client = new Discord.Client(),
	token = 'MjgzNjg5Nzg0Mjg5OTE4OTg2.C44uWg.xZ14wn_Bt88rdLKxeudB3rr7Ork';

var asdaa = "96586205180751872", keelan = "152170950845136896";
//var ch = [,"321044318821285900" ,"321044875267145741" ,"290594458569932800" ,"290602107957149698"];
var ch = [,getChannel("asd") ,getChannel("asd", "bots") ,asdaa.dmChannel ,keelan.dmChannel];
var chName = [, 'general', 'bots', 'dm_asdaa', 'dm_keelan'];
var curCh = 3;
var chanObj;
var e = false;

var message;
var lastMessage;

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
	if(text.startsWith("ch")) {
		if(text.length <= 5) {
            console.log(chalk.magenta("Specify channel"));
            return;
        } else {
			curCh = parseInt(text.substring(3));
			chanObj = (curCh <= 2) ? ch[curCh] : client.channels.get(ch[curCh]);
			console.log(chalk.magenta("Switched channel to " + chName[curCh]))
		}
	} else if(text.startsWith("switch")) {
		if(text.length <= 9) {
            console.log(chalk.magenta("Specify channel"));
            return;
        } else {
			//switch using finding guild finding channel n shit
			//chanObj = client.guilds.find("name", "asd").channels.map(a => a.name).find("name", "privat");
		}
	} else if(text.startsWith("eval")) {
		e = !e;
		console.log(e);
	} else if(e === true){
		eval(text);
	} else {
		message = text;
		//console.log(curCh);
		//sendPOST(ch[curCh], text);
	}
});

client.on('ready', () => {
	console.log('I am ready!');
	asdaa = client.users.find("username", "asdaa");
	keelan = client.users.find("username", "Kelan");
	asdaa.createDM().then(function(chan) {
		chanObj = chan;
	});
	
	//console.log(client.guilds.find("name", "asd").channels.map(a => a.name);); // to get channel names 
	//chanObj = client.channels.get("290594458569932800");
	//console.log(chanObj);
	//chanObj.send("hi");
  
	function msg() {
		setTimeout(function () {
			if(message !== lastMessage) {
				//client.sendMessage(chanObj, message);
				chanObj.send(message);
				lastMessage = message;
			}
			msg();
		}, 100);
	}
	msg();
});

client.on('message', message => {
	time = "[" + convertTime(message.createdTimestamp) + "]";
	name = (message.channel.type === "dm") ? "<" + message.channel.recipient.username + "> " : "#" + message.channel.name + " ";

	if(message.channel.id === "290594458569932800") { // My dm id: 290594458569932800
		console.log(chalk.whiteBright(time) + chalk.magentaBright(name) + chalk.cyanBright(message.author.username + ": ") + chalk.greenBright(message.content));
		chanObj = message.channel;
	} else if(message.channel.id === "290602107957149698") { // Keelans dm id: 290602107957149698
		console.log(chalk.whiteBright(time) + chalk.magentaBright(name) + chalk.cyanBright(message.author.username + ": ") + chalk.greenBright(message.content));
		chanObj = message.channel;
	} else {
		console.log(chalk.gray(time) + chalk.magenta(name) + chalk.cyan(message.author.username + ": ") + chalk.green(message.content));
	}
	
	if (message.content === 'ping') {
		message.channel.send('pong');
		console.log(asdaa);
		//console.log(client.channels.has(290594458569932800));
	} else if(message.content === 'pong') {
		chanObj.fetchMessages({limit: 10})
			.then(function(messages) {
				for (var i = 0, len = messages.length; i < len; i++) {
					console.log(messages[i].author.username + ": " + messages[i].content);
				}
			})
			.catch(console.error);
	} else if(message.content.startsWith("!eval")) {
		if(message.content.length <= "!eval".length + 1) {
            message.channel.send("pls specify args.");
            return;
        }
		var args = message.content.substring("!eval".length + 1);
		try {
			result = eval(args);
		} catch(e) {
			console.log(result)
		}
        message.channel.send(result);
    } else if(message.content.startsWith("!slap")) {
		var user = message.content.substring("!slap".length + 1);
		message.channel.send("*Slaps " + user + " across the face with a huge trout.*");
	} else if(message.content.startsWith("!love")) {
		var user = message.content.substring("!love".length + 1);
		message.channel.send("love u " + user + " <3.");
	} else if(message.content.startsWith("!rate")) {
        var rated = message.content.substring("!rate".length + 1);
		var rating = Math.floor((Math.random() * 10) + 1);
		message.channel.send("I rate " + rated + " a solid " + rating + "/10");
    } else if(message.content === "dinkbot, smile") {
       message.channel.send("8===================D");
    } else if(message.content === "same") {
		message.channel.send("Same.");
	} else if(message.author.id !== "283689784289918986") {
		message.channel.send("XD");
	}
});

function getChannel(guildName, channelName = "general") {
	return client.guilds.find(guildName, channelName);
}

function getUser(id) {
	//return x = client.fetchUser(id)
	//	.then(user => {
	//		return user;
	//	})
	//	.catch(console.error);
		
	client.fetchUser(id).then(function(user){
		return user;
	});
}

function convertTime(timestamp){
    var date = new Date(parseInt(timestamp));
    var localeSpecificTime = date.toLocaleTimeString();
    return localeSpecificTime;
    //return localeSpecificTime.replace(/:\d+ /, ' ');
}

client.login(token);