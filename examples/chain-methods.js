/*
 * example
 * =======
 *   - chaining methods
 *   - pass the callback(err,data) to the last method
 * output
 * ======
 * { general_creator: 'Max Temkin',
 *   location_city: 'chicago',
 *   funding_dollarsRaised: 41167.74,
 *   general_category: 'Design' }
 */

var ks = require('kickstarter-crawler')
var options = {
  url:'https://www.kickstarter.com/projects/maxtemkin/philosophy-posters'
}
var project = new ks.project(options)
project
  .getCreator()
  .getCity()
  .getDollarsRaised()
  .getCategory(function(err,data) {
    if(err) throw err
    console.log(data)
  })
