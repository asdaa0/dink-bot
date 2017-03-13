const Eris = require("eris");

var bot = new Eris("MjgzNjg5Nzg0Mjg5OTE4OTg2.C44uWg.xZ14wn_Bt88rdLKxeudB3rr7Ork");
var evalCommand = "!eval";
var evalCmd = "eval ";
var insultCommand = "!fotd";
var regExp = /\`([^)]+)\`/;
var lastDrop;

process.stdin.resume();
process.stdin.setEncoding('utf8');

bot.on("ready", () => { // When the bot is ready
    console.log("Bot Ready!"); // Log "Ready!"
});

process.stdin.on('data', function (text) {
	console.log('received data:', text);
	if (text.startsWith(evalCmd)) {
		try {
			eval(text.substring(evalCmd.length + 1)); 
		} catch (e) {
			console.log(e);
		}
	} else {
		bot.createMessage(272441932301467648, text);
	}
});

bot.on("messageCreate", (msg) => {
	if(msg.content === "!ping") {
        bot.createMessage(msg.channel.id, "Pong!");
    } else if(msg.content === "!pong") {
        bot.createMessage(msg.channel.id, "Ping!");
    } else if(regExp.test(msg.content) /*msg.author.username === "Math Battles"*/) {
		var matches = regExp.exec(msg.content);
		var result = eval(matches[1].replace("x","*"));
		lastDrop = Math.round(result * 100) / 100;
	} else if(msg.content === "!take") {
		if(lastDrop) {
			bot.createMessage(msg.channel.id, ".take " + lastDrop);
		} else {
			bot.createMessage(msg.channel.id, "Nothing to take!");
		}
	} else if(msg.content.startsWith(evalCommand)) {
		if(msg.content.length <= evalCommand.length + 1) {
            bot.createMessage(msg.channel.id, "pls specify args.");
            return;
        }
		var args = msg.content.substring(evalCommand.length + 1);
		result = eval(args);
        bot.createMessage(msg.channel.id, result);
    }
	
	//if(msg.content.startsWith(evalCommand)) {
});

bot.connect(); // Get the bot to connect to Discord
