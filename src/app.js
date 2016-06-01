/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Settings = require('settings');
var piwik = require('./piwik');
var Feature = require('platform/feature');

console.log(Feature.resolution);

var version = '1.0';

/** Configuration **/

Pebble.addEventListener('ready', function() {
  console.log('PebbleKit JS ready!');
});

var options = Settings.option();
console.log(JSON.stringify(options));

var url = options.piwik_url+
      '/?module=API&method=VisitsSummary.get&idSite=' + options.piwik_site_id + '&date=today&period=day&format=xml&filter_limit=10&format=JSON&token_auth='+
      options.piwik_auth;
console.log(url);


var main = new UI.Card({
  title: ' for Pebble',
  icon: 'images/icone',
  body: 'Loading ...',
  subtitle: 'Today',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});

main.show();


// Set a configurable with just the close callback
Settings.config(
  { url: 'https://techan.fr/wp-content/piwik-for-pebble/config/index.html?=appversion'+version },
  function(e) {
    console.log('closed configurable');

    // Show the parsed response
    console.log(JSON.stringify(e.options));
    var main = new UI.Card({
      title: ' for Pebble',
      icon: 'images/icone',
      body: 'You can now reload the app.',
      subtitle: 'Settings Applied',
      subtitleColor: 'indigo', // Named colors
      bodyColor: '#9a0036' // Hex colors
    });
    
    main.show();

    // Show the raw response if parsing failed
    if (e.failed) {
      console.log(e.response);
    }
  }
);


/** Code **/

if (options.p4p_version == version) {  
  
  var main = new UI.Card({
    title: ' for Pebble',
    icon: 'images/icone',
    body: 'Loading ...',
    subtitle: 'Today',
    subtitleColor: 'indigo', // Named colors
    bodyColor: '#9a0036' // Hex colors
  });

  main.show();
  
  piwik.buildToday(url,main);
  
  main.show();
  
} else {
    var main = new UI.Card({
    title: ' for Pebble',
    icon: 'images/icone',
    body: 'Please, go to app\'s settings and fill your Piwik server informations.',
    //subtitle: 'Missing parameters',
    subtitleColor: 'indigo', // Named colors
    bodyColor: '#9a0036' // Hex colors
  });
  
  main.show();
}