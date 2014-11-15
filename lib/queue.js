'use strict';


/**
 * Queue
 *
 * FIFO Data Structure
 *
 * @return  {Object}  functor that manipulates internal data members
 */
function Queue () {

  var _tail, _queue;

  _tail = -1;
  _queue = [];

  return {

    /**
     * Insert a node of arbitrary type into the queue
     * @param  {Object} | {Boolean} | {Number} | {String}  node
     */
    enqueue: function (node) {
      _tail++;
      _queue[_tail] = node;
    },

    /**
     * Remove the oldest (first) element in the queue
     * @return  {Object} | {Boolean} | {Number} | {String}  removedNode
     */
    dequeue: function () {
      var removedNode;

      removedNode = _queue.shift();
      _tail--;

      return removedNode;
    },

    /**
     * Return the size of the queue
     * @return  {Integer}
     */
    size: function () {
      return _tail + 1;
    },

    /**
     * Evaluate if the queue is empty
     * @return  {Boolean}
     */
    isEmpty: function () {
      return (_tail === -1) && (_queue.length === 0)
    },

    /**
     * Expose the internal queue (array)
     * @return  {Object}  array
     */
    toArray: function () {
      var array;

      array = _queue;

      return array;
    }

  };

}


module.exports = Queue;
