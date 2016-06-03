var UI = require('ui');

function buildUI(title) {
  var card = new UI.Card({
    title: title,
    icon: 'images/icone',
    body: 'Loading ...',
    subtitle: 'Last 24H',
    subtitleColor: 'indigo', // Named colors
    bodyColor: '#9a0036' // Hex colors
  });
  return card;
}

function buildUI(title, subtitle) {
  var card = new UI.Card({
    title: title,
    icon: 'images/icone',
    body: 'Loading ...',
    subtitle: subtitle,
    subtitleColor: 'indigo', // Named colors
    bodyColor: '#9a0036' // Hex colors
  });
  return card;
}

function buildUI(title, subtitle, body) {
  var card = new UI.Card({
    title: title,
    icon: 'images/icone',
    body: body,
    subtitle: subtitle,
    subtitleColor: 'indigo', // Named colors
    bodyColor: '#9a0036' // Hex colors
  });
  return card;
}

function buildUI(title, subtitle, body, scroll) {
  var card = new UI.Card({
    title: title,
    icon: 'images/icone',
    body: body,
    subtitle: subtitle,
    subtitleColor: 'indigo', // Named colors
    bodyColor: '#9a0036', // Hex colors
    scrollable: scroll
  });
  return card;
}

function buildURL(options, method, filters){
  return options.piwik_url+
      '/?module=API&idSite=' + options.piwik_site_id + '&format=JSON&token_auth=' + options.piwik_auth +
    '&method=' + method + '&' + filters;
}

module.exports.buildUI = buildUI;
module.exports.buildURL = buildURL;