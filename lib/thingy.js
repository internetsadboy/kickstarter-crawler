var Thingy = function() {};

module.exports = function() {
  return new Thingy();
}

Thingy.prototype.fromTheUS = function(state) {
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

Thingy.prototype.fetchNumAllCaps = function(array) {
  var count = 0;
  for(var i = 0; i < array.length; i++) {
    var string = array[i].toString();
    var regex = /\b[A-Z]+\b/;
    if(string.match(regex)) {
      count++;        
    } 
  }
  return count;
}

Thingy.prototype.fetchAllCapWords = function(array) {
  var result = [];
  for(var i = 0; i < array.length; i++) {
    var string = array[i].toString();
    var regex = /\b[A-Z]+\b/;
    if(string.match(regex)) {
      result.push(string);
    } 
  }  
  return result;
}

Thingy.prototype.fetchLimitedData = function(data, tempJSON) {
  var stuff = cheerio.load(data);
  stuff('.limited-number').each(function(i, elem) {
    var thingy = stuff(this).text().replace(/\(|\)|/g, '').split(' ');
    var left = thingy[0];
    var total = thingy[3];
    var sold = total - left
    tempJSON.sold = sold;
    tempJSON.total = total;
  });
  var deferred = q.defer();
  deferred.resolve(tempJSON);
  return deferred.promise;
}

exports.Thingy = Thingy;
