var ajax = require('ajax');

function buildLast24H(url, main) {
  ajax({
	url: url,
	type: 'json', //we'll say this is a json web service so it will automatically parse the output
},
		function(data) {      
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


function buildTopPagesMonth(url, main) {
  ajax({
	url: url,
	type: 'json', //we'll say this is a json web service so it will automatically parse the output
},
		function(data) {
      var body = '';
      data.forEach(function(item) {
        body += item.label + ': ' + item.nb_visits;
      });
      main.body(body);
		},
		function (err) {
			console.log("AJAX Error: " + err); //It is strongly recommend to pass a second parameter in case there is an error
		});
}

module.exports.buildLast24H = buildLast24H;
module.exports.buildTopPagesMonth = buildTopPagesMonth;