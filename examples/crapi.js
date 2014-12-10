'use strict';

var KS_CRAWLER = require('../ks'),
    CRAPI = require('crapi'),
    async = require('async');


var projects, ksProjectTitles, ksUrlsSubset;


/**
 * Initialize crapi kickstarter project values
 * @return  {Object}  consists of project titles that map to project urls
 */
projects = CRAPI.kickstarter;


/**
 * Fetch project title values
 */
ksProjectTitles = Object.keys(projects);

ksUrlsSubset = [];


/**
 * Fetch 5 arbitrary project urls
 */
for (var i = 0; i < 5; i++)
{
  ksUrlsSubset.push(projects[ksProjectTitles[i]]);
}


/**
 * Crawl 5 arbitrary kickstarter projects
 */
async.map(
  ksUrlsSubset,
  onMap,
  onEnd
);


/**
 * async.map Iterator function, which gets called for each item in ksUrlsSubset
 * @param  {String}    kickstarter project url
 * @param  {Function}  callback
 */
function onMap (url, callback)
{
  var project;


  /**
   * Initialize the kickstarter project's configurations
   * @param  {Object}  configuration object literal containing the project's url
   */
  project = new KS_CRAWLER.project({ url: url });


  /**
   * onCrawl
   *
   * Handler for each request made
   * @param  {Object}  err
   * @param  {Object}  datum
   */
  function onCrawl (err, datum)
  {
    if (err) {
      callback(err, null);
      return;
    }

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
 * @param  {Object}  err
 * @param  {Object}  datum
 */
function onEnd (err, datum)
{
  if (err) {
    console.log(err);
  }

  console.log(datum);
}
