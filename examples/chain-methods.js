'use strict';

var KS_CRAWLER = require('../ks');


var project, config;


/**
 * Initialize the kickstarter project's configurations
 */
config = {
  url: 'https://www.kickstarter.com/projects/maxtemkin/philosophy-posters'
};


/**
 * Create an instance of the kickstarter crawler
 * @param  {Object}  config
 */
project = new KS_CRAWLER.project(config);


/**
 * Chain several project property methods together
 * The last method requires a callback
 */
project
  .getCreator()
  .getCity()
  .getDollarsRaised()
  .getCategory(function onCrawl (err, data) {

    if (err) {
      console.log(err);
    }

    console.log(data);
  });
