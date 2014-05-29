#!/usr/bin/env node

var ks = require('./ks')
  , colors = require('colors')
  , args = process.argv.slice(2)
  , parse = require('url').parse

// no args
if(args.length === 0) {
  help()
}

// options
if(args.length === 1) {
  var command = args[0].split('\\s+')[0]
  switch(command) {
    case '-v':
      console.log(require('./package.json')['version'])
      break
    case '-h':
      help()
      break
    case '-e':
      example()
      break
    default:
      break
  }
}

// verify url
var isHttp
if(args[0]) {
  isHttp = parse(args[0]).protocol === 'http:' || parse(args[0]).protocol === 'https:'
}

// crawl
if(args.length >= 1 && isHttp) {
  var url = args.shift()
  var fields = []
  if(args.length !== 0) {
    var i = -1
    while(i++ < args.length-1) {
      var field = args[i].toLowerCase()
      var fs = getFields()
      if(fs[field]) fields.push(args[i])
    }
  }
  var project = new ks.project({
    url:url
  //  fields:fields
  })
  project.request(function(err,data) {
    if(err) throw err
    console.log('data-points: '+Object.keys(data).length)
    console.log(data)
  })
}

function help() {
  console.log('-------------------------')
  console.log(' kickstarter-crawler cli')
  console.log('-------------------------')
  console.log(' usage: ks <url> <fields>')
  console.log(' note:  leaving fields blank will fetch all fields')
  console.log(' options:')
  console.log('   -v version')
  console.log('   -h help')
  console.log('   -e example')
}

function example() {
  process.stdout.write('ks ')
  process.stdout.write('https://www.kickstarter.com/projects/maxtemkin/philosophy-posters ')
  process.stdout.write('general location\n')
}

function getFields() {
  return {
    "general":true,
    "location":true,
    "funding":true,
    "media":true,
    "other":true,
    "pledges":true,
    "facebook":true,
    "time":true
  }
}
