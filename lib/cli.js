#!/usr/bin/env node

var ks = require('../index')
  , colors = require('colors')
  , args = process.argv.slice(2)
  , parse = require('url').parse
  , version = require('../package.json')['version'];

// no args
if(args.length === 0) {
  help();
}

// options
if(args.length === 1) {
  var command = args[0].split('\\s+')[0];
  switch(command) {
    case '-v':
      console.log(version);
      break;
    case '-h':
      help();
      break;
    case '-e':
      example();
      break;
    default:
      break;
  }
}

// verify url
var isHttp;
if(args[0]) {
  isHttp = parse(args[0]).protocol === 'http:' || parse(args[0]).protocol === 'https:';
}

// crawl
if(args.length >= 1 && isHttp) {
  var url = args.shift();
  var fields = [];
  if(args.length !== 0) {
    var i = -1;
    while(i++ < args.length-1) {
      var field = args[i].toLowerCase();
      var fs = getFields();
      if(fs[field]) fields.push(args[i]);
    }
  } else {
    fields = Object.keys(getFields());
  }
  var project = new ks.project({
    url:url,
    fields:fields
  });
  project.request(function(err,data) {
    if(err) throw err;
    console.log('data-points: '+Object.keys(data).length);
    console.log(data);
  });
}

function help() {
  console.log('-------------------------');
  console.log(' kickstarter-crawler cli');
  console.log('-------------------------\n');
  console.log(' Usage: ks <url> <fields>\n');
  console.log('  <url>');
  console.log('     • kickstarter project url');
  console.log('  <fields>');
  console.log('     • general   • time');
  console.log('     • funding   • other');
  console.log('     • pledges   • media');
  console.log('     • facebook  • location');
  console.log('\n * leaving fields undefined will fetch all of them\n');
  console.log(' ks -v   version');
  console.log(' ks -h   help');
  console.log(' ks -e   example');
  console.log('\nkickstarter-crawler@'+version);
}

function example() {
  process.stdout.write('ks ');
  process.stdout.write('https://www.kickstarter.com/projects/maxtemkin/philosophy-posters ');
  process.stdout.write('general location\n');
}

function getFields() {
  return {
    general: true,
    location: true,
    funding: true,
    time: true,
    other: true,
    facebook: true,
    media: true,
    pledges: true
  };
}
