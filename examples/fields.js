/*
 * example
 * =======
 *   - single method getFundsRaised()
 *   - pass the method the callback(err,data)
 * output
 * ======
 * { general_title: 'Pebble: E-Paper Watch for iPhone and Android',
 *   general_creator: 'Pebble Technology',
 *   general_category: 'Design',
 *   general_subCategory: 'Product Design',
 *   general_avatar: 'https://s3.amazonaws.com/ksr/avatars/469081/icon.small.jpg?1334094010',
 *   general_projectUrl: 'http://www.kickstarter.com/projects/597507018/pebble-e-paper-watch-for-iphone-and-android',
 *   general_creatorUrl: 'http://www.kickstarter.com/projects/597507018/pebble-e-paper-watch-for-iphone-and-android/creator_bio',
 *   location_city: 'palo alto',
 *   location_state: 'ca',
 *   location_country: 'usa',
 *   funding_dollarsRaised: 10266845.74,
 *   funding_fundingGoal: 100000,
 *   funding_percentRaised: 10266.85,
 *   funding_currency: 'USD',
 *   funding_successful: true,
 *   funding_backers: 68929 }
 */

 var ks = require('kickstarter-crawler');
 var options = {
   url:'https://www.kickstarter.com/projects/597507018/pebble-e-paper-watch-for-iphone-and-android',
   fields:['general','location','funding']
 };
 var project = new ks.project(options);
 project.request(function(err, data) {
   if(err) throw err;
   console.log(data);
 });
