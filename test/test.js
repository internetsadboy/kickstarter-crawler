'use strict';


var KS = require('../index'),
    test = require('tape');


// Initialize the crawler
var crawler = new KS.project({ url: 'https://www.kickstarter.com/projects/maxtemkin/philosophy-posters' });


test('Unit Tests', function (t) {

  // Make request (crawl)
  crawler.request(function onRequest (err, data) {

    // Failed request
    if (err) {
      t.fail('Error on request');
    }

    // General tests
    t.test('[General]', function onGeneral (t) {
      t.plan(8);

      t.deepEqual(data.generalTitle, 'Philosophy Posters', 'generalTitle');
      t.deepEqual(data.generalCreator, 'Max Temkin', 'generalCreator');
      t.deepEqual(data.generalCategory, 'Design', 'generalCategory');
      t.deepEqual(data.generalSubCategory, 'Graphic Design', 'generalSubCategory');
      t.deepEqual(data.generalProjectURL, 'https://www.kickstarter.com/projects/maxtemkin/philosophy-posters', 'generalProjectURL');
      t.deepEqual(data.generalCreatorURL, 'https://www.kickstarter.com/projects/maxtemkin/philosophy-posters/creator_bio', 'generalCreatorURL');
      t.deepEqual(data.generalAvatarURL, 'https://s3.amazonaws.com/ksr/avatars/21469/JanaAvatar_big.small.jpg?1348789612', 'generalAvatarURL');
      t.deepEqual(data.generalVideoURL, 'https://d2pq0u4uni88oo.cloudfront.net/projects/71739/video-84680-h264_high.mp4', 'generalVideoURL');
    });

    // Location tests
    t.test('[Location]', function onLocation (t) {
      t.plan(3);

      t.deepEqual(data.locationCity, 'Chicago','locationCity');
      t.deepEqual(data.locationState, 'IL', 'locationState');
      t.deepEqual(data.locationCountry, 'US', 'locationCountry');
    });

    // Funding tests
    t.test('[Funding]', function onFunding (t) {
      t.plan(6);

      t.deepEqual(data.fundingDollarsRaised, 41167.74, 'fundingDollarsRaised');
      t.deepEqual(data.fundingGoal, 2000, 'fundingGoal');
      t.deepEqual(data.fundingPercentRaised, 2058.39, 'fundingPercentRaised');
      t.deepEqual(data.fundingCurrency, 'USD', 'fundingCurrency');
      t.deepEqual(data.fundingSuccessful, true, 'fundingSuccessful');
      t.deepEqual(data.fundingBackers, 1393, 'fundingBackers');
    });

    // Time tests
    t.test('[Time]', function onTime (t) {
      t.plan(3);

      t.deepEqual(data.timeNumDays, 30, 'timeNumDays');
      t.deepEqual(data.timeStart, 1333555639000, 'timeStart');
      t.deepEqual(data.timeEnd, 1336147639000, 'timeEnd');
    });

    // Media tests
    t.test('[Media]', function onMedia (t) {
      t.plan(2);

      t.deepEqual(data.mediaNumImages, 0, 'mediaNumImages');
      t.deepEqual(data.mediaImages, [], 'mediaImages');
    });

    // Other tests
    t.test('[Other]', function onOther (t) {
      t.plan(5);

      t.deepEqual(data.otherUpdates, 23, 'otherUpdates');
      t.deepEqual(data.otherComments, 174, 'otherComments');
      t.deepEqual(data.otherProjectsCreated, 5, 'otherProjectsCreated');
      t.deepEqual(data.otherProjectsBacked, 186, 'otherProjectsBacked');
      t.deepEqual(data.otherWebsiteURL, 'http://www.Maxistentialism.com', 'otherWebsiteURL');
    });

    // Pledges tests
    t.test('[Pledges]', function onPledges (t) {
      t.plan(11);

      t.deepEqual(data.pledgesNumPledges, 2, 'pledgesNumPledges');
      t.deepEqual(data.pledgesNumLimited, 0, 'pledgesNumLimited');
      t.deepEqual(data.pledgesAmounts, [20, 30], 'pledgesAmounts');

      // Individual pledge
      var pledge = data.pledgesData[0];

      // Pledge specific tests
      t.deepEqual(pledge.amount, 20, 'amount');
      t.deepEqual(pledge.numBackers, 1003, 'numBackers');
      t.deepEqual(pledge.pledgePercentage, 0.72, 'pledgePercentage');
      t.deepEqual(pledge.estimatedDelivery, '2012-05-01', 'estimatedDelivery');
      t.deepEqual(pledge.estimatedDeliveryISO, '2012-05-01T00:00:00.000Z', 'estimatedDeliveryISO');
      t.deepEqual(pledge.description, 'One print of your choice, signed, numbered, and shipped to your doorstep in the United States.', 'description')
      t.deepEqual(pledge.numWords, 16, 'numWords');
      t.deepEqual(pledge.numAllCaps, 0, 'numAllCaps');
    });

  });

});
