// this example prints the names, cities, and states of the first 10 projects in the crapi data set
// crapi is a crowdfunding data set (kickstarter and indiegogo)
// more information can be found at https://github.com/ghostsnstuff/crapi
var projects = require('crapi').kickstarter;
var ks = require('../ks');

var brk = 0;
for(var i in projects) {
  brk++;
  if(brk === 10) break;
  var options = {
    url:projects[i];
  }
  var project = new ks.project(options);
  project.getTitle().getCity().getState(function(err, data) {
    if(err) throw err;
    console.log(data);
  });
}
