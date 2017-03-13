const Eris = require("eris");

var bot = new Eris.CommandClient("MjgzNjg5Nzg0Mjg5OTE4OTg2.C44uWg.xZ14wn_Bt88rdLKxeudB3rr7Ork", {}, {
    description: "A test bot made with Eris",
    owner: "asdaa",
    prefix: "!"
});
bot.on("ready", () => { // When the bot is ready
    console.log("Bot Ready!"); // Log "Ready!"
});

bot.registerCommand("help", "!help: Lists commands.\n!ping: Pong!\n!echo [reverse] <text>: Makes the bot say something.", {
	description: "Help!",
	fullDescription: "Helps u."
});

bot.registerCommandAlias("halp", "help"); // Alias !halp to !help

	if(args.length === 0) {
		return "Invalid input";
	}
	var result = 0;
	result = evalCode(args.join(" "));
	result = Math.round(result * 100) / 100;
	return result; // Return the generated string
}, {
    description: "Make the bot take something",
    fullDescription: "The bot will take whatever things put in the math.",
    usage: "<math>"
});

bot.registerCommand("ping", "Pong!", { // Make a ping command
// Responds with "Pong!" when someone says "!ping"
    description: "Pong!",
    fullDescription: "This command could be used to check if the bot is up. Or entertainment when you're bored."
});

bot.registerCommand("pong", ["Pang!", "Peng!", "Ping!", "Pung!"], { // Make a pong command
// Responds with a random version of "Ping!" when someone says "!pong"
    description: "Ping!",
    fullDescription: "This command could also be used to check if the bot is up. Or entertainment when you're bored."
});

var echoCommand = bot.registerCommand("echo", (msg, args) => { // Make an echo command
    if(args.length === 0) { // If the user just typed "!echo", say "Invalid input"
        return "Invalid input";
    }
    var text = args.join(" "); // Make a string of the text after the command label
    return text; // Return the generated string
}, {
    description: "Make the bot say something",
    fullDescription: "The bot will echo whatever is after the command label.",
    usage: "<text>"
});

echoCommand.registerSubcommand("reverse", (msg, args) => { // Make a reverse subcommand under echo
    if(args.length === 0) { // If the user just typed "!echo reverse", say "Invalid input"
        return "Invalid input";
    }
    var text = args.join(" "); // Make a string of the text after the command label
    text = text.split("").reverse().join(""); // Reverse the string
    return text; // Return the generated string
}, {
    description: "Make the bot say something in reverse",
    fullDescription: "The bot will echo, in reverse, whatever is after the command label.",
    usage: "<text>"
});

echoCommand.registerSubcommandAlias("backwards", "reverse"); // Alias "!echo backwards" to "!echo reverse"

bot.connect();