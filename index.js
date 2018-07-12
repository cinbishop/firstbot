const Discord = require("discord.js");
const Enmap = require("enmap");
const Provider = require("enmap-sqlite");
const Schedule = require("node-schedule");

const fs = require("fs");

const client = new Discord.Client();
const config = require("./auth.json");

client.schedule = Schedule;
client.discord = Discord;
client.config = config;
client.firstdata = new Enmap({provider: new Provider({name: "firstdata"})});
client.dates = new Enmap({provider: new Provider({name: "dates"})});

const functions = require("./functions.js")(client);
const notes = require("./notes.js")();

client.notes = notes;

client.on("ready" , () => {
	console.log("Recording firsts.");
	client.functions.resetChron();
	client.functions.setCurrentDate();
	client.functions.setHint();
	client.dates.has('lastFirstDate') ? '' : client.dates.set('lastFirstDate','0');
;});

fs.readdir("./events/", (err, files) => {
	if (err) return console.log(err);
	files.forEach(file => {
		const event = require(`./events/${file}`);
		let eventName = file.split(".")[0];
		client.on(eventName, event.bind(null, client));
	});
});

client.commands = new Enmap();

fs.readdir("./commands/", (err,files) => {
	if (err) return console.log(err);
	files.forEach(file => {
		if(!file.endsWith(".js")) return;
		let props = require(`./commands/${file}`);
		let commandName = file.split(".")[0];
		console.log(`Attempting to load command ${commandName}`);
		client.commands.set(commandName, props);
	});
});

client.functions = functions;

client.login(config.token);