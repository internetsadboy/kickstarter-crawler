'use strict';

var utils = require('./utils');
var BASE_URL = 'https://www.kickstarter.com';


module.exports = {

  generalTitle: function ($) {
    var title;

    title = $('a.green-dark').eq(0).text();

    return title;
  },

  generalCreator: function ($) {
    var creator;

    creator = $('a.green-dark').eq(1).text();

    return creator;
  },

  generalCategory: function ($) {
    var node, category;

    // Select DOM node
    node = $('a.grey-dark.mr3.nowrap').eq(1).attr('href');

    // Parse request url
    category = node.split('/')[3].match(/[a-z]+/)[0];

    // Capitalize the category
    category = category.slice(0, 1).toUpperCase() + category.slice(1);

    return category;
  },

  generalSubCategory: function ($) {
    var subCategory;

    subCategory = $('a.grey-dark.mr3.nowrap b').eq(1).text();

    return subCategory;
  },

  generalAvatarURL: function ($) {
    var avatarURL;

    avatarURL = $('.avatar-small').attr('src');

    return avatarURL;
  },

  generalProjectURL: function ($) {
    var projectURL;

    projectURL = BASE_URL + $('a.green-dark').eq(0).attr('href');

    return projectURL;
  },

  generalCreatorURL: function ($) {
    var creatorURL;

    creatorURL = BASE_URL + $('a.green-dark').eq(1).attr('href');

    return creatorURL;
  },

  generalVideoURL: function ($) {
    var projectVideo;

    projectVideo = $('video.landscape source').attr('src');

    return projectVideo;
  },

  locationCity: function ($) {
    var city;

    city = $('a.grey-dark.mr3.nowrap b').eq(0).text().split(', ')[0];

    return city;
  },

  locationState: function ($) {
    var state;

    state = $('a.grey-dark.mr3.nowrap b').eq(0).text().split(', ')[1];

    return utils.isFromTheUS(state) ? state : undefined;
  },

  locationCountry: function ($) {
    var state;

    state = $('a.grey-dark.mr3.nowrap b').eq(0).text().split(', ')[1];

    // Non-US projects don't list their state e.g. <city, country>
    return utils.isFromTheUS(state) ? 'US' : state;
  },

  fundingDollarsRaised: function ($) {
    var dollarsRaised;

    dollarsRaised = Number($('#pledged').attr('data-pledged'));

    return dollarsRaised;
  },

  fundingGoal: function ($) {
    var goal;

    goal = Number($('#pledged').attr('data-goal'));

    return goal;
  },

  fundingPercentRaised: function ($) {
    var percentRaised;

    percentRaised = Number(
      parseFloat($('#pledged').attr('data-percent-raised') * 100).toFixed(2)
    );

    return percentRaised;
  },

  fundingCurrency: function ($) {
    var currency;

    currency = $('#pledged data').attr('data-currency');

    return currency;
  },

  fundingSuccessful: function ($) {
    var wasSuccessful;

    wasSuccessful = this.fundingPercentRaised($) >= 100;

    return wasSuccessful;
  },

  fundingBackers: function ($) {
    var numBackers;

    numBackers = Number($('#backers_count').attr('data-backers-count'));

    return numBackers;
  },

  timeNumDays: function ($) {
    var numDays;

    numDays = parseFloat($('#project_duration_data').attr('data-duration'));

    return numDays;
  },

  timeStart: function ($) {
    var startTimeInMillis, endTimeInMillis, daysInMillis;

    endTimeInMillis = this.timeEnd($);
    daysInMillis = this.timeNumDays($) * 1000 * 60 * 60 * 24;
    startTimeInMillis = endTimeInMillis - daysInMillis;

    return startTimeInMillis;
  },

  timeEnd: function ($) {
    var endTimeStr, date, endTimeInMillis;

    endTimeStr = $('#project_duration_data').attr('data-end_time');
    date = new Date(endTimeStr);
    endTimeInMillis = date.getTime();

    return endTimeInMillis;
  },

  otherUpdates: function ($) {
    var numUpdates;

    numUpdates = Number($('.js-load-project-updates').attr('data-updates-count'));

    return numUpdates;
  },

  otherComments: function ($) {
    var numComments;

    numComments = Number($('#comments_count').attr('data-comments-count'));

    return numComments;
  },

  otherProjectsCreated: function ($) {
    var node, numProjectsCreated;

    // Select DOM node
    node = $('.mb0 .grey-dark').eq(0).text().toLowerCase();

    // First time creator: node => String, n time creator: node => Number
    numProjectsCreated = node === 'first created' ? 1 : Number(node.split(' ')[0]);

    return numProjectsCreated;
  },

  otherProjectsBacked: function ($) {
    var numProjectsCreated;

    numProjectsCreated = Number($('.mb0 .grey-dark').eq(2).text().split(' ')[0]);

    return numProjectsCreated;
  },

  otherWebsiteURL: function ($) {
    var url;

    url = $('.mb0 .grey-dark').eq(3).attr('href');

    return url;
  },

  mediaNumImages: function ($) {
    var numImages;

    numImages = 0;

    $('.fit').each(function onEach (index, el) {
      numImages++;
    });

    return numImages;
  },

  mediaImages: function ($) {
    var images, numImages, tempImage;

    images = [];
    numImages = this.mediaNumImages($);

    // Traverse project images
    for (var i = 0; i < numImages; i++) {
      tempImage = $('.fit').eq(i).attr('src');
      images.push(tempImage);
    }

    return images;
  },

  pledgesNumPledges: function ($) {
    var numPledges;

    numPledges = Number($('ul.list.mt2').attr('data-reward-count'));

    return numPledges;
  },

  pledgesNumLimited: function ($) {
    var numLimited = 0;

    $('.limited').each(function (i, elem) { numLimited++; });

    return numLimited;
  },

  pledgesAmounts: function ($) {
    var amounts = [];

    $('ul h5.mb1').each(function (i, elem) {
      var amount;

      // Extract the numeric value from the String
      amount = Number($(this).text().trim().replace(/\D/g,''));

      amounts.push(amount);
    });

    return amounts;
  },

  pledgesData: function ($) {
    var totalNumBackers, pledgeAmounts, n, i, PLEDGES = [];

    // Auxiliaries
    totalNumBackers = this.fundingBackers($);
    pledgeAmounts = this.pledgesAmounts($);
    n = pledgeAmounts.length;

    // Traverse each pledge
    for (i = 0; i < n; i++) {
      var pledge = {};

      // Amount
      pledge.amount = pledgeAmounts[i];

      // Number of backers
      pledge.numBackers = Number($('.num-backers').eq(i).text().trim().replace(/\D/g, ''));

      // Percent of backers relative to the total number of backers
      pledge.pledgePercentage = Number((pledge.numBackers / totalNumBackers).toFixed(4));

      // Estimated delivery
      pledge.estimatedDelivery = $('.delivery-date time').eq(i).attr('datetime');

      // Estimated delivery in ISO formatting
      pledge.estimatedDeliveryISO = new Date(pledge.estimatedDelivery).toISOString();

      // Description
      pledge.description = $('.desc p').eq(i).text();

      // Total number of words in the description
      pledge.numWords = pledge.description.split(' ').length;

      // Total number of capitalized words in the description
      pledge.numAllCaps = utils.getNumAllCaps(pledge.description.trim().split(' '))

      // Add pledge
      PLEDGES.push(pledge);
    }

    return PLEDGES;
  }

}
