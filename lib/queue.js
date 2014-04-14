function Queue() {

  this.tail = -1;
  this._queue = [];

  this.enqueue = function(node) {
    if(typeof node !== 'object') {
      this.tail++;
      this._queue[this.tail] = node;
    } else {
      for(var i in node) {
	this.tail++;
	this._queue[this.tail] = node[i];
      }
    }
  }

  this.dequeue = function() {
    var removed = this._queue.shift();
    this.tail--;
    return removed;
  }

  this.size = function() {
    return this.tail + 1;
  }

  this.isEmpty = function() {
    return this.size() === 0;
  }

}

exports.Queue = Queue;
