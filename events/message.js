module.exports = (client, message) => {
	if (message.author.bot) return;


	if((client.firstdata.get('currentDate') != client.firstdata.get('lastFirstDate')) && message.content.toLowerCase().includes('first')) {
		client.functions.isFirst(message);
		message.channel.send('Yous Is First!');
	} 

	if (message.content.indexOf(client.config.prefix) !==0) return;

	const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd = client.commands.get(command);
	if(!cmd) return;

	cmd.run(client, message, args);
}