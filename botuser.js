const Eris = require("eris");

var bot = new Eris("OTY1ODYyMDUxODA3NTE4NzI.CkrpHQ.bLOQ5IHQ_UTABEZiR2doL6XoRKQ");
var evalCommand = "!eval";
var slapCommand = "!slap";
var loveCommand = "!love";
var rateCommand = "!rate";
var sayCommand = "!say";

var fuckYou = "fuck you ";
var regExp = /\`([^)]+)\`/;
var lastDrop;

bot.on("ready", () => { // When the bot is ready
    console.log("asdaaBot Ready!"); // Log "Ready!"
});

bot.on("messageCreate", (msg) => {
	// CHECK FOR LOW HEALTH REGEX MESSAGE

	if(msg.content === "!ping") {
        bot.createMessage(msg.channel.id, "Pong!");
    } else if(msg.content === "!pong") {
        bot.createMessage(msg.channel.id, "Ping!");
    } else if(msg.content.startsWith("!auto ")) {
		m = msg.content.split(" ");
		if(m[1] === "skill") {
			for (var i = 0; i < m[2]; i++) {
				setTimeout(function () {
					bot.createMessage(msg.channel.id, "#!mine");
					bot.createMessage(msg.channel.id, "#!forage");
					bot.createMessage(msg.channel.id, "#!chop");
					bot.createMessage(msg.channel.id, "#!fish");
				}, 300000 * i)
			}
		} else if(m[1] === "adv") {
			for (var i = 0; i < m[2]; i++) {
				setTimeout(function () {
					bot.createMessage(msg.channel.id, "#!adv");
					if(i % 10 === 0) bot.createMessage(msg.channel.id, "#!heal auto"); // GET RID PROBS DOESNT WORK MAYBE TRY THIS IDK
				}, 15000 * i)
			}
		}
	} else if(msg.content === "!ch") {
		//bot.createMessage(msg.channel.id, msg.channel.id);
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
	} else if(msg.content.startsWith(sayCommand)) {
		if(msg.content.length <= sayCommand.length + 1) {
            bot.createMessage(msg.channel.id, "tES T meEEEE");
            return;
        }
		var say = msg.content.substring(sayCommand.length + 1);
        bot.createMessage(msg.channel.id, say);
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
    } else if(msg.content === "asdaa, smile") {
        bot.createMessage(msg.channel.id, "8===================D");
    } else if(msg.content === "same") {
		bot.createMessage(msg.channel.id, "Same.");
	} else if(msg.content === "fuck you asdaa") {
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
