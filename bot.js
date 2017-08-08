const chalk = require('chalk');

botToken = "MjgzNjg5Nzg0Mjg5OTE4OTg2.C44uWg.xZ14wn_Bt88rdLKxeudB3rr7Ork"
const Eris = require("eris");
var bot = new Eris(botToken);

var evalCommand = "!eval";
var slapCommand = "!slap";
var loveCommand = "!love";
var rateCommand = "!rate";
var testCommand = "!test";

var fuckYou = "fuck you ";
var regExp = /\`([^)]+)\`/;
var ch = [,321044318821285900 ,321044875267145741 ,290594458569932800 ,290602107957149698];
var chName = [, 'general', 'bots', 'dm_asdaa', 'dm_keelan'];
var curCh = 3;
var lastDrop;
var interval;
var i = 1;

var message;
var lastMessage;

process.stdin.resume();
process.stdin.setEncoding('utf8');

bot.on("ready", () => { // When the bot is ready
    console.log("Bot Ready!");
	/*
	function msg() {
		setTimeout(function () {
			if(message !== lastMessage) {
				pr = bot.getDMChannel("152170950845136896");
				pr.then(function(ch) {
					br = bot.createMessage(ch.id, message);
					br.then(function(ms) {
						console.log(ms);
					});
				});
				//bot.createMessage(ch[curCh], message);
				lastMessage = message;
			}
			msg();
		}, 100);
	}
	msg();
	*/
});

process.stdin.on('data', function (text) {
	if(text.startsWith("null")) {message = null;}
	if(text.startsWith("ch")) {
		if(text.length <= 5) {
            console.log(chalk.magenta("Specify channel"));
            return;
        } else {
			curCh = parseInt(text.substring(3));
			console.log(chalk.magenta("Switched channel to " + chName[curCh]))
		}
	} else {
		//message = text;
		//console.log(curCh);
		//sendPOST(ch[curCh], text);
		bot.createMessage(ch[curCh], text);
	}
});

bot.on("messageCreate", (msg) => {
	if(msg.channel.id === "290594458569932800") { // My dm id: 290594458569932800
		console.log(chalk.cyan(msg.author.username + ": ") + chalk.green(msg.content));
	} else if(msg.channel.id === "290602107957149698") { // Keelans dm id: 290602107957149698
		console.log(chalk.cyan(msg.author.username + ": ") + chalk.green(msg.content));
	}

	if(msg.content === "!ping") {
        bot.createMessage(msg.channel.id, "Pong!");
    } else if(msg.content === "!pong") {
        bot.createMessage(msg.channel.id, "Ping!");
	} else if(msg.content === "!ch") {
		pr = bot.getDMChannel("152170950845136896");
		pr.then(function(ch) {
			bot.createMessage(msg.channel.id, ch.id);
		});
		//var x = bot.searchChannelMessages(msg.channel.id, {
		//	content: "equation"
		//})
	} else if((regExp.test(msg.content)) && (msg.author.username === "Math Battles")) {
		try {
			var matches = regExp.exec(msg.content);
			var result = eval(matches[1].replace("x","*"));
			lastDrop = Math.round(result * 100) / 100;
		} catch(e) {
			console.log(matches);
			console.log(result);
			console.log(lastDrop);
			console.log(e);
		}
	} else if(msg.content.startsWith(testCommand)) {
		if(msg.content.length <= testCommand.length + 1) {
            bot.createMessage(msg.channel.id, "tES T meEEEE");
            return;
        }
		var test = msg.content.substring(testCommand.length + 1);
        bot.createMessage(msg.channel.id, test);
	} else if(msg.content === "!calc") {
		if(lastDrop) {
			bot.createMessage(msg.channel.id, lastDrop);
		} else {
			bot.createMessage(msg.channel.id, "Nothing to calculate!");
		}
	} else if(msg.content.startsWith(evalCommand)) {
		if(msg.content.length <= evalCommand.length + 1) {
            bot.createMessage(msg.channel.id, "pls specify args.");
            return;
        }
		var args = msg.content.substring(evalCommand.length + 1);
		try {
			result = eval(args);
		} catch(e) {
			console.log(result)
		}
        bot.createMessage(msg.channel.id, result);
    } else if(msg.content.startsWith(slapCommand)) {
		var user = msg.content.substring(slapCommand.length + 1);
		bot.createMessage(msg.channel.id, "*Slaps " + user + " across the face with a huge trout.*");
	} else if(msg.content.startsWith(loveCommand)) {
		var user = msg.content.substring(loveCommand.length + 1);
		bot.createMessage(msg.channel.id, "love u " + user + " <3.");
	} else if(msg.content.startsWith(rateCommand)) {
        var rated = msg.content.substring(rateCommand.length + 1);
		var rating = Math.floor((Math.random() * 10) + 1);
		bot.createMessage(msg.channel.id, "I rate " + rated + " a solid " + rating + "/10");
    } else if(msg.content === "dinkbot, smile") {
        bot.createMessage(msg.channel.id, "8===================D");
    } else if(msg.content === "same") {
		bot.createMessage(msg.channel.id, "Same.");
	} else if(msg.content === "fuck you dinkbot") {
        bot.createMessage(msg.channel.id, ":(");
    } else if(msg.content.startsWith(fuckYou)) {
        var obj = msg.content.substring(fuckYou.length);
		bot.createMessage(msg.channel.id, "Yeah, fuck you " + obj + ".");
    } else if(msg.author.id !== "283689784289918986") {
		bot.createMessage(msg.channel.id, "XD");
	}
});

var request = require('request');
function sendPOST(chID, message) {
	url = "https://discordapp.com/api/channels/" + chID + "/messages"
	headers = { "Authorization":"Bot " + botToken,
            "User-Agent":"myBotThing (http://some.url, v0.1)",
            "Content-Type":"application/json", }

	POSTedJSON =  JSON.stringify ( {"content":message} )
	
	request.post({
		headers: headers,
		url:     url,
		body:    POSTedJSON
	}, function(error, response, body){
		console.log(chalk.gray(body));
	});
}

bot.connect(); // Get the bot to connect to Discord
