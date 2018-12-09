function Node(val, prev = null, next = null) {
  this.val = val;
  this.prev = prev;
  this.next = next;
}

function LinkedList(array, useNodes) {
  this.length = 0;
  this.first = this.last = null;
  if (array) {
    for (var i = 0, n = array.length; i < n; i++) {
      this.push( useNodes ? new Node(array[i]) : array[i] );
    }
    this.length = array.length
  }
}


LinkedList.prototype.forEach = function(block, context) {
    if (!block) return this.enumFor('forEach');
    block = Enumerable.toFn(block);

    var node   = this.first,
        next, i, n;

    for (i = 0, n = this.length; i < n; i++) {
      next = node.next;
      block.call(context, node, i);
      if (node === this.last) break;
      node = next;
    }
    return this;
  };

LinkedList.prototype.at = function(n) {
    if (n < 0 || n >= this.length) return undefined;
    var node = this.first;
    while (n--) node = node.next;
    return node;
  };

LinkedList.prototype.insert = function(val, prev) {
  var n = new Node(val)
  if (prev === null) {
    this.first.prev = n
    n.next = this.first
    this.first = n
  } else {
    n.prev = prev
    n.next = prev.next
    if (prev.next) {
      prev.next.prev = n
    }
    prev.next = n
    if (prev === this.last) {
      this.last = n
    }
  }
  this.length++
  return n
};

LinkedList.prototype.remove = function(node) {
  var prev = node.prev
  var next = node.next
  if (prev) {
    prev.next = next
  }
  if (next) {
    next.prev = prev
  }
  this.length--
  if (node === this.last) {
    this.last = prev
  }
  if (node === this.first) {
    this.first = next
  }
  // if list size <= 1 then error!
};

LinkedList.prototype.push = function(val) {
    var n = new Node(val)
    if (this.first == null) {
      this.first = n
      this.last = n
    } else {
      n.prev = this.last
      this.last.next = n
      this.last = n
    }
    this.length++
  };
LinkedList.prototype.pop = function() {
    return this.length ? this.remove(this.last) : undefined;
  };
LinkedList.prototype.shift = function() {
    return this.length ? this.remove(this.first) : undefined;
  };
LinkedList.prototype.unshift = function(val) {
    var n = new Node(val)
    if (!this.first) {
      this.first = n
      this.last = n
    } else {
      n.next = this.first
      this.first.prev = n
      this.first = n
    }
    this.length++
};

LinkedList.prototype.indexOf = function(val) {
    var idx = 0;
    var node = this.first;
    while (node.val !== val) {
      node = node.next;
      idx++
    }
    return idx;
  };

LinkedList.prototype.toString = function() {
  var str = ''
  var n = this.first
  while (n !== null) {
    str += ', ' + n.val
    n = n.next
  }
  return str.substr(2)
};
