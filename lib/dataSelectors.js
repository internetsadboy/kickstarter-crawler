'use strict';

var utils = require('./utils');
var BASE_URL = 'https://www.kickstarter.com';


module.exports = {

  // @return {String} title
  generalTitle: function ($) {
    return $('a.green-dark').eq(0).text();
  },

  // @return {String} creator
  generalCreator: function ($) {
    return $('a.green-dark').eq(1).text();
  },

  // @return {String} category
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

  // @return {String} subCategory
  generalSubCategory: function ($) {
    return $('a.grey-dark.mr3.nowrap b').eq(1).text();
  },

  // @return {String} description
  generalDescription: function ($) {
    return $('p.h3').text().trim();
  },

  // @return {String} avatarURL
  generalAvatarURL: function ($) {
    return $('.avatar-small').attr('src');
  },

  // @return {String} projectURL
  generalProjectURL: function ($) {
    return BASE_URL + $('a.green-dark').eq(0).attr('href');
  },

  // @return {String} creatorURL
  generalCreatorURL: function ($) {
    return BASE_URL + $('a.green-dark').eq(1).attr('href');
  },

  // @return {String} videoURL
  generalVideoURL: function ($) {
    return $('video.landscape source').attr('src');
  },

  // @return {String} city
  locationCity: function ($) {
    return $('a.grey-dark.mr3.nowrap b').eq(0).text().split(', ')[0];
  },

  // @return {String | Undefined} state (US attribute only)
  locationState: function ($) {
    var state;

    state = $('a.grey-dark.mr3.nowrap b').eq(0).text().split(', ')[1];

    return utils.isFromTheUS(state) ? state : undefined;
  },

  // @return {String} country
  locationCountry: function ($) {
    var state;

    state = $('a.grey-dark.mr3.nowrap b').eq(0).text().split(', ')[1];

    // Non-US projects don't list their state e.g. <city, country>
    return utils.isFromTheUS(state) ? 'US' : state;
  },

  // @return {Number} dollars raised
  fundingDollarsRaised: function ($) {
    return Number($('#pledged').attr('data-pledged'));
  },

  // @return {Number} funding goal
  fundingGoal: function ($) {
    return Number($('#pledged').attr('data-goal'));
  },

  // @return {Number} percent raised of goal
  fundingPercentRaised: function ($) {
    return Number(
      parseFloat($('#pledged').attr('data-percent-raised') * 100).toFixed(2)
    );
  },

  // @return {String} currency
  fundingCurrency: function ($) {
    return $('#pledged data').attr('data-currency');
  },

  // @return {Boolean} success indicator
  fundingSuccessful: function ($) {
    return this.fundingPercentRaised($) >= 100;
  },

  // @return {Number} number of backers
  fundingBackers: function ($) {
    return Number($('#backers_count').attr('data-backers-count'));
  },

  // @return {Number} number of days (duration)
  timeNumDays: function ($) {
    return parseFloat($('#project_duration_data').attr('data-duration'));
  },

  // @return {Number} startTimeInMillis
  timeStart: function ($) {
    var startTimeInMillis, endTimeInMillis, daysInMillis;

    endTimeInMillis = this.timeEnd($);
    daysInMillis = this.timeNumDays($) * 1000 * 60 * 60 * 24;
    startTimeInMillis = endTimeInMillis - daysInMillis;

    return startTimeInMillis;
  },

  // @return {Number} endTimeInMillis
  timeEnd: function ($) {
    var endTimeStr, date, endTimeInMillis;

    endTimeStr = $('#project_duration_data').attr('data-end_time');
    date = new Date(endTimeStr);
    endTimeInMillis = date.getTime();

    return endTimeInMillis;
  },

  // @return {Number} number of updates
  otherUpdates: function ($) {
    return Number($('.js-load-project-posts').attr('data-posts-count'));
  },

  // @return {Number} number of comments
  otherComments: function ($) {
    return Number($('#comments_count').attr('data-comments-count'));
  },

  // @return {Number} numProjectsCreated
  otherProjectsCreated: function ($) {
    var node, numProjectsCreated;

    // Select DOM node
    node = $('.mb0 .grey-dark').eq(0).text().toLowerCase();

    // First time creator: node => String, n time creator: node => Number
    numProjectsCreated = node === 'first created' ? 1 : Number(node.split(' ')[0]);

    return numProjectsCreated;
  },

  // @return {Number} number of projects backed
  otherProjectsBacked: function ($) {
    return Number($('.mb0 .grey-dark').eq(2).text().split(' ')[0]);
  },

  // @return {String} project/creator related url
  otherWebsiteURL: function ($) {
    return $('.mb0 .grey-dark').eq(3).attr('href');
  },

  // @return {Number} numImages
  mediaNumImages: function ($) {
    var numImages = 0;

    $('.fit').each(function (i, el) { numImages++; });

    return numImages;
  },

  // @return {Array} images
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

  // @return {Number} number of pledges
  pledgesNumPledges: function ($) {
    return Number($('ul.list.mt2').attr('data-reward-count'));
  },

  // @return {Number} numLimited
  pledgesNumLimited: function ($) {
    var numLimited = 0;

    $('.limited, .sold-out').each(function (i, elem) { numLimited++; });

    return numLimited;
  },

  // @return {Array} amounts
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

  // @return {Array} PLEDGES
  pledgesData: function ($) {
    var totalNumBackers, pledgeAmounts, N, PLEDGES = [];

    // Auxiliaries
    totalNumBackers = this.fundingBackers($);
    pledgeAmounts = this.pledgesAmounts($);
    N = pledgeAmounts.length;

    // Traverse each pledge
    for (var i = 0; i < N; i++) {
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

      // Is limited
      pledge.limited = Boolean($('.limited, .sold-out').eq(i).get().length);

      // Number still available
      var limited = $('.limited-number').eq(i).text();
      pledge.numLeft = (limited.length) ? limited.match(/[0-9]+/)[0] : Infinity;

      // Total number of words in the description
      pledge.numWords = pledge.description.split(' ').length;

      // Total number of capitalized words in the description
      pledge.numAllCaps = utils.getNumAllCaps(pledge.description.trim().split(' '))

      // Is sold out
      pledge.soldOut = Boolean($('.sold-out').eq(i).get().length);

      // Add pledge
      PLEDGES.push(pledge);
    }

    return PLEDGES;
  }

}
