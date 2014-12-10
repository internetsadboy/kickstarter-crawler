'use strict';

var KS_CRAWLER = require('../ks'),
    request = require('request');


var url = 'https://www.kickstarter.com/projects/597507018/pebble-e-paper-watch-for-iphone-and-android';


/**
 * Make a HTTP request to the kickstarter project url and parse the HTML
 * @param  {String}    url
 * @param  {Function}  onRequest
 */
request(url, function onRequest (err, res, body) {
  var project, data;

  if (err) {
    console.error('Bad request');
  }

  // create an instance of the kickstarter project crawler
  project = new KS_CRAWLER.project({
    url: url
  });

  // parse HTML
  data = project.parse(body);

  // log the project's successfully parsed data points
  console.log(data.successes);
});
