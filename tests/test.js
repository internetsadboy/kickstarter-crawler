var test = require('tape');
var colors = require('colors');
var ks = require('../ks');
var project = new ks.project({
	url:'https://www.kickstarter.com/projects/597507018/pebble-e-paper-watch-for-iphone-and-android',
	fields:['general','time','funding','location','other','facebook','media','pledges'],
	log:false
});

test('kickstarter-crawl *stuff*'.green, function(t) {
	t.plan(36);
	project.request(function(err, data) {
		if(err) throw err;
		t.deepEqual(data['general_title'], 'Pebble: E-Paper Watch for iPhone and Android');
		t.deepEqual(data['general_creator'], 'Pebble Technology');
		t.deepEqual(data['general_parentCategory'], 'Design');
		t.deepEqual(data['general_subCategory'], 'Product Design');
		t.deepEqual(data['general_avatar'], 'https://s3.amazonaws.com/ksr/avatars/469081/icon.small.jpg?1334094010');
		t.deepEqual(data['general_projectUrl'], 'http://www.kickstarter.com/projects/597507018/pebble-e-paper-watch-for-iphone-and-android');
		t.deepEqual(data['general_creatorUrl'], 'http://www.kickstarter.com/projects/597507018/pebble-e-paper-watch-for-iphone-and-android/creator_bio');
		t.deepEqual(data['time_days'], 37.917314814814816);
		t.deepEqual(data['time_start'], 1334120344000);
		t.deepEqual(data['time_end'], 1337396400000);
		t.deepEqual(data['funding_dollarsRaised'], 10266845.74);
		t.deepEqual(data['funding_fundingGoal'], 100000.0);
		t.deepEqual(data['funding_percentRaised'], 10266.85);
		t.deepEqual(data['funding_currency'], 'USD');
		t.deepEqual(data['funding_successful'], true);
		t.deepEqual(data['funding_backers'], 68929);
		t.deepEqual(data['location_city'], 'palo alto');
		t.deepEqual(data['location_state'], 'ca');
		t.deepEqual(data['location_country'], 'usa');
		t.deepEqual(data['other_updates'], 52);
		t.deepEqual(data['other_comments'], 15804);
		t.deepEqual(data['other_projectsCreated'], 1);
		t.deepEqual(data['other_projectsBacked'], 52);
		t.deepEqual(data['other_websiteLink'], 'http://www.getpebble.com');
		t.deepEqual(data['other_websiteName'], 'getpebble');
		t.deepEqual(data['facebook_connected'], true);
		t.deepEqual(data['facebook_name'], 'Eric Migicovsky');
		t.deepEqual(data['facebook_link'], 'https://www.facebook.com/122600213');
		t.deepEqual(data['facebook_numFriends'], 847);
		t.deepEqual(data['media_numPictures'], 14);
		t.deepEqual(data['pledges_number'], 11);
		t.deepEqual(data['pledges_limited'], false);
		t.deepEqual(data['pledges_percentLimited'], 0.00);
		t.deepEqual(data['pledges_amounts'],'1 99 115 125 220 235 240 550 1000 1250 10000');
		t.deepEqual(data['media_pictures'], ['https://s3.amazonaws.com/ksr/projects/111694/photo-main.jpg?1397775461',
		      'https://s3.amazonaws.com/ksr/assets/001/050/169/d4444d863d4dd7f9ff333a6f0f12b94a_large.jpg?1381463121',
		      'https://s3.amazonaws.com/ksr/assets/001/050/170/44ceedb61fa1de6b0a98f838620c1345_large.jpg?1381463122',
		      'https://s3.amazonaws.com/ksr/assets/001/050/171/ddba8e25abf0d24a174e6f0e0e041dc3_large.jpg?1381463124',
		      'https://s3.amazonaws.com/ksr/assets/001/050/172/84fbcdd37830c2a437cf6430675c9382_large.jpg?1381463125',
		      'https://s3.amazonaws.com/ksr/assets/001/050/173/b9dc587dd191cbaecac2d43e27103f9b_large.jpg?1381463126',
		      'https://s3.amazonaws.com/ksr/assets/001/050/174/cc54c32abecd4d8083b2eb79e62222a0_large.jpg?1381463127',
		      'https://s3.amazonaws.com/ksr/assets/001/050/175/76c95a4cd4d5d3b64e5488594bd73e7a_large.jpg?1381463129',
		      'https://s3.amazonaws.com/ksr/assets/001/050/176/31f84589e227fd118a37b4be2b42a7d3_large.jpg?1381463130',
		      'https://s3.amazonaws.com/ksr/assets/001/050/177/b47bd30276886aca166f1600d6341f6c_large.jpg?1381463132',
		      'https://s3.amazonaws.com/ksr/assets/001/050/178/81dca91c61c1ceab2c480865d6e37cdf_large.jpg?1381463133',
		      'https://s3.amazonaws.com/ksr/assets/001/050/179/28d6814f309ea289f847c69cf91194c6_large.gif?1381463134',
		      'https://s3.amazonaws.com/ksr/avatars/469081/icon.small.jpg?1334094010' ]);
		t.skip(data['pledges_data'], { 0: 
																	  { amount: 1,
																	    num_backers: 2615,
																	    pledge_percentage: 3.79,
																	    delivery_month: 'Sep',
																	    delivery_year: 2012,
																	    num_words: 37,
																	    words: [Object],
																	    num_all_caps: 0 },
																	 1: 
															      { amount: 99,
															        num_backers: 200,
															        pledge_percentage: 0.29,
															        delivery_month: 'Sep',
															        delivery_year: 2012,
															        num_words: 33,
															        words: [Object],
															        num_all_caps: 3 },
															     2: 
															      { amount: 115,
															        num_backers: 40803,
															        pledge_percentage: 59.20,
															        delivery_month: 'Sep',
															        delivery_year: 2012,
															        num_words: 19,
															        words: [Object],
															        num_all_caps: 1 },
															     3: 
															      { amount: 125,
															        num_backers: 14350,
															        pledge_percentage: 20.82,
															        delivery_month: 'Sep',
															        delivery_year: 2012,
															        num_words: 30,
															        words: [Object],
															        num_all_caps: 1 },
															     4: 
															      { amount: 220,
															        num_backers: 3800,
															        pledge_percentage: 5.51,
															        delivery_month: 'Sep',
															        delivery_year: 2012,
															        num_words: 19,
															        words: [Object],
															        num_all_caps: 1 },
															     5: 
															      { amount: 235,
															        num_backers: 100,
															        pledge_percentage: 0.15,
															        delivery_month: 'Aug',
															        delivery_year: 2012,
															        num_words: 52,
															        words: [Object],
															        num_all_caps: 4 },
															     6: 
															      { amount: 240,
															        num_backers: 4925,
															        pledge_percentage: 7.15,
															        delivery_month: 'Sep',
															        delivery_year: 2012,
															        num_words: 30,
															        words: [Object],
															        num_all_caps: 1 },
															     7: 
															      { amount: 550,
															        num_backers: 900,
															        pledge_percentage: 1.31,
															        delivery_month: 'Sep',
															        delivery_year: 2012,
															        num_words: 32,
															        words: [Object],
															        num_all_caps: 3 },
															     8: 
															      { amount: 1000,
															        num_backers: 482,
															        pledge_percentage: 0.70,
															        delivery_month: 'Sep',
															        delivery_year: 2012,
															        num_words: 32,
															        words: [Object],
															        num_all_caps: 3 },
															     9: 
															      { amount: 1250,
															        num_backers: 20,
															        pledge_percentage: 0.03,
															        delivery_month: 'Sep',
															        delivery_year: 2012,
															        num_words: 54,
															        words: [Object],
															        num_all_caps: 3 },
															     10: 
															      { amount: 10000,
															        num_backers: 31,
															        pledge_percentage: 0.04,
															        delivery_month: 'Sep',
															        delivery_year: 2012,
															        num_words: 34,
															        words: [Object],
															        num_all_caps: 4 } } );
	});	  
});