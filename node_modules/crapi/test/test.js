var crapi = require('../crapi')
  , test = require('tape');
test(function(t) {
  t.plan(2);
  t.deepEqual(crapi.indiegogo['accidental-incest-the-movie'],
   'http://indiegogo.com/projects/accidental-incest-the-movie');
  t.deepEqual(crapi.kickstarter['philosophy-posters'],
    'http://www.kickstarter.com/projects/1200751084/philosophy-posters/');
});
