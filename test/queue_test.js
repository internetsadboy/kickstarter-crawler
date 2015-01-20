'use strict';

var Queue = require('../lib/queue'),
    assert = require('assert');


// Initialize queue
var queue = Queue();

// Test enqueue(node)
assert.deepEqual(queue.enqueue(1), undefined, ['queue.enqueue(1) !== undefined']);
assert.deepEqual(queue.enqueue(2), undefined, ['queue.enqueue(2) !== undefined']);

// Test size
assert.deepEqual(queue.size(), 2, ['queue.size() !== 2']);

// Test toArray
assert.deepEqual(queue.toArray(), [1, 2], ['queue.toArray() !== [1, 2]']);

// Test dequeue
assert.deepEqual(queue.dequeue(), 1, ['queue.dequeue() !== 1']);

// Test isEmpty
assert.deepEqual(queue.isEmpty(), false, ['queue.isEmpty() !== false']);
