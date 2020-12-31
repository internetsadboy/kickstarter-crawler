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
  let data = {};
  let title;
  let creator;
  let description;
  let location;
  let category;
  let duration;
  let funding;
  let backers;
  let goal;
  let startdate;
  let enddate;
  let pledges;

  // parse html ie "load"
  const $ = cheerio.load(res.data);

  const was_cancelled = $('#main_content').hasClass('Campaign-state-canceled');

  if (!was_cancelled) {
    title =
      $('.project-profile__title')
        .eq(0)
        .text()
        .trim();

    creator =
      $('.hero__link')
        .eq(1)
        .text()
        .trim();

    description =
      $('.project-profile__blurb')
        .text()
        .trim();

    // Sometimes kickstarter has a "projects we love" section before category/location
    const has_flag = $('.NS_projects__category_location').children().length === 3
    const category_location_offset = has_flag ? 1 : 0;

    // leave unstructured (ie US vs international formatting)
    location =
      $('.NS_projects__category_location a')
        .eq(category_location_offset)
        .text()
        .trim()
        .split(', ');

    category =
      $('.NS_projects__category_location a')
        .eq(category_location_offset + 1)
        .text()
        .trim();

    duration =
      $('.NS_campaigns__funding_period .f5')
        .text()
        .trim();

    duration = duration && duration.split('\n')[1];
    duration = Number(duration.replace(/[^0-9]/g, ''));

    funding =
      $('.money')
      .eq(1)
      .text();

    funding = funding && Number(funding.replace(/[^0-9]+/g, ''));

    backers =
      $('h3.mb0')
        .eq(1)
        .text();

    backers = backers && Number(backers.replace(/[^0-9]/g, ''));


  } else {
    title = $('.project-name').eq(0).text().trim();
    creator = $('#experimental-creator-bio .mb6 .text-ellipsis').text();
    description = $('.project-description').text();
    category = $('.ml1').eq(1).text();
    location = $('.ml1').eq(2).text().split(', ');
    backers = Number($('.type-28-md span').eq(1).text());
    funding = Number($('.type-28-md span').eq(0).text().replace(/[^0-9]+/g, ''));
  }

  goal =
    $('.money')
      .eq(2)
      .text();

  goal = goal && Number(goal.replace(/[^0-9]+/g, ''));

  startdate =
    $('.NS_campaigns__funding_period time')
      .eq(0)
      .text()
      .trim();

  enddate =
    $('.NS_campaigns__funding_period time')
      .eq(1)
      .text()
      .trim();

  const n = $('ol li .pledge__backer-stats').length;
  pledges = [];

  for (let i = 0; i < n; i++) {
    let amount =
      $('ol li .pledge__amount')
        .eq(i)
        .text();

    amount = amount && amount.match(/[1-9]+[,]*[0-9]*/)
    amount = amount && amount[0]
    amount = amount && amount.replace(/,/, '');

    let backers =
      $('ol li .pledge__backer-stats')
        .eq(i)
        .text();

    backers = backers && backers.replace(/[^0-9]/g, '');
    backers = backers.replace(/,/, '');

    pledges.push([Number(amount), Number(backers)]);
  }

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
  data.pledges = pledges;

  return data;
}
