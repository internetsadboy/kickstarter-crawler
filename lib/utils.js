'use strict';


module.exports = {

  fields: function () {
    return {
      'general': {
        0:'generalTitle',
        1:'generalCreator',
        2:'generalCategory',
        3:'generalSubCategory',
        4:'generalAvatarURL',
        5:'generalProjectURL',
        6:'generalCreatorURL',
        7:'generalVideoURL',
        8:'generalDescription'
      },
      'location': {
        0:'locationCity',
        1:'locationState',
        2:'locationCountry'
      },
      'funding': {
        0:'fundingDollarsRaised',
        1:'fundingGoal',
        2:'fundingPercentRaised',
        3:'fundingCurrency',
        4:'fundingSuccessful',
        5:'fundingBackers',
      },
      'time': {
        0:'timeNumDays',
        1:'timeStart',
        2:'timeEnd'
      },
      'media': {
        0:'mediaNumImages',
        1:'mediaImages'
      },
      'other': {
        0:'otherUpdates',
        1:'otherComments',
        2:'otherProjectsCreated',
        3:'otherProjectsBacked',
        4:'otherWebsiteURL'
      },
      'pledges': {
        0:'pledgesNumPledges',
        1:'pledgesNumLimited',
        2:'pledgesAmounts',
        3:'pledgesData'
      }
    };
  },

  isFromTheUS: function (state) {
    var states = [
      'AL', 'AK', 'AZ', 'AR', 'CA',
      'CO', 'CT', 'DE', 'FL', 'GA',
      'HI', 'ID', 'IL', 'IN', 'IA',
      'KS', 'KY', 'LA', 'ME', 'MD',
      'MA', 'MI', 'MN', 'MS', 'MO',
      'MT', 'NE', 'NV', 'NH', 'NJ',
      'NM', 'NY', 'NC', 'ND', 'OH',
      'OK', 'OR', 'PA', 'RI', 'SC',
      'SD', 'TN', 'TX', 'UT', 'VT',
      'VA', 'WA', 'WV', 'WI', 'WY'
    ];

    return states.indexOf(state.toUpperCase()) !== -1;
  },

  getNumAllCaps: function (array) {
    var i, count = 0;

    for (i = 0; i < array.length; i++) {
      var string, caps;

      string = array[i].toString();
      caps = /\b[A-Z]+\b/;

      if (string.match(caps)) { count++; }
    }

    return count;
  }

}
