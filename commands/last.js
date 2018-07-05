exports.run = (client, message, args) => {

	const botresponse = client.functions.getLastFirst(message);
	message.channel.send(botresponse);
}