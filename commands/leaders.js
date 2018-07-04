exports.run = (client, message, args) => {

	const botresponse = client.functions.getLeaderboard(message);
	message.channel.send(botresponse);
}