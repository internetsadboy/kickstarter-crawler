'use strict';


var isUrl = require('is-url'),
    KS = require('../index'),
    test = require('tape');


// Initialize the crawler
var crawler = new KS.project('https://www.kickstarter.com/projects/maxtemkin/philosophy-posters');
var crawler2 = new KS.project('https://www.kickstarter.com/projects/597507018/pebble-e-paper-watch-for-iphone-and-android');


test('[Static] Unit Tests - philosphy posters', function (t) {

  // Make request (crawl)
  crawler.request(function onRequest (err, data) {

    // Failed request
    if (err) {
      t.fail('Error on request');
    }

    // General tests
    t.test('[General]', function onGeneral (t) {
      t.plan(9);

      t.deepEqual(data.generalTitle, 'Philosophy Posters', 'generalTitle');
      t.deepEqual(data.generalCreator, 'Max Temkin', 'generalCreator');
      t.deepEqual(data.generalCategory, 'Design', 'generalCategory');
      t.deepEqual(data.generalSubCategory, 'Graphic Design', 'generalSubCategory');
      t.deepEqual(data.generalDescription, 'Ten giant philosophy posters with big ideas presented simply.', 'generalDescription');
      t.deepEqual(data.generalProjectURL, 'https://www.kickstarter.com/projects/maxtemkin/philosophy-posters', 'generalProjectURL');
      t.deepEqual(data.generalCreatorURL, 'https://www.kickstarter.com/projects/maxtemkin/philosophy-posters/creator_bio', 'generalCreatorURL');

      // Subject to change, assert url
      t.deepEqual(isUrl(data.generalAvatarURL), true, 'generalAvatarURL');
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
      t.plan(4);

      // t.deepEqual(data.otherUpdates, 23, 'otherUpdates');
      t.deepEqual(data.otherComments, 174, 'otherComments');
      t.deepEqual(typeof data.otherProjectsCreated, 'number', 'otherProjectsCreated');

      // Frequently changes, test type
      t.deepEqual(typeof data.otherProjectsBacked, 'number' , 'otherProjectsBacked');
      t.deepEqual(data.otherWebsiteURL, 'http://www.Maxistentialism.com', 'otherWebsiteURL');
    });

    // Pledges tests
    t.test('[Pledges]', function onPledges (t) {
      t.plan(14);

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
      t.deepEqual(pledge.limited, false, 'limited');
      t.deepEqual(pledge.numLeft, Infinity, 'numWords');
      t.deepEqual(pledge.numWords, 16, 'numWords');
      t.deepEqual(pledge.numAllCaps, 0, 'numAllCaps');
      t.deepEqual(pledge.soldOut, false, 'available');
    });

  });

});

test('[Static] Unit Tests - original pebble', function (t) {

  // Make request (crawl)
  crawler2.request(function onRequest (err, data) {

    // Failed request
    if (err) {
      t.fail('Error on request');
    }

    // General tests
    t.test('[General]', function onGeneral (t) {
      t.plan(9);

      t.deepEqual(data.generalTitle, 'Pebble: E-Paper Watch for iPhone and Android', 'generalTitle');
      t.deepEqual(data.generalCreator, 'Pebble Technology', 'generalCreator');
      t.deepEqual(data.generalCategory, 'Design', 'generalCategory');
      t.deepEqual(data.generalSubCategory, 'Product Design', 'generalSubCategory');
      t.deepEqual(data.generalDescription, 'Pebble is a customizable watch. Download new watchfaces, use sports and fitness apps, get notifications from your phone.', 'generalDescription');
      t.deepEqual(data.generalProjectURL, 'https://www.kickstarter.com/projects/597507018/pebble-e-paper-watch-for-iphone-and-android', 'generalProjectURL');
      t.deepEqual(data.generalCreatorURL, 'https://www.kickstarter.com/projects/597507018/pebble-e-paper-watch-for-iphone-and-android/creator_bio', 'generalCreatorURL');

      // Subject to change, assert url
      t.deepEqual(isUrl(data.generalAvatarURL), true, 'generalAvatarURL');
      t.deepEqual(data.generalVideoURL, 'https://d2pq0u4uni88oo.cloudfront.net/projects/111694/video-108947-h264_high.mp4', 'generalVideoURL');
    });

    // Location tests
    t.test('[Location]', function onLocation (t) {
      t.plan(3);

      t.deepEqual(data.locationCity, 'Palo Alto','locationCity');
      t.deepEqual(data.locationState, 'CA', 'locationState');
      t.deepEqual(data.locationCountry, 'US', 'locationCountry');
    });

    // Funding tests
    t.test('[Funding]', function onFunding (t) {
      t.plan(6);

      t.deepEqual(data.fundingDollarsRaised, 10266845.74, 'fundingDollarsRaised');
      t.deepEqual(data.fundingGoal, 100000, 'fundingGoal');
      t.deepEqual(data.fundingPercentRaised, 10266.85, 'fundingPercentRaised');
      t.deepEqual(data.fundingCurrency, 'USD', 'fundingCurrency');
      t.deepEqual(data.fundingSuccessful, true, 'fundingSuccessful');
      t.deepEqual(data.fundingBackers, 68929, 'fundingBackers');
    });

    // Time tests
    t.test('[Time]', function onTime (t) {
      t.plan(3);

      t.deepEqual(data.timeNumDays, 37.917314814814816, 'timeNumDays');
      t.deepEqual(data.timeStart, 1334120344000, 'timeStart');
      t.deepEqual(data.timeEnd, 1337396400000, 'timeEnd');
    });

    // Media tests
    t.test('[Media]', function onMedia (t) {
      t.plan(2);

      t.deepEqual(data.mediaNumImages, 11, 'mediaNumImages');
      t.deepEqual(data.mediaImages, [ 'https://ksr-ugc.imgix.net/assets/001/050/169/d4444d863d4dd7f9ff333a6f0f12b94a_original.jpg?v=1381463121&w=700&h=&fit=max&auto=format&q=92&s=3238f0231f590c1ee2f75f4144144a57', 'https://ksr-ugc.imgix.net/assets/001/050/170/44ceedb61fa1de6b0a98f838620c1345_original.jpg?v=1381463122&w=700&h=&fit=max&auto=format&q=92&s=86922104173682b9fd886366d454f313', 'https://ksr-ugc.imgix.net/assets/001/050/171/ddba8e25abf0d24a174e6f0e0e041dc3_original.jpg?v=1381463124&w=700&h=&fit=max&auto=format&q=92&s=1a646ce813ab9319304420100e1b590c', 'https://ksr-ugc.imgix.net/assets/001/050/172/84fbcdd37830c2a437cf6430675c9382_original.jpg?v=1381463125&w=700&h=&fit=max&auto=format&q=92&s=6324bf3c02d5b2b9147d0c13389cdbe6', 'https://ksr-ugc.imgix.net/assets/001/050/173/b9dc587dd191cbaecac2d43e27103f9b_original.jpg?v=1381463126&w=700&h=&fit=max&auto=format&q=92&s=467432ea449149436fec523bb0c410a7', 'https://ksr-ugc.imgix.net/assets/001/050/174/cc54c32abecd4d8083b2eb79e62222a0_original.jpg?v=1381463127&w=700&h=&fit=max&auto=format&q=92&s=d5c4ecf5690ae14b36ccd0dfedf712ea', 'https://ksr-ugc.imgix.net/assets/001/050/175/76c95a4cd4d5d3b64e5488594bd73e7a_original.jpg?v=1381463129&w=700&h=&fit=max&auto=format&q=92&s=abd72278349ce26a389ff26609e05be1', 'https://ksr-ugc.imgix.net/assets/001/050/176/31f84589e227fd118a37b4be2b42a7d3_original.jpg?v=1381463130&w=700&h=&fit=max&auto=format&q=92&s=2c159c94366f1ebb753b51d98262ff72', 'https://ksr-ugc.imgix.net/assets/001/050/177/b47bd30276886aca166f1600d6341f6c_original.jpg?v=1381463132&w=700&h=&fit=max&auto=format&q=92&s=8c4929c80865a8dd9a8beb6f65fa449b', 'https://ksr-ugc.imgix.net/assets/001/050/178/81dca91c61c1ceab2c480865d6e37cdf_original.jpg?v=1381463133&w=700&h=&fit=max&auto=format&q=92&s=afd67c691a069ddb8b3f31445903f463', 'https://ksr-ugc.imgix.net/assets/001/050/179/28d6814f309ea289f847c69cf91194c6_original.gif?v=1381463134&w=700&h=&fit=max&auto=format&q=92&s=5d30cef8644234df844f7944633965cc' ], 'mediaImages');
    });

    // Other tests
    t.test('[Other]', function onOther (t) {
      t.plan(4);

      // t.deepEqual(data.otherUpdates, 23, 'otherUpdates');
      t.deepEqual(data.otherComments, 15831, 'otherComments');
      t.deepEqual(typeof data.otherProjectsCreated, 'number', 'otherProjectsCreated');

      // Frequently changes, test type
      t.deepEqual(typeof data.otherProjectsBacked, 'number' , 'otherProjectsBacked');
      t.deepEqual(data.otherWebsiteURL, 'http://www.getpebble.com', 'otherWebsiteURL');
    });

    // Pledges tests
    t.test('[Pledges]', function onPledges (t) {
      t.plan(14);

      t.deepEqual(data.pledgesNumPledges, 11, 'pledgesNumPledges');
      t.deepEqual(data.pledgesNumLimited, 10, 'pledgesNumLimited');
      t.deepEqual(data.pledgesAmounts, [ 1, 99, 115, 125, 220, 235, 240, 550, 1000, 1250, 10000 ], 'pledgesAmounts');

      // Individual pledge
      var pledge = data.pledgesData[1];

      // Pledge specific tests
      t.deepEqual(pledge.amount, 99, 'amount');
      t.deepEqual(pledge.numBackers, 200, 'numBackers');
      t.deepEqual(pledge.pledgePercentage, 0.0029, 'pledgePercentage');
      t.deepEqual(pledge.estimatedDelivery, '2012-09-01', 'estimatedDelivery');
      t.deepEqual(pledge.estimatedDeliveryISO, '2012-09-01T00:00:00.000Z', 'estimatedDeliveryISO');
      t.deepEqual(pledge.description, 'EARLY BIRDS Help us get started! One Jet Black Pebble watch. This watch will retail for more than $150. Free shipping to USA. (Add $10 for shipping to Canada, $15 for international shipping.)', 'description')
      t.deepEqual(pledge.limited, true, 'limited');
      t.deepEqual(pledge.numLeft, Infinity, 'numLeft');
      t.deepEqual(pledge.numWords, 33, 'numWords');
      t.deepEqual(pledge.numAllCaps, 3, 'numAllCaps');
      t.deepEqual(pledge.soldOut, true, 'soldOut');
    });

  });

});
