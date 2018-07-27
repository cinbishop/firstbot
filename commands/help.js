exports.run = (client, message, args) => {

	let botresponse = '';
	botresponse += '**!leaders**\n';
	botresponse += 'Returns the all important list of first leaders.\n';
	botresponse += '**!last**\n';
	botresponse += 'Returns the last recorded first.\n';
	botresponse += '**!me**\n';
	botresponse += 'Returns all of your recorded firsts.\n';
	botresponse += '**!buy <store|product keyword>**\n';
	botresponse += 'Spend your firsts at the first store!\n';

	message.channel.send('DM Sent!');
	message.author.send(botresponse);

}