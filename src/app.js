/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');


/** Configuration **/

Pebble.addEventListener('ready', function() {
  console.log('PebbleKit JS ready!');
});

Pebble.addEventListener('showConfiguration', function() {
  var url = 'https://techan.fr/wp-content/piwik-for-pebble/config/index.html';
  console.log('Showing configuration page: ' + url);

  Pebble.openURL(url);
});

Pebble.addEventListener('webviewclosed', function(e) {
  var configData = JSON.parse(decodeURIComponent(e.response));
  console.log('Configuration page returned: ' + JSON.stringify(configData));

  //var myPiwikFQDN = configData['PIWIK_URL'];

  /*var dict = {};
  dict.piwik_url = configData.piwik_url;
  dict.piwik_auth_token = configData.piwik_auth_token;
  dict.piwik_site_id = configData.piwik_site_id;*/
  
  var dict = {
  'PIWIK_URL': configData.piwik_url,
  'PIWIK_AUTH_TOKEN': configData.piwik_auth,
  'PIWIK_SITE_ID': configData.piwik_site_id
};
  
  //dict['KEY_HIGH_CONTRAST'] = configData['KEY_HIGH_CONTRAST'];

  // Send to watchapp
  Pebble.sendAppMessage(dict, function() {
    console.log('Send successful: ' + JSON.stringify(dict));
  }, function() {
    console.log('Send failed!');
  });
});

// Get AppMessage events
Pebble.addEventListener('appmessage', function(e) {
  // Get the dictionary from the message
  var dict = e.payload;

  console.log('Got message: ' + JSON.stringify(dict));
  
  if(dict['PIWIK_URL']) {
  // The AppKeyRequestData key is present, read the value
  var piwik_url = dict['PIWIK_URL'];
}

if(dict['PIWIK_AUTH_TOKEN']) {
  // The AppKeyRequestData key is present, read the value
  var myPiwikAuthToken = dict['PIWIK_AUTH_TOKEN'];
}

if(dict['PIWIK_SITE_ID']) {
  // The AppKeyRequestData key is present, read the value
  var siteID = dict['PIWIK_SITE_ID'];
}
});


/** Code **/


//var myPiwikAuthToken = '067752aeaee170f4c9851f5b50981d25';
//var siteID = '2';
var url = 'https://'+piwik_url+
      '/?module=API&method=Referrers.getKeywords&idSite=' + siteID + '&date=yesterday&period=day&format=xml&filter_limit=10&format=JSON&token_auth='+
      myPiwikAuthToken;
var url = 'https://'+piwik_url+
      '/?module=API&method=VisitsSummary.get&idSite=' + siteID + '&date=today&period=day&format=xml&filter_limit=10&format=JSON&token_auth='+
      myPiwikAuthToken;


var main = new UI.Card({
  title: ' for Pebble',
  icon: 'images/icone',
  body: 'Loading ...',
  subtitle: 'Today',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});

main.show();


ajax({
	url: url,
	type: 'json', //we'll say this is a json web service so it will automatically parse the output
},
		function(data) {
      var body = '' ;
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

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }, {
        title: 'Third Item',
      }, {
        title: 'Fourth Item',
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window({
    backgroundColor: 'black'
  });
  var radial = new UI.Radial({
    size: new Vector2(140, 140),
    angle: 0,
    angle2: 300,
    radius: 20,
    backgroundColor: 'cyan',
    borderColor: 'celeste',
    borderWidth: 1,
  });
  
  var textfield = new UI.Text({
    size: new Vector2(140, 60),
    font: 'gothic-24-bold',
    text: 'Dynamic\nWindow',
    textAlign: 'center'
  });
  var windSize = wind.size();
  // Center the radial in the window
  var radialPos = radial.position()
      .addSelf(windSize)
      .subSelf(radial.size())
      .multiplyScalar(0.5);
  radial.position(radialPos);
  // Center the textfield in the window
  var textfieldPos = textfield.position()
      .addSelf(windSize)
      .subSelf(textfield.size())
      .multiplyScalar(0.5);
  textfield.position(textfieldPos);
  wind.add(radial);
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
