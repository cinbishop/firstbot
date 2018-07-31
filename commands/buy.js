exports.run = (client, message, args) => {

	let cmd = args.toString().toLowerCase();

	const key = message.author.id;

	const hasFirsts = client.firstdata.has(key);

	const totalCoins = hasFirsts ? client.firstdata.getProp(key,'coins') : 0;

	if(args == 'store') {
		const botresponse = client.functions.getStore();
		message.channel.send(botresponse);
	}

	if(args == 'loot') {
		let storeItem = client.store.items.filter(obj => {return obj.keyword == args});
		storeItem = storeItem[0];
		if(totalCoins >= storeItem.price) {
			const newCoins = totalCoins - storeItem.price;

			client.firstdata.setProp(key,'coins',newCoins);

			const roll = client.functions.weightedRoll(client.store.loot);
			const botresponse = client.functions.getLoot(roll);

			message.channel.send(botresponse);
		} else {
			message.channel.send('Get out of here with ya non-schmeckle-havin ass!');
		}
	}

	if(args == 'reset') {
		message.channel.send(`This shit don't work yet, my boss just wanted to launch the lootboxes. Gotta make dat money!`);
	}

}