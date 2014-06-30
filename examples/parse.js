var uri = 'https://www.kickstarter.com/projects/597507018/pebble-e-paper-watch-for-iphone-and-android';
var request = require('request');
var ks = require('../ks');


// crawl kickstarter, then parse data separately
request(uri, function(err, res, body) {
  if(err) {
    console.error(new Error('something went wrong'));
  }
  var project = new ks.project();
  var data = project.parse(body);
  console.log(data.successes);
});
