/*
 * example
 * =======
 *   - single method getFundsRaised()
 *   - pass the method the callback(err,data)
 * output
 * ======
 * { funding_dollarsRaised: 41167.74 }
 */

var ks = require('kickstarter-crawler');
var options = {
  url:'https://www.kickstarter.com/projects/maxtemkin/philosophy-posters'
};
var project = new ks.project(options);
project.getDollarsRaised(function(err,data) {
  if(err) throw err;
  console.log(data);
});
