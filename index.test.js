const kickstarterCrawler = require('./index');
const assert = require('assert');


describe('Project: CLASSIC LEGACY', () => {
  it('should return without errors', () => {
    const url = 'https://www.kickstarter.com/projects/maxtemkin/philosophy-posters';
    let result = kickstarterCrawler(url);
    result.then((data) => {
      assert.deepStrictEqual(data, {
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
      });
    });
  });
});

describe('Project: REWARD NOT AVAILABLE', () => {
  it('should return pledges[amount, backer] without errors', () => {
    const url = 'https://www.kickstarter.com/projects/jeffrichards/tesla-vs-cthulhu-the-nightmare-of-desolation-sound/';
    let result = kickstarterCrawler(url);
    result.then((data) => {
      assert.deepStrictEqual(data, {
        title: 'Tesla vs Cthulhu - The Nightmare of Desolation Sound',
        creator: 'Jeff Richards',
        description: "Nikola Tesla, the greatest inventor in history, faces off against the nightmarish creatures of H.P. Lovecraft's Cthulhu Mythos!",
        category: 'Shorts',
        location: [ 'Vancouver', 'Canada' ],
        duration: 32,
        startdate: 'Sep 9, 2013',
        enddate: 'Oct 12, 2013',
        funding: 9901,
        goal: 8500,
        backers: 164,
        pledges: [
          [ 1, 11 ],   [ 5, 9 ],
          [ 10, 15 ],  [ 25, 72 ],
          [ 50, 18 ],  [ 100, 6 ],
          [ 100, 0 ],  [ 150, 9 ],
          [ 200, 2 ],  [ 250, 2 ],
          [ 250, 1 ],  [ 250, 0 ],
          [ 500, 1 ],  [ 750, 0 ],
          [ 1000, 1 ], [ 50, 1 ]
        ],
        thumbnail: 'https://ksr-ugc.imgix.net/assets/011/559/706/db220c1c78da500e0cbde7eb5a3fb007_original.png?ixlib=rb-2.1.0&crop=faces&w=1552&h=873&fit=crop&v=1463684471&auto=format&frame=1&q=92&s=9f45aaac948be84947d7123750d2a2ed',
        project_url: 'https://kickstarter.com/projects/jeffrichards/tesla-vs-cthulhu-the-nightmare-of-desolation-sound',
        videoDuration: '01:22'
      });
    });
  });
});
