var ks = require('./ks')
  , options = {url: 'http://www.kickstarter.com/projects/maxtemkin/philosophy-posters'}
  , project = new ks.project(options);

// fetch location, funding, general, and time
project.getLocation().getFunding().getGeneral().getTime(function(err, data) {
  if(err) throw err;
  console.log(data);
});
