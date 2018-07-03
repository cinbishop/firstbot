module.exports = function (client) {
	var functions = {};

	functions.setCurrentDate = function() {
		let currentDate = new Date().getMonth() + '/' + new Date().getDate();
		client.firstdata.set('currentDate', currentDate);
	};

	functions.setLastFirstDate = function() {
		let date = new Date().getMonth() + '/' + new Date().getDate();
		client.firstdata.set('lastFirstDate', date);
	};

	functions.isFirst = function(message) {
		const key = message.author.id;

		if(!client.firstdata.has(key)) {
			client.firstdata.set(key,{
				user: message.author.username,
				firsts: 0
			});
		}

		let currentFirsts = client.firstdata.getProp(key, 'firsts');
		client.firstdata.setProp(key, 'firsts', ++currentFirsts);
		client.functions.setLastFirstDate();
	}

	functions.resetChron = function() {
		let chron = client.schedule.scheduleJob('0 0 * * *', function(){
			client.functions.setCurrentDate();
		});
	}

	return functions;
}