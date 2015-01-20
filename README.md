## kickstarter-crawler

[![NPM](https://nodei.co/npm/kickstarter-crawler.png?downloads=true)](https://nodei.co/npm/kickstarter-crawler/)

##### :pizza: Returns **30 + 8n** data points - where n is the number of pledges

##### :pizza: Analyze **61,356** kickstarter projects using [crapi](https://github.com/ghostsnstuff/crapi)

## Installation

    npm install kickstarter-crawler -g

## Test

    npm test

## Getting Started
[Examples](https://github.com/ghostsnstuff/kickstarter-crawler/blob/master/README.md#examples)<br>
[API](https://github.com/ghostsnstuff/kickstarter-crawler/blob/master/README.md#API)<br>


### Examples

The following example crawls a project collecting **general**, **funding**, and **location**  
related data


```javascript
'use strict';


var kickstarterCrawler = require('kickstarter-crawler');


var config, project;


// Project configurations
config = {
  url: 'https://www.kickstarter.com/projects/maxtemkin/philosophy-posters',
  fields: ['general', 'funding', 'location']
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

```

** :pizza: MORE EXAMPLES COMING :pizza: **

## API

### `kickstarterCrawler.project(config)`
* {Object} project constructor<br>
* Initializes the crawler and exposes its interface<br><br>

### `config`
* {Object} project configurations<br>
* Configurations necessary to instatiate the project constructor<br><br>

### `config.url`
* {String} project profile url<br><br>

### `config.fields`
* {Array} array of project data-fields, which indicate what data points will be crawled<br>
* If *undefined*, data from *all* fields will be returned.<br>

**VALID FIELD VALUES**
* general
* time
* funding
* location
* other
* media
* pledges

### `project.request(callback)`
* Makes a HTTP request to the respective project url<br>
* @param `callback(err, data)` {Function}<br><br>

### `project.parse(HTML)`
* Parses the HTML corresponding to the respective project profile page<br>
* Returns a nested JSON of parsed data
* @param {String} `HTML`<br>
* @return {Object}

### `project.getTitle(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {String} the project's title<br><br>

### `project.getCreator(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {String} the creator's name<br><br>

### `project.getCategory(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {String} the project's category<br><br>

### `project.getSubCategory(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {String} the project's sub-category<br><br>

### `project.getAvatar(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {String} the project's avatar url<br><br>

### `project.getProjectUrl(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {String} the project's url<br><br>

### `project.getCreatorUrl(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {String} the creator's url<br><br>

### `project.getProjectVideo(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {String} the project's video url<br><br>

### `project.getNumDays(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {Number} the project's duration (number of days)<br><br>

### `project.getStartTime(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {Number} the project's start time<br><br>

### `project.getEndTime(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {Number} the project's end time<br><br>

### `project.getDollarsRaised(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {Number} the amount of money raised<br><br>

### `project.getFundingGoal(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {Number} the project's goal<br><br>

### `project.getPercentRaised(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {Number} the percent raised<br><br>

### `project.getCurrency(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {String} the currency<br><br>

### `project.getSuccess(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {Boolean} a success boolean<br><br>

### `project.getBackers(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {Number} the number of backers<br><br>

### `project.getCity(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {String} the city<br><br>

### `project.getState(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {String} the state<br><br>

### `project.getCountry(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {String} the country<br><br>

### `project.getUpdates(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {Number} the number of updates<br><br>

### `project.getComments(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {Number} the number of comments<br><br>

### `project.getProjectsCreated(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {Number} the number of projects done by the creator<br><br>

### `project.getProjectsBacked(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {Number} the number of projects backed by the creator<br><br>

### `project.getWebsiteUrl(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {String} the website url<br><br>

### `project.getNumImages(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {Number} the number of images used in the project's profile page<br><br>

### `project.getImages(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {Array} an array of images used in the project<br><br>

### `project.getNumPledges(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {Number} the number of pledges<br><br>

### `project.getNumLimitedPledges(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {Number} the number of pledges that had limited offerings<br><br>

### `project.getPledgeAmounts(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {Array} an array of the pledge amounts used<br><br>

### `project.getPledgesData(callback)`
* @param {Function} `callback(err, data)`<br>
* @return {Object} a nested json of individual pledge data<br><br>
