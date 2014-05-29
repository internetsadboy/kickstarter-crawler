var url = require('url')

exports.randomColor = function() {
  var color = ['yellow','white','cyan','magenta','red','green','blue','rainbow','black','greyBG','blackBG','yellowBG','redBG','greenBG','blueBG','cyanBG','magentaBG']
  return color[Math.floor((Math.random()*color.length))];
}

exports.fields = function() {
  return {
    'general': {
      0:'general_title',
      1:'general_creator',
      2:'general_category',
      3:'general_subCategory',
      4:'general_avatar',
      5:'general_projectUrl',
      6:'general_creatorUrl'
    },
    'location': {
      0:'location_city',
      1:'location_state',
      2:'location_country'
    },
    'funding': {
      0:'funding_dollarsRaised',
      1:'funding_fundingGoal',
      2:'funding_percentRaised',
      3:'funding_currency',
      4:'funding_successful',
      5:'funding_backers',
    },
    'time': {
      0:'time_days',
      1:'time_start',
      2:'time_end'
    },
    'media': {
      0:'media_numPictures',
      1:'media_pictures'
    },
    'facebook': {
      0:'facebook_connected',
      1:'facebook_name',
      2:'facebook_url',
      3:'facebook_numFriends'
    },
    'other': {
      0:'other_updates',
      1:'other_comments',
      2:'other_projectsCreated',
      3:'other_projectsBacked',
      4:'other_websiteUrl',
      5:'other_websiteName'
    },
    'pledges': {
      0:'pledges_number',
      1:'pledges_limited',
      2:'pledges_percentLimited',
      3:'pledges_amounts',
      4:'pledges_data'
    }
  };
}

exports.fromTheUS = function(state) {
  state = state.toUpperCase();
  var states = {
    "AL":true,
    "AK":true,
    "AZ":true,
    "AR":true,
    "CA":true,
    "CO":true,
    "CT":true,
    "DE":true,
    "FL":true,
    "GA":true,
    "HI":true,
    "ID":true,
    "IL":true,
    "IN":true,
    "IA":true,
    "KS":true,
    "KY":true,
    "LA":true,
    "ME":true,
    "MD":true,
    "MA":true,
    "MI":true,
    "MN":true,
    "MS":true,
    "MO":true,
    "MT":true,
    "NE":true,
    "NV":true,
    "NH":true,
    "NJ":true,
    "NM":true,
    "NY":true,
    "NC":true,
    "ND":true,
    "OH":true,
    "OK":true,
    "OR":true,
    "PA":true,
    "RI":true,
    "SC":true,
    "SD":true,
    "TN":true,
    "TX":true,
    "UT":true,
    "VT":true,
    "VA":true,
    "WA":true,
    "WV":true,
    "WI":true,
    "WY":true
  };
  return states[state] ? true : false;
}

exports.fetchNumAllCaps = function(array) {
  var count = 0;
  for(var i = 0; i < array.length; i++) {
    var string = array[i].toString();
    var caps = /\b[A-Z]+\b/;
    if(string.match(caps)) {
      count++;
    }
  }
  return count;
}

// two calls: 3 or 4 colors
// if > 1 fields && odd -> call 3, if > 1 fields && even call 4
// assign each key a value (color)
exports.toColors = function(data) {
  var color = {};
  for(var i in data) {
    var prefix = i.split('_')[0];
    if(color[prefix] === undefined) color[prefix] = null;
  }
  if(Object.keys(color).length % 2 === 0) {
    var evenColors = ['magenta','cyan','green','yellow'];
    var j = 0;
    for(var i in color) {
      color[i] = evenColors[j];
      j++;
      if(j === 4) j = 0;
    }
  } else {
    var oddColors = ['magenta','cyan','green'];
    var j = 0;
    for(var i in color) {
      color[i] = evenColors[j];
      j++;
      if(j === 3) j = 0;
    }
  }
  for(var i in data) {
    var prefix = i.split('_')[0];
    switch(prefix) {
      case 'general':
        console.log(i[color[prefix]]['blackBG']+' '+String(data[i])[color[prefix]]);
        break;
      case 'location':
        console.log(i[color[prefix]]['blackBG']+' '+String(data[i])[color[prefix]]);
        break
      case 'funding':
        console.log(i[color[prefix]]['blackBG']+' '+String(data[i])[color[prefix]]);
        break
      case 'time':
        console.log(i[color[prefix]]['blackBG']+' '+String(data[i])[color[prefix]]);
        break;
      case 'other':
        console.log(i[color[prefix]]['blackBG']+' '+String(data[i])[color[prefix]]);
        break;
      case 'media':
        console.log(i[color[prefix]]['blackBG']+' '+String(data[i])[color[prefix]]);
        break;
      case 'pledges':
        console.log(i[color[prefix]]['blackBG']+' '+String(data[i])[color[prefix]]);
        break;
      case 'facebook':
        console.log(i[color[prefix]]['blackBG']+' '+String(data[i])[color[prefix]]);
        break;
    }
  }
}

// validate if a url follows http(s) protocol
exports.isHttp = function(uri) {
  var protocol = url.parse(uri).protocol;
  if(protocol === 'https:' || protocol === 'http:') {
    return true;
  }
  return false;
}
