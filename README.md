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
* `data` {Object} will consist of {String} generalTitle<br><br>

### `project.getCreator(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {String} generalCreator<br><br>

### `project.getCategory(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {String} generalCategory<br><br>

### `project.getSubCategory(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {String} generalSubCategory<br><br>

### `project.getAvatar(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {String} generalProjectAvatarURL<br><br>

### `project.getProjectUrl(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {String} generalProjectURL<br><br>

### `project.getCreatorUrl(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {String} generalCreatorURL<br><br>

### `project.getProjectVideo(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {String} generalProjectVideoURL<br><br>

### `project.getNumDays(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {Number} timeNumDays<br><br>

### `project.getStartTime(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {Number} timeStart<br><br>

### `project.getEndTime(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {Number} timeEnd<br><br>

### `project.getDollarsRaised(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {Number} fundingDollarsRaised<br><br>

### `project.getFundingGoal(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {Number} fundingGoal<br><br>

### `project.getPercentRaised(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {Number} fundingPercentRaised<br><br>

### `project.getCurrency(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {String} fundingCurrency<br><br>

### `project.getSuccess(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {Boolean} fundingSuccess<br><br>

### `project.getBackers(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {Number} fundingNumBackers<br><br>

### `project.getCity(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {String} locationCity<br><br>

### `project.getState(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {String} locationState<br><br>

### `project.getCountry(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {String} locationCountry<br><br>

### `project.getUpdates(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {Number} otherUpdates<br><br>

### `project.getComments(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {Number} otherComments<br><br>

### `project.getProjectsCreated(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {Number} otherProjectsCreated<br><br>

### `project.getProjectsBacked(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {Number} otherProjectsBacked<br><br>

### `project.getWebsiteUrl(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {String} otherWebsiteURL<br><br>

### `project.getNumImages(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {Number} mediaNumImages<br><br>

### `project.getImages(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {Array} mediaImages<br><br>

### `project.getNumPledges(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {Number} pledgesNumPledges<br><br>

### `project.getNumLimitedPledges(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {Number} pledgesNumLimitedPledges<br><br>

### `project.getPledgeAmounts(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {Array} pledgesAmounts<br><br>

### `project.getPledgesData(callback)`
* @param {Function} `callback(err, data)`<br>
* `data` {Object} will consist of {Object} pledgesData<br><br>
