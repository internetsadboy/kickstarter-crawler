# Getting started
```javascript
const kickstarterCrawler = require('kickstarter-crawler');

// kickstarter project url
const URL = 'https://www.kickstarter.com/projects/maxtemkin/philosophy-posters/'

// returns promise
const result = kickstarterCrawler(URL);
result.then((data) => console.log(data));


// output
{
  title: 'Philosophy Posters',
  creator: 'Max Temkin',
  description: 'Ten giant philosophy posters with big ideas presented simply.',
  category: 'Graphic Design',
  location: [ 'Chicago', 'IL' ],
  duration: 30,
  startdate: 'Apr 4, 2012',
  enddate: 'May 4, 2012',
  funding: 41167,
  goal: 2000,
  backers: 1393,
  pledges: [ [ 20, 1003 ], [ 30, 359 ] ],
  thumbnail: 'https://ksr-ugc.imgix.net/assets/011/314/328/15f265a2407f6dcb311ad61bad886b01_original.jpg?ixlib=rb-2.1.0&crop=faces&w=1552&h=873&fit=crop&v=1463680857&auto=format&frame=1&q=92&s=c787b7ea241aefb1f14a5acf9b939125',
  project_url: 'https://kickstarter.com/projects/maxtemkin/philosophy-posters',
  videoDuration: '02:08'
}

```

# Insallation
```
npm i kickstarter-crawler
```

# Test
```
npm run test
```
