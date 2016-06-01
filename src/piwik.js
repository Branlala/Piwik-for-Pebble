var ajax = require('ajax');

function buildToday(url, main) {
  ajax({
	url: url,
	type: 'json', //we'll say this is a json web service so it will automatically parse the output
},
		function(data) {
      /*data.forEach(function(item) {
  			var keyword = item.label;
        var visits = item.nb_uniq_visitors;
        body += keyword + ': ' + visits + '\n';
      });
      main.body(body);*/
      
      main.body(
        'NB Un.Vi  : ' + data.nb_uniq_visitors + '\n' +
        'NB Visits : ' + data.nb_visits + '\n' +
        'NB Actions: ' + data.nb_actions + '\n' +
        'Avg Time : ' + data.avg_time_on_site + ' (s)\n'
      );
		},
		function (err) {
			console.log("AJAX Error: " + err); //It is strongly recommend to pass a second parameter in case there is an error
		});
}

module.exports.buildToday = buildToday;