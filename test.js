<<<<<<< HEAD
var ks = require('./ks');
var options = {
	url:'http://www.kickstarter.com/projects/maxtemkin/philosophy-posters',
	fields:['general','location','funding','time','other','media','pledges'],
	log:false
};

var project = new ks.project(options)
project.request(function(err, data) {
	if(err) throw err;
	console.log(data);
})
=======
var ks = require('./ks')
  , options = {url: 'http://www.kickstarter.com/projects/maxtemkin/philosophy-posters'}
  , project = new ks.project(options);

// fetch -> print: location, funding, general, and time
project.getLocation().getFunding().getGeneral().getTime(function(err, data) {
  if(err) throw err;
  console.log(data);
});
>>>>>>> d7254ca29daacd5217104fb995e873904cb6f28d
