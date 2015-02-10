'use strict';


var dataSelectors = require('./dataSelectors'),
    request = require('request'),
    cheerio = require('cheerio'),
    utils = require('./utils'),
    Queue = require('./queue'),
    url = require('url');


var FIELDS, Project;


FIELDS = utils.fields();


module.exports = Project = function Project (config) {
  var fields = config.fields;
  var self = this;

  // Project url
  self.url = typeof config === 'string' ? config : config.url;

  // Queue of functions to invoke
  self.fields = new Queue();

  // Add user defined fields into internal queue
  if (fields) {

    // Traverse fields
    for (var key in fields) {
      switch (fields[key]) {
        case 'general':
          for (var key in FIELDS.general) {
            self.fields.enqueue(FIELDS.general[key]);
          }
          break;
        case 'location':
          for (var key in FIELDS.location) {
            self.fields.enqueue(FIELDS.location[key]);
          }
          break;
        case 'funding':
          for (var key in FIELDS.funding) {
            self.fields.enqueue(FIELDS.funding[key]);
          }
          break;
        case 'time':
      	  for (var key in FIELDS.time) {
            self.fields.enqueue(FIELDS.time[key]);
      	  }
          break;
      	case 'other':
          for (var key in FIELDS.other) {
            self.fields.enqueue(FIELDS.other[key]);
          }
          break;
        case 'media':
      	  for (var key in FIELDS.media) {
            self.fields.enqueue(FIELDS.media[key]);
          }
      	  break;
      	case 'pledges':
      	  for (var key in FIELDS.pledges) {
            self.fields.enqueue(FIELDS.pledges[key]);
          }
      	  break
      	default:
      	  self.fields.enqueue(fields[key]);
          break;
      }
    }
  }
  else {
    // Add all fields to internal queue by default
    for (var key in FIELDS) {
      for (var field in FIELDS[key]) {
        self.fields.enqueue(FIELDS[key][field]);
      }
    }
  }
}


Project.prototype.getTitle = function (callback) {
  this.fields.enqueue('generalTitle');
  return callback ? this.request(callback) : this;
}

Project.prototype.getCreator = function (callback) {
  this.fields.enqueue('generalCreator');
  return callback ? this.request(callback) : this;
}

Project.prototype.getCategory = function (callback) {
  this.fields.enqueue('generalCategory');
  return callback ? this.request(callback) : this;
}

Project.prototype.getSubCategory = function (callback) {
  this.fields.enqueue('generalSubCategory');
  return callback ? this.request(callback) : this;
}

Project.prototype.getAvatar = function (callback) {
  this.fields.enqueue('generalAvatar');
  return callback ? this.request(callback) : this;
}

Project.prototype.getProjectUrl = function (callback) {
  this.fields.enqueue('generalProjectUrl');
  return callback ? this.request(callback) : this;
}

Project.prototype.getCreatorUrl = function (callback) {
  this.fields.enqueue('generalCreatorUrl');
  return callback ? this.request(callback) : this;
}

Project.prototype.getProjectVideo = function (callback) {
  this.fields.enqueue('generalProjectVideo');
  return callback ? this.request(callback) : this;
}

Project.prototype.getCity = function (callback) {
  this.fields.enqueue('locationCity');
  return callback ? this.request(callback) : this;
}

Project.prototype.getState = function (callback) {
  this.fields.enqueue('locationState');
  return callback ? this.request(callback) : this;
}

Project.prototype.getCountry = function (callback) {
  this.fields.enqueue('locationCountry');
  return callback ? this.request(callback) : this;
}

Project.prototype.getDollarsRaised = function (callback) {
  this.fields.enqueue('fundingDollarsRaised');
  return callback ? this.request(callback) : this;
}

Project.prototype.getFundingGoal = function (callback) {
  this.fields.enqueue('fundingFundingGoal');
  return callback ? this.request(callback) : this;
}

Project.prototype.getPercentRaised = function (callback) {
  this.fields.enqueue('fundingPercentRaised');
  return callback ? this.request(callback) : this;
}

Project.prototype.getCurrency = function (callback) {
  this.fields.enqueue('fundingCurrency');
  return callback ? this.request(callback) : this;
}

Project.prototype.getSuccess = function (callback) {
  this.fields.enqueue('fundingSuccessful');
  return callback ? this.request(callback) : this;
}

Project.prototype.getBackers = function (callback) {
  this.fields.enqueue('fundingBackers');
  return callback ? this.request(callback) : this;
}

Project.prototype.getNumDays = function (callback) {
  this.fields.enqueue('timeNumDays');
  return callback ? this.request(callback) : this;
}

Project.prototype.getStartTime = function (callback) {
  this.fields.enqueue('timeStart');
  return callback ? this.request(callback) : this;
}

Project.prototype.getEndTime = function (callback) {
  this.fields.enqueue('timeEnd');
  return callback ? this.request(callback) : this;
}

Project.prototype.getUpdates = function (callback) {
  this.fields.enqueue('otherUpdates');
  return callback ? this.request(callback) : this;
}

Project.prototype.getComments = function (callback) {
  this.fields.enqueue('otherComments');
  return callback ? this.request(callback) : this;
}

Project.prototype.getProjectsCreated = function (callback) {
  this.fields.enqueue('otherProjectsCreated');
  return callback ? this.request(callback) : this;
}

Project.prototype.getProjectsBacked = function (callback) {
  this.fields.enqueue('otherProjectsBacked');
  return callback ? this.request(callback) : this;
}

Project.prototype.getWebsiteUrl = function (callback) {
  this.fields.enqueue('otherWebsiteURL');
  return callback ? this.request(callback) : this;
}

Project.prototype.getNumImages = function (callback) {
  this.fields.enqueue('mediaNumImages');
  return callback ? this.request(callback) : this;
}

Project.prototype.getImages = function (callback) {
  this.fields.enqueue('mediaImages');
  return callback ? this.request(callback) : this;
}

Project.prototype.getNumPledges = function (callback) {
  this.fields.enqueue('pledgesNumPledges');
  return callback ? this.request(callback) : this;
}

Project.prototype.getNumLimitedPledges = function (callback) {
  this.fields.enqueue('pledgesNumLimited');
  return callback ? this.request(callback) : this;
}

Project.prototype.getPledgeAmounts = function (callback) {
  this.fields.enqueue('pledgesAmounts');
  return callback ? this.request(callback) : this;
}

Project.prototype.getPledgesData = function (callback) {
  this.fields.enqueue('pledgesData');
  return callback ? this.request(callback) : this;
}

Project.prototype.parse = function (body) {
  var self = this;

  var parsedHTML, n, successes, errors;

  parsedHTML = cheerio.load(body);
  n = self.fields.size();
  successes = {};
  errors = {};

  // Traverse queue of functions to invoke
  while (n--) {

    // Pull next function off the queue
    var fn = self.fields.dequeue();

    // Function exists
    if (dataSelectors[fn]) {
      try {
        // Invoke function
        successes[fn] = dataSelectors[fn](parsedHTML);
      }
      catch (e) {
        // Log broken function invocation
        errors[fn] = e;
      }
    }
    // Function doesn't exist
    else {
      successes[fn] = undefined;
      errors[fn] = 'invalid field name';
    }
  }

  return { successes: successes, errors: errors };
}

Project.prototype.request = function (callback) {
  var self = this;

  // Make request (crawl)
  request(self.url, function (err, res, body) {
    var crawledData = self.parse(body);

    if (err) {
      return callback(err, undefined);
    }
    else {
      callback(undefined, crawledData.successes);
    }
  });
}
