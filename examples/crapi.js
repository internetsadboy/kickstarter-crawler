'use strict';

var KS_CRAWLER = require('../ks'),
    CRAPI = require('crapi'),
    async = require('async');


var projects, ks_project_titles, ks_urls_subset;


/**
 * Initialize crapi kickstarter project values
 *
 * @return  {Object}  consists of project titles that map to project urls
 */
projects = CRAPI.kickstarter;


/**
 * Fetch project title values
 */
ks_project_titles = Object.keys(projects);

ks_urls_subset = [];


/**
 * Fetch 5 arbitrary project urls
 */
for (var i = 0; i < 5; i++)
{
  ks_urls_subset.push(projects[ks_project_titles[i]]);
}


/**
 * Crawl 5 arbitrary kickstarter projects
 */
async.map(
  ks_urls_subset,
  onMap,
  onEnd
);


/**
 * async.map Iterator function, which gets called for each item in ks_urls_subset
 *
 * @param  {String}    kickstarter project url
 * @param  {Function}  callback
 */
function onMap (url, callback)
{
  var project;


  /**
   * Initialize the kickstarter project's configurations
   *
   * @param  {Object}  configuration object literal containing the project's url
   */
  project = new KS_CRAWLER.project({ url: url });


  /**
   * onCrawl
   *
   * Handler for each request made
   *
   * @param  {Object}  err
   * @param  {Object}  datum
   */
  function onCrawl (err, datum)
  {
    if (err) { return callback(err, null); }

    callback(null, datum);

  }


  /**
   * Crawl the project's title, city, and dollars raised values via method-chaining
   * The last method called demands a callback
   */
  project
    .getTitle()
    .getCity()
    .getDollarsRaised(onCrawl);

}


/**
 * onEnd
 *
 * Terminal async.map handler
 *
 * @param  {Object}  err
 * @param  {Object}  datum
 */
function onEnd (err, datum)
{
  if (err) { console.log(err); }

  console.log(datum);
}
