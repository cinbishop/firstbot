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
				firsts: 0
			});
		}

		let totalFirsts = client.firstdata.getProp(key, 'firsts');
		client.dates.set('lastFirstUser',message.author.username);
		client.dates.set('lastFirstId',message.author.id);
		client.firstdata.setProp(key, 'firsts', ++totalFirsts);
		client.functions.setLastFirstDate();
		client.functions.setHint(client.user);
	}

	functions.randomNote = function(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	functions.getLeaderboard = function(message) {
		const leaderboard = client.firstdata.array().sort((a,b) => a.firsts < b.firsts);
		let count = 0;
		const botresponse = new client.discord.RichEmbed()
			  .setTitle("Leaderboard")
			  .setDescription("All the firsts!")
			  .setColor(0x00AE86)
			  .setFooter(client.functions.randomNote(client.notes.footerNotes));
			for(const data of leaderboard) {
				count++;
				let note = '';
				if(count == 1) {
					note = client.functions.randomNote(client.notes.happyNotes);
				} else {
					note = client.functions.randomNote(client.notes.regularNotes);
				}
			  	botresponse.addField(`${data.user} : ${data.firsts}`, note);
			}
		return botresponse;
	}

	functions.getLastFirst = function(message) {
		const lastFirstUser = client.dates.get('lastFirstUser');
		const lastFirstDate = client.dates.get('lastFirstDate');
		const lastFirstId = client.dates.get('lastFirstId');
		console.log(lastFirstId);
		const totalFirsts = client.firstdata.getProp(lastFirstId);
		console.log(totalFirsts);
		let botresponse = `The last first was **${lastFirstUser}** on ${lastFirstDate}, they have **${totalFirsts.firsts}** total firsts. Praise them!`;
		return botresponse;
	}

	functions.resetChron = function() {
		let randomReset = 3;
		const chron = client.schedule.scheduleJob(`0 ${randomReset} * * *`, function(){
			client.functions.setCurrentDate();
			client.functions.setHint(client.user);
		});
		const reroll = client.schedule.scheduleJob('0 0 * * *', function(){
			randomReset = Math.floor(Math.random()*3)+1;
			chron.reschedule(`0 ${randomReset} * * *`);
		});
	}

	functions.setHint = function(user) {
		const currentDate = client.dates.get('currentDate');
		const lastFirstDate = client.dates.get('lastFirstDate');
		if(currentDate != lastFirstDate) {
			user.setActivity('You', { type: 'LISTENING' })
				.then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
				.catch(console.error);
		} else {
			client.user.setActivity('!help for a list of commands', { type: 'PLAYING' })
				.then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
				.catch(console.error);
		}
		
	}

	return functions;
}