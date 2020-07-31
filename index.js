const cheerio = require('cheerio');
const axios = require('axios');


module.exports = async function kickstarterCrawler(url) {
  try {
    let res = await axios.get(url);

    if (res.data) {
      let data = parseHTML(res);
      return data;
    }
  } catch(err) {
    console.error(err);
  }
}

function parseHTML(res) {
  const data = {};

  // parse html ie "load"
  const $ = cheerio.load(res.data);

  const was_cancelled = $('#main_content').hasClass('Campaign-state-canceled');

  const title =
    $('.project-profile__title')
      .eq(0)
      .text()
      .trim();

  const creator =
    $('.hero__link')
      .eq(1)
      .text()
      .trim();

  const description =
    $('.project-profile__blurb')
      .text()
      .trim();

  // Sometimes kickstarter has a "projects we love" section before category/location
  const has_flag = $('.NS_projects__category_location').children().length === 3
  const category_location_offset = has_flag ? 1 : 0;

  // leave unstructured (ie US vs international formatting)
  const location =
    $('.NS_projects__category_location a')
      .eq(category_location_offset)
      .text()
      .trim()
      .split(', ');

  const category =
    $('.NS_projects__category_location a')
      .eq(category_location_offset + 1)
      .text()
      .trim();

  const duration =
    $('.NS_campaigns__funding_period .f5')
      .text()
      .trim()
      .split('\n')[1]
      .replace(/[^0-9]/g, '');

  const startdate =
    $('.NS_campaigns__funding_period time')
      .eq(0)
      .text()
      .trim();

  const enddate =
    $('.NS_campaigns__funding_period time')
      .eq(1)
      .text()
      .trim();

  const funding =
    $('.money')
    .eq(1)
    .text();

  const goal =
    $('.money')
      .eq(2)
      .text();

  const backers =
    $('h3.mb0')
      .text()
      .trim()
      .split('\n')[2];

  data.title = title;
  data.creator = creator;
  data.description = description;
  data.category = category;
  data.location = location;
  data.duration = duration;
  data.startdate = startdate;
  data.enddate = enddate;
  data.funding = funding;
  data.goal = goal;
  data.backers = backers;

  const n = $('ol li .pledge__backer-stats').children().length;
  let pledges = [];

  for (let i = 0; i < n; i++) {
    let amount =
      $('ol li .pledge__amount')
        .eq(i)
        .text();

    amount = amount && amount.match(/[0-9]{2,}/)[0];

    let backers =
      $('ol li .pledge__backer-stats')
        .eq(i)
        .text();

    backers = backers && backers.replace(/[^0-9]/g, '');

    pledges.push([Number(amount), Number(backers)]);
  }

  data.pledges = pledges;

  return data;
}
