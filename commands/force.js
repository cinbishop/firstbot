exports.run = (client, message, args) => {

	let cmd = args.toString().toLowerCase();
	let allowed = false; 

	if(message.member.roles.find("name","admin")) {
		allowed = true;
	} else {
		message.channel.send('YOU\'RE NOT MY SUPERVISOR');
	}

	if(args == 'reset' && allowed) {
		client.functions.setCurrentDate();
		message.channel.send(`Current Date set to: ${client.dates.get('currentDate')}`);
	}
}