'use strict';

var Queue = require('../lib/queue'),
    assert = require('assert');


// initialize queue
var queue = Queue();

// test enqueue(node)
assert.deepEqual(queue.enqueue(1), undefined, ['queue.enqueue(1) !== undefined']);
assert.deepEqual(queue.enqueue(2), undefined, ['queue.enqueue(2) !== undefined']);

// test size()
assert.deepEqual(queue.size(), 2, ['queue.size() !== 2']);

// test toArray()
assert.deepEqual(queue.toArray(), [1, 2], ['queue.toArray() !== [1, 2]']);

// test dequeue()
assert.deepEqual(queue.dequeue(), 1, ['queue.dequeue() !== 1']);

// test isEmpty()
assert.deepEqual(queue.isEmpty(), false, ['queue.isEmpty() !== false']);
