'use strict';


var kickstarterCrawler = require('../index');


var config, project;


// Project configurations
config = {
  url: 'https://www.kickstarter.com/projects/maxtemkin/philosophy-posters',
  fields: ['pledges']
};


// Initialize the crawler
project = new kickstarterCrawler.project(config);


// Make request (crawl)
project.request(function onRequest (err, data) {

  // Something broke
  if (err) {
    console.log(err);
    return;
  }

  // Log crawled data
  console.log(data);

});
