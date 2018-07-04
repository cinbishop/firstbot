exports.run = (client, message, args) => {

	let botresponse = '';
	botresponse += '**!leaders\n';
	botresponse += 'Returns the all important list of first leaders.\n';

	message.channel.send('DM Sent!');
	message.author.send(botresponse);

}