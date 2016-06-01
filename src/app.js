/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Settings = require('settings');
var piwik = require('./piwik');

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
  { url: 'https://techan.fr/wp-content/piwik-for-pebble/config/index.html' },
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

/*
var piwik_url = Settings.option('piwik_url');
console.log(piwik_url);
var piwik_site_id = Settings.option('piwik_site_id');
console.log(piwik_site_id);
var piwik_auth = Settings.option('piwik_auth');
console.log(piwik_auth);
*/

//var url = 'https://'+piwik_url+
//      '/?module=API&method=Referrers.getKeywords&idSite=' + piwik_site_id + '&date=yesterday&period=day&format=xml&filter_limit=10&format=JSON&token_auth='+
//      piwik_auth;


if (options.p4p_version == version) {  
  main.show();
  
  var main = new UI.Card({
    title: ' for Pebble',
    icon: 'images/icone',
    body: 'Loading ...',
    subtitle: 'Today',
    subtitleColor: 'indigo', // Named colors
    bodyColor: '#9a0036' // Hex colors
  });

  piwik.buildToday(url,main);
  
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