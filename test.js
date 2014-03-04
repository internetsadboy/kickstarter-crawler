var ks = require('./ks'),
		options = {
			//url: 'http://www.kickstarter.com/projects/1924218528/the-billion-dollar-hippie',
	    url: 'http://www.kickstarter.com/projects/maxtemkin/philosophy-posters'
	    //fields: ['general_title', 'general_creator']
		};
var project = new ks.project(options);

// test location fetch
project.getLocation().getFunding().getGeneral().getTime(function(err, data) {
	if(err) throw err;
	console.log(data);
});


/*
project.getPledgesData().getPledgeAmounts().getNumPledges().limitedPledges().getNumSoldOut().getPercentLimited().getPercentSoldOut(function(err, data) {
	if(err) throw err;
	console.log(data);
})
/*
// test media
project.getNumPictures().getPictures(function(err, data) {
	if(err) throw err;
	console.log(data);
})
/*
// test other
project.getNumUpdates().getNumComments().getNumProjectsCreated().getNumProjectsBacked().getWebsiteLink().getWebsiteName(function(err, data) {
	if(err) throw err;
	console.log(data);
})
/*
// test fb
project.getFacebookConnected().getFacebookName().getFacebookLink().getNumFacebookFriends(function(err, data) {
	if(err) throw err;
	console.log(data);
})

/*
// test funding 
project.getDuration().getStartTime().getEndTime(function(err, data) {
	if(err) throw err;
	console.log(data);
});
/*
// test funding data
project.getDollarsRaised().getFunding().getPercentRaised().getSuccess().getCurrency(function(err, data) {
	if(err) throw err;
	console.log(data);
})

/*
// fetch location data
project.getCountry().getState().getCity(function(err, data) {
	if(err) throw err;
	console.log(data);
});




project.fetchData(function(err, data) {
	if(err) throw err;
	console.log(data);
});


// test getData() arb vals
var array = ['title', 'creator','subCategory'];

project.getData(array, function(err, data) {
	if(err) throw err;
	console.log(data);
})

/*
project.getGeneral(function(err, data) {
	if(err) throw err;
	console.log(data);
});
/*
project.getProjectVideo().getCreatorUrl().getProjectUrl().getAvatar().getSubCategory().getParentCategory().getCreator().getTitle(function(err, data) {
	if(err) throw err;
	console.log(data);
})*/