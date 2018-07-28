const Discord = require("discord.js");
const Enmap = require("enmap");
const Provider = require("enmap-sqlite");
const Schedule = require("node-schedule");
const path = require('path');

const fs = require("fs");

const client = new Discord.Client();
const config = require("./auth.json");
const store = require("./store.json");

client.schedule = Schedule;
client.discord = Discord;
client.config = config;
client.store = store;
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

fs.readdir(path.join(__dirname,"events"), (err, files) => {
	if (err) return console.log(err);
	files.forEach(file => {
		const event = require(`./events/${file}`);
		let eventName = file.split(".")[0];
		client.on(eventName, event.bind(null, client));
	});
});

client.commands = new Enmap();

fs.readdir(path.join(__dirname,"commands"), (err,files) => {
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