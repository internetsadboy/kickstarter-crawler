# Getting started
```javascript
const kickstarterCrawler = require('kickstarter-crawler');

const url = 'https://www.kickstarter.com/projects/maxtemkin/philosophy-posters';
let result = kickstarterCrawler(url);
result.then((data) => console.log(data));

// output
{
  title: 'Philosophy Posters',
  creator: 'Max Temkin',
  description: 'Ten giant philosophy posters with big ideas presented simply.',
  category: 'Graphic Design',
  location: [ 'Chicago', 'IL' ],
  duration: '30',
  startdate: 'Apr 4, 2012',
  enddate: 'May 4, 2012',
  funding: '$41,167',
  goal: '$2,000',
  backers: '1,393'
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
