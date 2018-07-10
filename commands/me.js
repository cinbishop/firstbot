exports.run = (client, message, args) => {

	const botresponse = client.functions.getFirsts(message);
	message.channel.send(botresponse);
}