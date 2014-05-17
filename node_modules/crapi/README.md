## crapi

* crapi enables you to require a crowdfunding data set consisting of 69,294 projects
* currently names and urls are the only supported data points
* data is organized around platforms (kickstarter and indiegogo for now)
* each platform is a json where keys correspond to project names and values to project urls

## installation
    npm install crapi

## examples
find out the number of kickstarter and indiegogo projects
```javascript
var crapi = require('crapi');
console.log('kickstarter '+Object.keys(crapi.kickstarter).length); // kickstarter 61356
console.log('indiegogo '+Object.keys(crapi.indiegogo).length); // indiegogo 7785
```
log all kickstarter projects to the console
```javascript
var crapi = require('crapi');
var projects = crapi.kickstarter;
for(var i in projects) {
  console.log(i+': '+projects[i]); // 61356 lines of utf-8
}
```
fetch a project url by name
```javascript
var crapi = require('crapi');
var oculus = crapi.kickstarter['oculus-rift-step-into-the-game'];
// http://www.kickstarter.com/projects/1523379957/oculus-rift-step-into-the-game
```

## head back to the registry
    npm install kickstarter-crawler
[kickstarter-crawler](https://github.com/ghostsnstuff/kickstarter-crawler) is a module that fetches data when given a kickstarter url
***
let's find out who created the 'philosophy posters' kickstarter project and where it's from
```javascript
var crapi = require('crapi');
var ks = require('kickstarter-crawler');
var opts = {
  url: crapi.kickstarter['philosophy-posters']     // url param for project
};
var project = new ks.project(options);             // create a new project instance
project.getCreator().getCity(function(err, data) { // fetch data
  if(err) throw err;
  console.log(data);
});
```
output
```javascript
{ general_creator: 'Max Temkin',
  location_city: 'chicago' }
```
