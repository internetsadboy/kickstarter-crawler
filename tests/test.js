'use strict';


var assert = require('assert'),
    colors = require('colors'),
		KS = require('../index');


var crawler, config;

config = {
  //url:'https://www.kickstarter.com/projects/681802762/moonraker-new-recording',
  //url: 'https://www.kickstarter.com/projects/294531965/outdoor-public-education-centre-and-urban-garden',
  //url:'https://www.kickstarter.com/projects/597507018/pebble-e-paper-watch-for-iphone-and-android',
  //url: 'https://www.kickstarter.com/projects/1924218528/the-billion-dollar-hippie',
	url: 'https://www.kickstarter.com/projects/maxtemkin/philosophy-posters',
	fields: ['general', 'location', 'funding', 'time', 'media', 'other', 'pledges']
};

crawler = new KS.project(config);


crawler.request(function onRequest (err, data) {

	if (err) { throw err; }

	console.log(data)
	console.log('*** TESTS PASSED ***\n'.cyan);

	// Test general methods
	assert.deepEqual(data.generalTitle, 'Philosophy Posters', '[FUNCTION] generalTitle'.red);
	assert.deepEqual(data.generalCreator, 'Max Temkin', '[FUNCTION] generalCreator'.red);
	assert.deepEqual(data.generalCategory, 'Design', '[FUNCTION] generalCategory'.red);
	assert.deepEqual(data.generalSubCategory, 'Graphic Design', '[FUNCTION] generalSubCategory'.red);

	assert.deepEqual(data.generalProjectURL,
									'https://www.kickstarter.com/projects/maxtemkin/philosophy-posters',
									'[FUNCTION] generalProjectURL'.red);

	assert.deepEqual(data.generalCreatorURL,
									'https://www.kickstarter.com/projects/maxtemkin/philosophy-posters/creator_bio',
									'[FUNCTION] generalCreatorURL'.red);

	assert.deepEqual(data.generalAvatarURL,
									'https://s3.amazonaws.com/ksr/avatars/21469/JanaAvatar_big.small.jpg?1348789612',
									'[FUNCTION] generalAvatarURL'.red);

	assert.deepEqual(data.generalVideoURL,
									'https://d2pq0u4uni88oo.cloudfront.net/projects/71739/video-84680-h264_high.mp4',
									'[FUNCTION] generalVideoURL'.red);

	// Log successful tests
	console.log('[8/8] General'.green);

	// Test location methods
	assert.deepEqual(data.locationCity, 'Chicago', '[FUNCTION] locationCity'.red);
	assert.deepEqual(data.locationState, 'IL', '[FUNCTION] locationState'.red);
	assert.deepEqual(data.locationCountry, 'US', '[FUNCTION] locationCountry'.red);

	// Log successful tests
	console.log('[3/3] Location'.green);

	// Test funding methods
	assert.deepEqual(data.fundingDollarsRaised, 41167.74, '[FUNCTION] fundingDollarsRaised'.red);
	assert.deepEqual(data.fundingGoal, 2000, '[FUNCTION] fundingGoal'.red);
	assert.deepEqual(data.fundingPercentRaised, 2058.39, '[FUNCTION] fundingPercentRaised'.red)
	assert.deepEqual(data.fundingCurrency, 'USD', '[FUNCTION] fundingCurrency'.red);
	assert.deepEqual(data.fundingSuccessful, true, '[FUNCTION] fundingSuccessful'.red);
	assert.deepEqual(data.fundingBackers, 1393, '[FUNCTION] fundingBackers'.red);

	// Log successful tests
	console.log('[6/6] Funding'.green);

	// Test time methods
	assert.deepEqual(data.timeNumDays, 30, '[FUNCTION] timeNumDays'.red);
	assert.deepEqual(data.timeStart, 1333555639000, '[FUNCTION] timeStart'.red);
	assert.deepEqual(data.timeEnd, 1336147639000, '[FUNCTION] timeEnd'.red);

	// Log successful tests
	console.log('[3/3] Time'.green);

	// Test media methods
	assert.deepEqual(data.mediaNumImages, 0, '[FUNCTION] mediaNumImages');
	assert.deepEqual(data.mediaImages, [], '[FUNCTION] mediaImages');

	// Log successful tests
	console.log('[2/2] Media'.green);

  // Test other methods
  assert.deepEqual(data.otherUpdates, 23, '[FUNCTION] otherUpdates');
  assert.deepEqual(data.otherComments, 174, '[FUNCTION] otherComments');
  assert.deepEqual(data.otherProjectsCreated, 5, '[FUNCTION] otherProjectsCreated');
  assert.deepEqual(data.otherProjectsBacked, 186, '[FUNCTION] otherProjectsBacked');
  assert.deepEqual(data.otherWebsiteURL, 'http://www.Maxistentialism.com', '[FUNCTION] otherWebsiteURL');

  // Log successful tests
  console.log('[5/5] Other'.green);

});
