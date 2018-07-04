module.exports = function (client) {
	var functions = {};

	functions.setCurrentDate = function() {
		const currentDate = new Date().getMonth() + '/' + new Date().getDate();
		client.dates.set('currentDate', currentDate);
	};

	functions.setLastFirstDate = function() {
		const date = new Date().getMonth() + '/' + new Date().getDate();
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
		client.firstdata.setProp(key, 'firsts', ++totalFirsts);
		client.functions.setLastFirstDate();
	}

	functions.getLeaderboard = function(message) {
		const leaderboard = client.firstdata.fetchAll();
		console.log(leaderboard);
	}

	functions.resetChron = function() {
		const chron = client.schedule.scheduleJob('0 0 * * *', function(){
			client.functions.setCurrentDate();
		});
	}

	return functions;
}