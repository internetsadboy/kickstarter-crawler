'use strict';

var Queue = require('../lib/queue'),
    test = require('tape');


test('[Queue] Unit Tests', function (t) {

  t.plan(6);

  // Initialize queue
  var queue = Queue();

  // Test enqueue
  t.deepEqual(queue.enqueue(1), undefined, '#enqueue(n)');
  t.deepEqual(queue.enqueue(2), undefined, '#enqueue(n)');

  // Test size
  t.deepEqual(queue.size(), 2, '#size()');

  // Test toArray
  t.deepEqual(queue.toArray(), [1, 2], '#toArray()');

  // Test dequeue
  t.deepEqual(queue.dequeue(), 1, '#dequeue()');

  // Test isEmpty
  t.deepEqual(queue.isEmpty(), false, '#isEmpty()');

});
