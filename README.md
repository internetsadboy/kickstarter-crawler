### kickstarter crawler

1. does some magic
2. bugs that need fixing === facebook, location, and other

### installation

    npm install kickstarter-crawler

#### example

```javascript
var ks = require('./ks');
var options = {
	url:'http://www.kickstarter.com/projects/maxtemkin/philosophy-posters',
	fields:['general','time','funding','media','pledges'],
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
{ general_title: 'Philosophy Posters',
  general_creator: 'Max Temkin',
  general_parentCategory: 'Design',
  general_subCategory: 'Graphic Design',
  general_avatar: 'https://s3.amazonaws.com/ksr/avatars/21469/JanaAvatar_big.small.jpg?1348789612',
  general_projectUrl: 'http://www.kickstarter.com/projects/maxtemkin/philosophy-posters',
  general_creatorUrl: 'http://www.kickstarter.com/projects/maxtemkin/philosophy-posters/creator_bio',
  time_days: 30,
  time_start: 1333555639000,
  time_end: 1336147639000,
  funding_dollarsRaised: '41167.74',
  funding_fundingGoal: '2000.0',
  funding_percentRaised: '2058.39',
  funding_currency: 'USD',
  funding_successful: true,
  funding_backers: '1393',
  media_numPictures: 3,
  media_pictures: 
   [ 'https://s3.amazonaws.com/ksr/projects/71739/photo-main.jpg?1397770297',
     'https://s3.amazonaws.com/ksr/avatars/21469/JanaAvatar_big.small.jpg?1348789612',
     '//secure.quantserve.com/pixel/p-34IbSpw2K94Sg.gif' ],
  pledges_number: '2',
  pledges_limited: false,
  pledges_soldOut: 0,
  pledges_percentLimited: '0.00',
  pledges_percentSoldOut: '0.00',
  pledges_amounts: undefined }
```
