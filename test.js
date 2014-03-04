var ks = require('./ks')
  , options = {
      url: 'http://www.kickstarter.com/projects/maxtemkin/philosophy-posters'
    };
    
var project = new ks.project(options);

// test location fetch
project.getLocation().getFunding().getGeneral().getTime(function(err, data) {
	if(err) throw err;
	console.log(data);
});
