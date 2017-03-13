const Eris = require("eris");

var bot = new Eris("MjgzNjg5Nzg0Mjg5OTE4OTg2.C44uWg.xZ14wn_Bt88rdLKxeudB3rr7Ork");
var evalCommand = "!eval";
var slapCommand = "!slap";
var loveCommand = "!love";
var rateCommand = "!rate";
var testCommand = "!test";

var fuckYou = "fuck you ";
var regExp = /\`([^)]+)\`/;
var lastDrop;
var interval
var i = 1;

process.stdin.resume();
process.stdin.setEncoding('utf8');

bot.on("ready", () => { // When the bot is ready
    console.log("Bot Ready!"); // Log "Ready!"
});

process.stdin.on('data', function (text) {
	bot.createMessage(290594458569932800, text);
});

bot.on("messageCreate", (msg) => {
	if(msg.channel.id === "290594458569932800") { // My dm id: 290594458569932800
		console.log(msg.author.username + ": " + msg.content);
	} else if(msg.channel.id === "290602107957149698") { // Keelans dm id: 290602107957149698
		console.log(msg.author.username + ": " + msg.content);
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
    } else if(msg.content === "dinkbot, commence smile") {
        bot.createMessage(msg.channel.id, "8===================D");
    } else if(msg.content === "same") {
		bot.createMessage(msg.channel.id, "Same.");
	} else if(msg.content === "fuck you dinkbot") {
        bot.createMessage(msg.channel.id, ":(");
    } else if(msg.content.startsWith(fuckYou)) {
        var obj = msg.content.substring(fuckYou.length);
		bot.createMessage(msg.channel.id, "Yeah, fuck you " + obj + ".");
    }
});

function match(message) {
	
}

function matchStart(message) {
	
}

bot.connect(); // Get the bot to connect to Discord
