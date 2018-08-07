module.exports = function (client) {
	var functions = {};

	functions.setCurrentDate = function() {
		const currentDate = new Date().getMonth() + 1 + '/' + new Date().getDate();
		console.log(currentDate);
		client.dates.set('currentDate', currentDate);
	};

	functions.setLastFirstDate = function() {
		const date = new Date().getMonth() + 1 + '/' + new Date().getDate();
		client.dates.set('lastFirstDate', date);
	};

	functions.isFirst = function(message) {
		const key = message.author.id;

		if(!client.firstdata.has(key)) {
			client.firstdata.set(key,{
				user: message.author.username,
				firsts: 0,
				message: message.content,
				coins: 0
			});
		}

		let totalFirsts = client.firstdata.getProp(key, 'firsts');
		let totalCoins = client.firstdata.getProp(key, 'coins');

		client.dates.set('lastFirstUser',message.author.username);
		client.dates.set('lastFirstId',message.author.id);
		client.firstdata.setProp(key, 'firsts', ++totalFirsts);
		client.firstdata.setProp(key, 'coins', totalCoins + 100);
		client.firstdata.setProp(key, 'message', message.content);
		client.functions.setLastFirstDate();
		client.functions.setHint();
	};

	functions.getFirsts = function(message) {
		const key = message.author.id;
		const user = message.member.displayName;

		let botresponse = '';

		if(!client.firstdata.has(key)) {
			botresponse = `${user.toUpperCase()}, DON'T YOU BOTHER ME YOU KNOW YOU AIN'T GOT NO FIRSTS`;
		} else {
			const firsts = client.firstdata.getProp(key,'firsts');
			const user = message.member.displayName;
			const totalCoins = client.firstdata.getProp(key, 'coins');

			botresponse = `${user} you have **${firsts}** first${firsts > 1 ? 's' : ''} and **${totalCoins}** schmeckle${totalCoins > 1 ? 's' : ''}`;
		}

		return botresponse
	};

	functions.weightedRoll = function(list) {
		var weightsArr = [];
		const reducer = (acc, cur) => acc + cur;

		for(let i = 0; i < list.length; i++) {
			weightsArr.push(list[i].weight);
		}

		const weightTotal = weightsArr.reduce(reducer);
		const randomNum = Math.random() * weightTotal;

		var weightSum = 0;


		for(let i = 0; i < list.length; i++) {
			weightSum += list[i].weight;
			weightSum = +weightSum.toFixed(2);

			if (randomNum <= weightSum) {
				return list[i];
			}
		}
		
	};	

	functions.randomNote = function(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	};

	functions.getLoot = function(loot) {
		const prize = client.emojis.find("name",loot.prize);
		const thumbURL = prize ? `https://cdn.discordapp.com/emojis/${prize.id}.png` : `https://placehold.it/50x50`;
		const botresponse = new client.discord.RichEmbed()
			.setTitle(`${loot.name}`)
			.setColor(0x000000)
			.addField(`${loot.description}`, 'Enjoy your loot!')
			.setThumbnail(`${thumbURL}`)
			.setFooter(`Enjoy your loot!`)
		return botresponse;
	};

	functions.getLeaderboard = function(message) {
		const leaderboard = client.firstdata.array().sort((a,b) => a.firsts < b.firsts);
		let count = 0;
		const botresponse = new client.discord.RichEmbed()
			  .setTitle("Leaderboard")
			  .setDescription("All the firsts!")
			  .setColor(0x00AE86)
			  .setFooter(client.functions.randomNote(client.notes.footerNotes));
			for(const data of leaderboard) {
				if(data.firsts > 0) {
					count++;
					let note = '';
					if(count == 1) {
						note = client.functions.randomNote(client.notes.happyNotes);
					} else {
						note = client.functions.randomNote(client.notes.regularNotes);
					}
				  	botresponse.addField(`${data.user} : ${data.firsts}`, note);
				}
			}
		return botresponse;
	};

	functions.getStore = function() {
		const storefront = client.store.items
		const botresponse = new client.discord.RichEmbed()
			.setTitle("First Store")
			.setDescription("Blow them firsts on somethin' sweet.")
			.setColor(0x0B5394)
			.setFooter('No refunds.')
		for(const data of storefront) {
			botresponse.addField(`${data.name}`,`${data.description}\nKeyword: ${data.keyword}\nSchmeckles: ${data.price}`);
		}
		return botresponse;
	};

	functions.getLastFirst = function(message) {
		const lastFirstUser = client.dates.get('lastFirstUser');
		const lastFirstDate = client.dates.get('lastFirstDate');
		const lastFirstId = client.dates.get('lastFirstId');
		console.log(lastFirstId);
		const totalFirsts = client.firstdata.getProp(lastFirstId);
		console.log(totalFirsts);
		let botresponse = `The last first was **${lastFirstUser}** on ${lastFirstDate}, they have **${totalFirsts.firsts}** total firsts. Praise them!`;
		return botresponse;
	};

	functions.resetChron = function() {
		let randomReset = 3;
		const chron = client.schedule.scheduleJob(`0 ${randomReset} * * *`, function(){
			client.functions.setCurrentDate();
			client.functions.setHint();
		});
		const reroll = client.schedule.scheduleJob('0 0 * * *', function(){
			randomReset = Math.floor(Math.random()*3)+1;
			chron.reschedule(`0 ${randomReset} * * *`);
		});
	};

	functions.setHint = function() {
		const currentDate = client.dates.get('currentDate');
		const lastFirstDate = client.dates.get('lastFirstDate');
		if(currentDate != lastFirstDate) {
			client.user.setActivity('You', { type: 'LISTENING' })
				.then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
				.catch(console.error);
		} else {
			client.user.setActivity('!help for a list of commands', { type: 'PLAYING' })
				.then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
				.catch(console.error);
		}
		
	};

	return functions;
}