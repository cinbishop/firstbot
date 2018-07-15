exports.run = (client, message, args) => {

	let cmd = args.toString().toLowerCase();
	let allowed = message.member.roles.find("name","admin"); 

	if(!allowed) message.channel.send('YOU\'RE NOT MY SUPERVISOR');

	if(args == 'reset' && allowed) {
		client.functions.setCurrentDate();
		message.channel.send(`Current Date set to: ${client.dates.get('currentDate')}`);
	}

	if(args == 'dates' && allowed) {
		currentDate = client.dates.get('currentDate');
		lastFirstDate = client.dates.get('lastFirstDate');
		message.channel.send(`Current Date: ${currentDate}\nLast First: ${lastFirstDate}`);
	}

	if(args == 'lastmessage' && allowed) {
		const lastID = client.dates.get('lastFirstId');
		const userData = client.firstdata.get(lastID);
		if(userData.message) {
			message.channel.send(`**${userData.user}** said, AND I QUOTE: '${userData.message}'`);
		} else {
			message.channel.send('It has been lost to the sands of time.');
		}
	}
}