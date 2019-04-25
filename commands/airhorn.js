exports.run = (client, message, args) => {

	const key = message.author.id;
	const user = message.member.displayName;

	const hasFirsts = client.firstdata.has(key);

	const totalCoins = hasFirsts ? client.firstdata.getProp(key,'coins') : 0;

	client.firstdata.setProp(key, 'coins', totalCoins-100);

	const botresponse = `The pact is sealed, ${user}. You have **${totalCoins - 100}** schmeckle${totalCoins-100 > 1 ? 's' : ''} remaining. https://www.youtube.com/watch?v=QVw5mnRI8Zw`;

	message.channel.send(botresponse);

}