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