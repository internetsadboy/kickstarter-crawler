'use strict';

var KS_CRAWLER = require('kickstarter-crawler');


var config, project;

/**
 * Define the project's configurations
 *
 * @param  {String}  url  kickstarter project url
 */
config = {
  url: 'https://www.kickstarter.com/projects/maxtemkin/philosophy-posters'
};


/**
 * Create an instance of the kickstarter crawler
 * Initialize the project's configurations
 *
 * @param  {Object}  config
 */
project = new KS_CRAWLER.project(config);


/**
 * Crawl the project's dollars raised value
 *
 * @param  {Function}  onEnd  binary callback
 */
project.getDollarsRaised(onEnd);


/**
 * onEnd   project's callback (post crawl)
 *
 * @param  {Object}  err
 * @param  {Object}  datum
 */
function onEnd (err, datum)
{
  if (err) { throw err; }

  console.log(datum);
}
