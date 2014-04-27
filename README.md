### kickstarter-crawler

returns 35 + n data points (where n is the number of pledges)

### Installation

    npm install kickstarter-crawler

### Features
Pass an `options` {Object} argument to an instance of `ks.project` to configure the crawl

`url` {String} kickstarter project url<br>
`fields` {Array} array of project data-fields<br>
* general
* time
* funding
* location
* other
* facebook
* media
* pledges

`log` {Boolean} prints colored results

#### example
```javascript
var ks = require('kickstarter-crawler');
var options = {
  url:'https://www.kickstarter.com/projects/597507018/pebble-e-paper-watch-for-iphone-and-android',
  fields:['general','time','funding','location','other','facebook','media','pledges'],
  log:false
};
var project = new ks.project(options);
project.request(function(err, data) {
  if(err) throw err;
  console.log(data);
});
```

#### output
```javascript
{ general_title: 'Pebble: E-Paper Watch for iPhone and Android',
  general_creator: 'Pebble Technology',
  general_parentCategory: 'Design',
  general_subCategory: 'Product Design',
  general_avatar: 'https://s3.amazonaws.com/ksr/avatars/469081/icon.small.jpg?1334094010',
  general_projectUrl: 'http://www.kickstarter.com/projects/597507018/pebble-e-paper-watch-for-iphone-and-android',
  general_creatorUrl: 'http://www.kickstarter.com/projects/597507018/pebble-e-paper-watch-for-iphone-and-android/creator_bio',
  time_days: 37.917314814814816,
  time_start: 1334120344000,
  time_end: 1337396400000,
  funding_dollarsRaised: 10266845.74,
  funding_fundingGoal: 100000.0,
  funding_percentRaised: 10266.85,
  funding_currency: 'USD',
  funding_successful: true,
  funding_backers: 68929,
  location_city: 'palo alto',
  location_state: 'ca',
  location_country: 'usa',
  other_updates: 52,
  other_comments: 15804,
  other_projectsCreated: 1,
  other_projectsBacked: 52,
  other_websiteLink: 'http://www.getpebble.com',
  other_websiteName: 'getpebble',
  facebook_connected: true,
  facebook_name: 'Eric Migicovsky',
  facebook_link: 'https://www.facebook.com/122600213',
  facebook_numFriends: 847,
  media_numPictures: 14,
  media_pictures: 
   [ 'https://s3.amazonaws.com/ksr/projects/111694/photo-main.jpg?1397775461',
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
     'https://s3.amazonaws.com/ksr/avatars/469081/icon.small.jpg?1334094010' ],
  pledges_number: 11,
  pledges_limited: false,
  pledges_percentLimited: 0.00,
  pledges_amounts: [1, 99, 115, 125, 220, 235, 240, 550, 1000, 1250, 10000],
  pledges_data: 
	{0: 
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
      num_all_caps: 4 } } 
```

### Methods
`request` makes a request to the defined kickstarter url, takes a `callback(err,data)` as an argument<br>
`getTitle` returns the project's title<br>
`getCreator` returns the creator's name<br>
`getParentCategory` returns the project's category<br>
`getSubCategory` returns the project's sub-category<br>
`getAvatar` returns the project's avatar url<br>
`getProjectUrl` returns the project's url<br>
`getCreatorUrl` returns the creator's url<br>
`getDays` returns the project's duration (number of days)<br>
`getStartTime` returns the project's start time<br>
`getEndTime` returns the project's end time<br>
`getDollarsRaised` returns the amount of money raised<br>
`getFundingGoal` returns the project's goal<br>
`getPercentRaised` returns the percent raised<br>
`getCurrency` returns the currency<br>
`getSuccess` returns a success boolean<br>
`getBackers` returns the number of backers<br>
`getCity` returns the city<br>
`getState` returns the state<br>
`getCountry` returns the country<br>
`getUpdates` returns the number of updates<br>
`getComments` returns the number of comments<br>
`getProjectsCreated` returns the number of projects done by the creator<br>
`getProjectsBacked` returns the number of projects backed by the creator<br>
`getWebsiteLink` returns the website url<br>
`getWebsiteName` returns the hostname of the website<br>
`getNumPictures` returns the number of pictures used in the project's profile page<br>
`getPictures` returns an array of pictures used in the project<br>
`getNumPledges` returns the number of pledges<br>
`limitedPledges` returns a boolean indicating if limited pledges were used<br>
`getPledgeAmounts` returns an array of the pledge amounts used<br>
`getPledgesData` returns a nested json of individual pledge data<br>
`getFacebookConnected` returns a boolean indicating if a facebook account was connected<br>
`getFacebookName` returns the facebook name used (if connected)
`getFacebookLink` returns the project's facebook account url<br>
`getNumFacebookFriends` returns the number of facebook friends of the connected account<br>