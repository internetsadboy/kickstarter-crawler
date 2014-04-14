exports.randomColor = function() {
  var color = ['yellow','white','cyan','magenta','red','green','blue','rainbow','black','greyBG','blackBG','yellowBG','redBG','greenBG','blueBG','cyanBG','magentaBG']
  return color[Math.floor((Math.random()*color.length))];
}

// pledges_data -> when included returns [object Object]
exports.fields = function() {
  return {
    'general': {
      0:'general_title',
      1:'general_creator',
      2:'general_parentCategory',
      3:'general_subCategory',
      4:'general_avatar',
      5:'general_projectUrl',
      6:'general_creatorUrl'
      //7:'general_projectVideo'
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
      2:'facebook_link',
      3:'facebook_numFriends'
    },
    'other': {
      0:'other_updates',
      1:'other_comments',
      2:'other_projectsCreated',
      3:'other_projectsBacked',
      4:'other_websiteLink',
      5:'other_websiteName'
    },
    'pledges': {
      0:'pledges_number',
      1:'pledges_limited',
      2:'pledges_soldOut',
      3:'pledges_percentLimited',
      4:'pledges_percentSoldOut',
      5:'pledges_amounts',
      //6:'pledges_data' 
    }
  }
}

exports.fromTheUS = function(state) {
  var isFromTheUS = false;
  var states = ["AL","AK","AZ","AR","CA",
                "CO","CT","DE","FL","GA",
                "HI","ID","IL","IN","IA",
                "KS","KY","LA","ME","MD",
                "MA","MI","MN","MS","MO",
                "MT","NE","NV","NH","NJ",
                "NM","NY","NC","ND","OH",
                "OK","OR","PA","RI","SC",
                "SD","TN","TX","UT","VT",
                "VA","WA","WV","WI","WY"];
  for(var i in states) {
    if(states[i] === state.toUpperCase()) {
      isFromTheUS = true;
      break;
    }
  }
  return isFromTheUS;
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

exports.fetchLimitedData = function(data, tempJSON) {
  var stuff = cheerio.load(data);
  stuff('.limited-number').each(function(i, elem) {
    var thingy = stuff(this).text().replace(/\(|\)|/g, '').split(' ');
    var left = thingy[0];
    var total = thingy[3];
    var sold = total - left
    tempJSON.sold = sold;
    tempJSON.total = total;
  })
  var deferred = q.defer();
  deferred.resolve(tempJSON);
  return deferred.promise;
}