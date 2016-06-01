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
      
      main.subtitle('Today');
      main.body(
        'NB Visits : ' + data[0].visits + '\n' +
        'NB Actions: ' + data[0].actions + '\n' +
        'NB Visitors : ' + data[0].visitors + '\n' +
        'NB Converted: ' + data[0].visitsConverted + '\n'
      );
		},
		function (err) {
			console.log("AJAX Error: " + err); //It is strongly recommend to pass a second parameter in case there is an error
		});
}

module.exports.buildToday = buildToday;