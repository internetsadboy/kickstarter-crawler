#!/usr/bin/env node

var ks = require('./ks')

var agrs = process.argv.slice(1)
if(args.length !== 0) {
  var url = args.shift()
  var fields = []
  if(args.length == 0) {
    var i = 0
    while(i++ < args.length) fields.push(args.shift())
  }
  var project = new ks.project({
    url:url,
    fields:fields
  })
  project.request(function(err,data) {
    if(err) throw err
    console.log(data)
  })
}
