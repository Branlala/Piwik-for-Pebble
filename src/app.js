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
  
  main.on('click', 'down', function(e) {
    var menu = new UI.Menu({
      sections: [{
        items: [{
          title: ' for Pebble',
          icon: 'images/icone',
          subtitle: 'Today'
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
      if (e.itemIndex === 0 && e.sectionIndex === 0){
        
      }
    });
    menu.show();
  });
  
  main.on('click', 'select', function(e) {
     var url = options.piwik_url+
        '/?module=API&method=ImageGraph.get&idSite=' + 
         options.piwik_site_id + 
         '&apiModule=VisitsSummary&apiAction=get&token_auth=' +
         options.piwik_auth + 
         '&graphType=horizontalBar&period=month&date=today&width=500&height=250';
      
     var main = new UI.Card({
       title: ' for Pebble',
       icon: 'images/icone',
       body: 'Loading ...',
       subtitle: 'Today',
       subtitleColor: 'indigo', // Named colors
       bodyColor: '#9a0036' // Hex colors
     });
    
      main.show();
      
      piwik.buildVisitsGraph(url,main);
      
      main.show();
    
  });
  
  main.on('click', 'up', function(e) {
    var card = new UI.Card();
    card.title('A Card');
    card.subtitle('Is a Window');
    card.body('The simplest window type in Pebble.js.');
    card.show();
  });
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