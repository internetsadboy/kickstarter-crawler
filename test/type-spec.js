'use strict';


var KS = require('../index'),
test = require('tape');


// Initialize the crawler
var crawler = new KS.project({ url: 'https://www.kickstarter.com/projects/maxtemkin/philosophy-posters' });


test('[Type] Unit Tests', function (t) {

  // Make request (crawl)
  crawler.request(function onRequest (err, data) {

    // Failed request
    if (err) {
      t.fail('Error on request');
    }

    // General tests
    t.test('[General]', function onGeneral (t) {
      t.plan(8);

      t.deepEqual(typeof data.generalTitle, 'string', 'generalTitle');
      t.deepEqual(typeof data.generalCreator, 'string', 'generalCreator');
      t.deepEqual(typeof data.generalCategory, 'string', 'generalCategory');
      t.deepEqual(typeof data.generalSubCategory, 'string', 'generalSubCategory');
      t.deepEqual(typeof data.generalProjectURL, 'string', 'generalProjectURL');
      t.deepEqual(typeof data.generalCreatorURL, 'string', 'generalCreatorURL');
      t.deepEqual(typeof data.generalAvatarURL, 'string', 'generalAvatarURL');
      t.deepEqual(typeof data.generalVideoURL, 'string', 'generalVideoURL');
    });

    // Location tests
    t.test('[Location]', function onLocation (t) {
      t.plan(3);

      t.deepEqual(typeof data.locationCity, 'string','locationCity');
      t.deepEqual(typeof data.locationState, 'string', 'locationState');
      t.deepEqual(typeof data.locationCountry, 'string', 'locationCountry');
    });

    // Funding tests
    t.test('[Funding]', function onFunding (t) {
      t.plan(6);

      t.deepEqual(typeof data.fundingDollarsRaised, 'number', 'fundingDollarsRaised');
      t.deepEqual(typeof data.fundingGoal, 'number', 'fundingGoal');
      t.deepEqual(typeof data.fundingPercentRaised, 'number', 'fundingPercentRaised');
      t.deepEqual(typeof data.fundingCurrency, 'string', 'fundingCurrency');
      t.deepEqual(typeof data.fundingSuccessful, 'boolean', 'fundingSuccessful');
      t.deepEqual(typeof data.fundingBackers, 'number', 'fundingBackers');
    });

    // Time tests
    t.test('[Time]', function onTime (t) {
      t.plan(3);

      t.deepEqual(typeof data.timeNumDays, 'number', 'timeNumDays');
      t.deepEqual(typeof data.timeStart, 'number', 'timeStart');
      t.deepEqual(typeof data.timeEnd, 'number', 'timeEnd');
    });

    // Media tests
    t.test('[Media]', function onMedia (t) {
      t.plan(2);

      t.deepEqual(typeof data.mediaNumImages, 'number', 'mediaNumImages');
      t.deepEqual(Array.isArray(data.mediaImages), true, 'mediaImages');
    });

    // Other tests
    t.test('[Other]', function onOther (t) {
      t.plan(5);

      t.deepEqual(typeof data.otherUpdates, 'number', 'otherUpdates');
      t.deepEqual(typeof data.otherComments, 'number', 'otherComments');
      t.deepEqual(typeof data.otherProjectsCreated, 'number', 'otherProjectsCreated');
      t.deepEqual(typeof data.otherProjectsBacked, 'number', 'otherProjectsBacked');
      t.deepEqual(typeof data.otherWebsiteURL, 'string', 'otherWebsiteURL');
    });

    // Pledges tests
    t.test('[Pledges]', function onPledges (t) {
      t.plan(11);

      t.deepEqual(typeof data.pledgesNumPledges, 'number', 'pledgesNumPledges');
      t.deepEqual(typeof data.pledgesNumLimited, 'number', 'pledgesNumLimited');
      t.deepEqual(Array.isArray(data.pledgesAmounts), true, 'pledgesAmounts');

      // Individual pledge
      var pledge = data.pledgesData[0];

      // Pledge specific tests
      t.deepEqual(typeof pledge.amount, 'number', 'amount');
      t.deepEqual(typeof pledge.numBackers, 'number', 'numBackers');
      t.deepEqual(typeof pledge.pledgePercentage, 'number', 'pledgePercentage');
      t.deepEqual(typeof pledge.estimatedDelivery, 'string', 'estimatedDelivery');
      t.deepEqual(typeof pledge.estimatedDeliveryISO, 'string', 'estimatedDeliveryISO');
      t.deepEqual(typeof pledge.description, 'string', 'description')
      t.deepEqual(typeof pledge.numWords, 'number', 'numWords');
      t.deepEqual(typeof pledge.numAllCaps, 'number', 'numAllCaps');
    });

  });

});
