exports.run = (client, message, args) => {

	let cmd = args.toString().toLowerCase();

	const key = message.author.id;

	const hasFirsts = client.firstdata.has(key);
	const totalFirsts = hasFirsts ? client.firstdata.getProp(key,'firsts') : 0;

	const hasSoldFirsts = client.dates.has('soldFirsts');
	if(!hasSoldFirsts) client.dates.set('soldFirsts',0);

	if(args == 'store') {
		const botresponse = client.functions.getStore();
		message.channel.send(botresponse);
	}

	if(args == 'loot') {
		if(totalFirsts > 0) {
			const newFirsts = totalFirsts - 1;
			const totalSoldFirsts = client.dates.get('soldFirsts');

			client.dates.set('soldFirsts', totalSoldFirsts + 1);

			client.firstdata.setProp(key,'firsts',newFirsts);

			const roll = client.functions.weightedRoll(client.store.loot);
			const botresponse = client.functions.getLoot(roll);

			message.channel.send(botresponse);
		} else {
			message.channel.send('Get out of here with ya non-first-havin ass!');
		}
	}

	if(args == 'reset') {
		message.channel.send(`This shit don't work yet, my boss just wanted to launch the lootboxes. Gotta make dat money!`);
	}

}