exports.run = (client, message, args) => {

	let botresponse = '';
	botresponse += '**!jarl [username] -s[seasonNumber]**\n';
	botresponse += 'Returns your current overall ranking on the Jarl\'s List. Optional season arguement returns season-specific rankings.\n';
	botresponse += '*example: !jarl Deadeye*\n';
	botresponse += '*example: !jarl Decker -s1*\n\n';
	botresponse += '**!smurfy [mech variant]**\n';
	botresponse += 'Returns hardpoint and quirk information for a specific mech variant. If searching for information on an (L) or (C) mech variant, omit parentheses.\n';
	botresponse += '*example: !smurfy fle-17*\n\n';
	botresponse += '**!lookup [mech name]**\n';
	botresponse += 'Returns a list of MWO mech variants for a specific mech chassis.\n';
	botresponse += '*example: !lookup urbanmech*\n\n';

	message.channel.send('DM Sent!');
	message.author.send(botresponse);

}