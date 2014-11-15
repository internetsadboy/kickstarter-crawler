'use strict';

 var KS_CRAWLER = require('kickstarter-crawler');


 var project, config;


/**
 * Define project configurations
 *
 * @param  {String}  url     kickstarter project url
 * @param  {Object}  fields  kickstarter project categorical data points to be crawled
 */
 config = {
   url: 'https://www.kickstarter.com/projects/maxtemkin/philosophy-posters',
   fields: ['general','location','funding']
 };


/**
 * Create an instance of the kickstarter crawler
 * Initialize the kickstarter project's configurations
 *
 * @param  {Object}  config
 */
project = new KS_CRAWLER.project(config);


/**
 * Initiate the request to the kickstarter project url
 *
 * @param  {Function}  onRequest  handler that contains error and crawled data values
 */
project.request(function onRequest (err, data) {

  if (err) { console.log(err); }

  console.log(data);

});
