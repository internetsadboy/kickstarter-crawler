var ks = require('../ks');
var project = new ks.project({
  url:'https://www.kickstarter.com/projects/597507018/pebble-e-paper-watch-for-iphone-and-android'
});
project.request(function(err, data) {
  if(err) throw err;
  console.log(data);
});
