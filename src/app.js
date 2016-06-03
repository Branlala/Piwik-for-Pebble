/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Settings = require('settings');
var piwik = require('./piwik');
var tools = require('./tools');
var version = '1.0';

/** Configuration **/


var main = new UI.Card({
  title: ' for Pebble',
  icon: 'images/icone',
  body: 'Loading ...',
  subtitle: ' Last 24H',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});

main.show();

var options = Settings.option();
console.log(JSON.stringify(options));

//var url = options.piwik_url+
//      '/?module=API&idSite=' + options.piwik_site_id + '&format=JSON&token_auth=' + options.piwik_auth +
//    '&method=Live.getCounters&lastMinutes=1440';
//console.log(url);



/** Code **/

if (options.p4p_version == version) {
  piwik.buildLast24H(tools.buildURL(options, 'Live.getCounters', 'lastMinutes=1440'),main);
  
  main.on('click', 'down', function(e) {
    var menu = new UI.Menu({
      sections: [{
        items: [{
          title: ' for Pebble',
          icon: 'images/icone',
          subtitle: 'Last 24H'
        }, {
          title: 'Top pages',
          subtitle: 'This month'
        }]
      }]
    });
    menu.on('select', function(e) {
      console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
      console.log('The item is titled "' + e.item.title + '"');
      if (e.itemIndex === 0 && e.sectionIndex === 0){
        var cardLast24h = tools.buildUI(' for Pebble', ' Last 24H', 'Loading ...');
        cardLast24h.show();
        piwik.buildLast24H(
          tools.buildURL(
            options,
            'Live.getCounters',
            'lastMinutes=1440'
          ),cardLast24h);
      }
      if (e.itemIndex === 1 && e.sectionIndex === 0){
        var cardTopPagesMonth = tools.buildUI(' for Pebble', 'Top Pages', 'Loading ...', true);
        cardTopPagesMonth.show();
        piwik.buildTopPagesMonth(
          tools.buildURL(
            options,
            'Actions.getPageTitles',
            'filter_limit=10&period=month&date=today'
          ),cardTopPagesMonth);
      }
    });
    menu.show();
  });
  
} else {
  main.subtitle('');
  main.body('Please, go to app\'s settings and fill your Piwik server informations.');
}


Pebble.addEventListener('ready', function() {
  console.log('PebbleKit JS ready!');
});



// Set a configurable with just the close callback
Settings.config(
  { url: 'https://techan.fr/wp-content/piwik-for-pebble/config/index.html?appversion='+version },
  function(e) {
    console.log('closed configurable');

    // Show the parsed response
    console.log(JSON.stringify(e.options));
    if(e.options.saved == 'SAVE') {
      main.subtitle('Settings Applied');
      main.body('You can now reload the app.');
    }
    

    // Show the raw response if parsing failed
    if (e.failed) {
      console.log(e.response);
    }
  }
);
