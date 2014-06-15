var request = require('request')
  , cheerio = require('cheerio')
  , utils = require('./utils')
  , colors = require('colors')
  , cat = require('unix-cat')
  , url = require('url')
  , Queue = require('./queue')
  , base_url = 'http://www.kickstarter.com'
  , FIELDS = utils.fields()
  , log = false
  , hits = false

module.exports = Project

function Project(options) {
  this.url = options != undefined ? options.url || undefined : undefined
  this.fields = new Queue()
  if(options.log) log = true
  if(options.hits) hits = true
  if(options.fields) {
    for(var i in options.fields) {
      switch(options.fields[i]) {
        case 'general':
          var general = FIELDS.general
          for(var i in general) this.fields.enqueue(general[i])
          break
        case 'location':
          var location = FIELDS.location
          for(var i in location) this.fields.enqueue(location[i])
          break
        case 'funding':
          var funding = FIELDS.funding
          for(var i in funding) this.fields.enqueue(funding[i])
          break
        case 'time':
      	  var time = FIELDS.time
      	  for(var i in time) this.fields.enqueue(time[i])
      	  break
      	case 'facebook':
      	  var facebook = FIELDS.facebook
      	  for(var i in facebook) this.fields.enqueue(facebook[i])
      	  break
      	case 'other':
          var other = FIELDS.other
          for(var i in other) this.fields.enqueue(other[i])
          break
        case 'media':
          var media = FIELDS.media
      	  for(var i in media) this.fields.enqueue(media[i])
      	  break
      	case 'pledges':
      	  var pledges = FIELDS.pledges
      	  for(var i in pledges) this.fields.enqueue(pledges[i])
      	  break
      	default:
      	  this.fields.enqueue(options.fields[i])
          break
      }
    }
  }
}

var data_points = {
  general_title: function(html) {
    var $ = cheerio.load(html)
    return $('#project-header .title a').eq(0).text()
  },
  general_creator: function(html) {
    var $ = cheerio.load(html)
    return $('#project-header #name').text()
  },
  general_category: function(html) {
    var $ = cheerio.load(html)
    return $('.category').attr('data-project-parent-category')
  },
  general_subCategory: function(html) {
    var $ = cheerio.load(html)
    return $('.category').text().trim()
  },
  general_avatar: function(html) {
    var $ = cheerio.load(html)
    return $('.avatar-small').attr('src')
  },
  general_projectUrl: function(html) {
    var $ = cheerio.load(html)
    return base_url+$('#project-header .title a').eq(0).attr('href')
  },
  general_creatorUrl: function(html) {
    var $ = cheerio.load(html)
    return base_url+$('#name').attr('href')
  },
  general_projectVideo: function(html) {
    var $ = cheerio.load(html)
    return $('#video-section div').attr('data-video')
  },
  location_city: function(html) {
    var $ = cheerio.load(html)
    return $('.location a').eq(0).text().trim().toLowerCase().split(', ')[0]
  },
  location_state: function(html) {
    var $ = cheerio.load(html)
    var data = $('.location a').eq(0).text().trim().toLowerCase().split(', ')[1]
    if(utils.fromTheUS(data)) return data
    else return ''
  },
  location_country: function(html) {
    var $ = cheerio.load(html)
    var data = $('.location a').eq(0).text().trim().toLowerCase().split(', ')[1]
    if(utils.fromTheUS(data)) return 'usa'
    else return $('.location a').eq(0).text().trim().toLowerCase().split(', ')[1]
  },
  funding_dollarsRaised: function(html) {
    var $ = cheerio.load(html)
    return Number($('#pledged').attr('data-pledged'))
  },
  funding_fundingGoal: function(html) {
    var $ = cheerio.load(html)
    return Number($('#pledged').attr('data-goal'))
  },
  funding_percentRaised: function(html) {
    var $ = cheerio.load(html)
    return Number(parseFloat($('#pledged').attr('data-percent-raised')*100).toFixed(2))
  },
  funding_currency: function(html) {
    var $ = cheerio.load(html)
    return $('#pledged data').attr('data-currency')
  },
  funding_successful: function(html) {
    var $ = cheerio.load(html)
    return parseFloat($('#pledged').attr('data-percent-raised')*100).toFixed(2) >= 100
  },
  funding_backers: function(html) {
    var $ = cheerio.load(html)
    return Number($('#backers_count').attr('data-backers-count'))
  },
  time_days: function(html) {
    var $ = cheerio.load(html)
    return parseFloat($('#project_duration_data').attr('data-duration'))
  },
  time_start: function(html) {
    var end = data_points.time_end(html),
    duration = data_points.time_days(html)*1000*60*60*24
    return end - duration
  },
  time_end: function(html) {
    var $ = cheerio.load(html),
    endtime = $('#project_duration_data').attr('data-end_time'),
    date = new Date(endtime)
    return date.getTime()
  },
  facebook_connected: function(html) {
    var $ = cheerio.load(html)
    return $('.creator-details ul li').eq(1).attr('class') === 'facebook-connected'
  },
  facebook_name: function(html) {
    var $ = cheerio.load(html),
    name = $('.creator-details .facebook-connected a').text()
    if(name !== undefined || '') return name
    else if(!data_points.facebook_connected()) return 'facebook not connected'
    else 'error: invalid crawl'
  },
  facebook_url: function(html) {
    var $ = cheerio.load(html),
    link = $('.creator-details .facebook-connected a').attr('href')
    if(link !== undefined || '') return link
    else if(!data_points.facebook_connected()) return 'facebook not connected'
    else 'error: invalid crawl'
   },
  facebook_numFriends: function(html) {
    var $ = cheerio.load(html)
    var numFriends = $('.creator-details .facebook-connected a').next().text().trim().split('\n')[0]
    if(numFriends !== undefined || '') return Number(numFriends)
    else if(!data_points.facebook_connected()) return 'facebook not connected'
    else return 'error: invalid crawl'
  },
  other_updates: function(html) {
    var $ = cheerio.load(html)
    return Number($('#updates_count').attr('data-updates-count'))
  },
  other_comments: function(html) {
    var $ = cheerio.load(html)
    return Number($('#comments_count').attr('data-comments-count'))
  },
  other_projectsCreated: function(html) {
    var $ = cheerio.load(html)
    var projects = $('.creator-details ul li .text').eq(0).text().trim().split('\n')[0].toLowerCase()
    if(projects === 'first created') return 1
    else return Number(projects.split(' ')[0])
  },
  other_projectsBacked: function(html) {
    var $ = cheerio.load(html)
    var data = $('.creator-details .text').eq(0).text().trim().toLowerCase().split('\n')[2]
    return Number(data.split(' ')[0])
  },
  other_websiteUrl: function(html) {
    var $ = cheerio.load(html)
    return $('.creator-details .links a').attr('href')
  },
  other_websiteName: function(html) {
    var $ = cheerio.load(html)
    return $('.creator-details .links a').text().split('.')[0]
  },
  media_numPictures: function(html) {
    var $ = cheerio.load(html),
    count = 0
    var imgs = []
    $('img').each(function(i, elem) {
      if(utils.isHttp($(this).attr('src'))) count++
    })
    return count
  },
  media_pictures: function(html) {
    var $ = cheerio.load(html)
    var parse = url.parse
    var pics = []
    $('img').each(function(i, elem) {
      var url = $(this).attr('src')
      if(utils.isHttp(url)) {
      	pics.push(url)
      }
    })
    return pics
  },
  pledges_number: function(html) {
    var $ = cheerio.load(html)
    return Number($('.NS-projects-rightcol-rewards').attr('data-reward-count'))
  },
  pledges_limited: function(html) {
    var $ = cheerio.load(html),
    count = 0
    $('.limited-number').each(function(i, elem) { count++ })
    return (count === 0) ? false : true
  },
  pledges_percentLimited: function(html) {
    var $ = cheerio.load(html),
    count = 0
    $('.limited-number').each(function(i, elem) { count++ })
    var numLimited = count
    var numPledges = $('.NS-projects-rightcol-rewards').attr('data-reward-count')
    return Number(parseFloat(numLimited/numPledges*100).toFixed(2))
  },
  pledges_amounts: function(html) {
    var $ = cheerio.load(html),
    amounts = []
    $('.NS-projects-rightcol-rewards h5 span').each(function(i, elem) {
      amounts.push(Number($(this).text().trim().replace(/,/g, '').split('$')[1]))
    })
    return amounts
  },
  pledges_data: function(html) {
    var pledgeStuff = 0
    , $ = cheerio.load(html)
    , pledges = {}
    , pledge = {}
    , numBackers
    , totalBackers
    , all_words
    , numPledges = $('.NS-projects-rightcol-rewards').attr('data-reward-count')
    var limitContainer
    for(var i = 0; i < numPledges; i++) {
      // new pledge
      pledge = {}
      // data that's reused in more than 1 pledge computation
      numBackers = $('.NS-projects-rightcol-rewards .num-backers').eq(i).text().trim().split(' ')[0]
      all_words = $('.NS-projects-rightcol-rewards .desc p').eq(i).text().trim().split(' ')
      totalBackers = $('#backers_count').attr('data-backers-count')
      // add pledge properties
      pledge['amount'] = Number($('.NS-projects-rightcol-rewards h5 span').eq(i).text().trim().replace(/,/g, '').split('$')[1])
      pledge['num_backers'] = Number(numBackers)
      pledge['pledge_percentage'] = Number((parseFloat(numBackers/totalBackers)*100).toFixed(2))
      pledge['delivery_month'] = $('.delivery-date').eq(i).text().replace(/\n/g, '').split(':')[1].split(' ')[0]
      pledge['delivery_year'] = Number($('.delivery-date').eq(i).text().replace(/\n/g, '').split(':')[1].split(' ')[1])
      pledge['num_words'] = all_words.length
      pledge['words'] = all_words
      pledge['num_all_caps'] = utils.fetchNumAllCaps(all_words)

      // calculate limits
      limitContainer = $('.NS_backer_rewards__reward').eq(i)
      if (limitContainer.find('.limited-number')[0]) {
          pledge['limit'] = Number(limitContainer.find('.limited-number').text().replace(/\(\d+ left of (\d+)\)/, '$1'))
      } else if (limitContainer.find('.sold-out')[0]) {
          pledge['limit'] = pledge['num_backers']
      }

      // add pledge
      pledges[i] = pledge
    }
  return pledges
  }
}

Project.prototype.getTitle = function(callback) {
  this.fields.enqueue('general_title')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getCreator = function(callback) {
  this.fields.enqueue('general_creator')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getCategory = function(callback) {
  this.fields.enqueue('general_category')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getSubCategory = function(callback) {
  this.fields.enqueue('general_subCategory')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getAvatar = function(callback) {
  this.fields.enqueue('general_avatar')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getProjectUrl = function(callback) {
  this.fields.enqueue('general_projectUrl')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getCreatorUrl = function(callback) {
  this.fields.enqueue('general_creatorUrl')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getProjectVideo = function(callback) {
  this.fields.enqueue('general_projectVideo')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getCity = function(callback) {
  this.fields.enqueue('location_city')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getState = function(callback) {
  this.fields.enqueue('location_state')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getCountry = function(callback) {
  this.fields.enqueue('location_country')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getDollarsRaised = function(callback) {
  this.fields.enqueue('funding_dollarsRaised')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getFundingGoal = function(callback) {
  this.fields.enqueue('funding_fundingGoal')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getPercentRaised = function(callback) {
  this.fields.enqueue('funding_percentRaised')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getCurrency = function(callback) {
  this.fields.enqueue('funding_currency')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getSuccess = function(callback) {
  this.fields.enqueue('funding_successful')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getBackers = function(callback) {
  this.fields.enqueue('funding_backers')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getDays = function(callback) {
  this.fields.enqueue('time_days')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getStartTime = function(callback) {
  this.fields.enqueue('time_start')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getEndTime = function(callback) {
  this.fields.enqueue('time_end')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getFacebookConnected = function(callback) {
  this.fields.enqueue('facebook_connected')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getFacebookName = function(callback) {
  this.fields.enqueue('facebook_name')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getFacebookUrl = function(callback) {
  this.fields.enqueue('facebook_url')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getNumFacebookFriends = function(callback) {
  this.fields.enqueue('facebook_numFriends')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getUpdates = function(callback) {
  this.fields.enqueue('other_updates')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getComments = function(callback) {
  this.fields.enqueue('other_comments')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getProjectsCreated = function(callback) {
  this.fields.enqueue('other_projectsCreated')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getProjectsBacked = function(callback) {
  this.fields.enqueue('other_projectsBacked')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getWebsiteUrl = function(callback) {
  this.fields.enqueue('other_websiteUrl')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getWebsiteName = function(callback) {
  this.fields.enqueue('other_websiteName')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getNumPictures = function(callback) {
  this.fields.enqueue('media_numPictures')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getPictures = function(callback) {
  this.fields.enqueue('media_pictures')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getNumPledges = function(callback) {
  this.fields.enqueue('pledges_number')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.limitedPledges = function(callback) {
  this.fields.enqueue('pledges_limited')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getPledgeAmounts = function(callback) {
  this.fields.enqueue('pledges_amounts')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.getPledgesData = function(callback) {
  this.fields.enqueue('pledges_data')
  if(callback === undefined) return this
  else this.request(callback)
}

Project.prototype.parse = function(body) {
  var project = this
  var successes = {}
  var errors = {}
  var i = project.fields.size()
  // call corresponding methods
  while(i--) {
    var data = project.fields.dequeue()
    if(data_points[data] != undefined) {
      try {
        successes[data] = data_points[data](body)
      } catch(e) {
        errors[data] = e
      }
    } else {
      successes[data] = undefined
      errors[data] = 'not a valid datapoint'
    }
  }
  return { successes: successes, errors: errors }
}

Project.prototype.request = function(callback) {
  var project = this
  // add all fields if undefined
  if(project.fields.isEmpty()) {
    for(var i in FIELDS) project.fields.enqueue(FIELDS[i])
  }
  // crawl
  request(project.url, function(err, res, body) {
    if(!err) {
      // used to store data pts
      var result = project.parse(body)
      // log fancy json
      if(log) utils.toColors(result.successes)
      // return miss-hits json
      if(hits) {
        var h = Object.keys(result.successes).length
        var m = Object.keys(result.errors).length
        var c = (h/(h+m)).toFixed(3)*100
        var d = {
          complete:c,
          miss:result.errors,
          hit:result.successes
        }
        callback(undefined,d)
      } else {
        // return successful data pts only
        callback(undefined,result.successes)
      }
    }
    // request err
    else {
      callback(err, undefined)
    }
  })
}
