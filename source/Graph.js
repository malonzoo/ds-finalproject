var testGraph = new Graph();
var v1 = new GraphVertex(1);
var v2 = new GraphVertex(2);
var v3 = new GraphVertex(3);

v1.setEdge(v2);
v2.setEdge(v3);
v3.setEdge(v1);

testGraph.addVertex(v1);
testGraph.addVertex(v2);
testGraph.addVertex(v3);

console.log( "DFS: " + testGraph.dfs(v1) );
console.log( "BFS: " + testGraph.bfs(v1) );

/**
 * Interface for the ADT Graph Vertex
 **/
function Graph() {
	var hash = new HashSet();

	/**
	 * Add a vertex to the graph
	 * @param data
	 */
	this.addVertex = function(vertex) {
		hash.add(vertex);
	};

	/**
	 * Deletes the passed vertex from the graph
	 * Will only delete if the vertex is actually in the set
	 * @param vertex
	 */
	this.deleteVertex = function (vertex) {
		hash.remove(vertex);
	};

	/**
	 * Checks to see if the passed vertex is in the graph
	 * @param vertex
	 * @return true if in the graph
	 */
	this.hasVertex = function(vertex) {
		return hash.contains(vertex);
	};
	
	/**
	 * 
	 */
	this.getVertex = function(data) {
		 var allKeys = hash.values();

		 for (var i = 0; i < allKeys.length; i++) {
		 	if (allKeys[i].data === data ){
		 		return allKeys[i];
		 	}
		 }

		 return null;
	};
	
	/**
	 * Creates an edge between the two passed vertices
	 * @param vertex1
	 * @param vertex2
	 */
	this.addEdge = function(vertex1, vertex2) {
		if ( this.hasVertex(vertex1) && this.hasVertex(vertex2) ) {
			// add vertex2 to the list of neighbors of vertex1
			vertex1.setEdge(vertex2);
		
			// add vertex1 to the list of neighbors of vertex2
			vertex2.setEdge(vertex1);
		}
		else
			return -1;
	};

	/**
	 * Deletes the edge between the passed vertices
	 * @param vertex1
	 * @param vertex2
	 */
	this.deleteEdge = function(vertex1, vertex2) {
		if ( this.hasVertex(vertex1) && this.hasVertex(vertex2) ) {
			// delete vertex2 from the list of neighbors of vertex1
			vertex1.deleteEdge(vertex2);
		
			// delete vertex1 from the list of neighbors of vertex2
			vertex2.deleteEdge(vertex1);
		}
		else
			return -1;
	};
	
	/**
	 * Checks to see if there is an edge between the two vertices
	 * @param vertex1
	 * @param vertex2
	 * @return true if the edge exists
	 */
	this.hasEdge = function(vertex1, vertex2) {
		// since edges in this implementation are solely undirected
		// we just have to check if vertex2 is in the list of neighbors
		// of vertex1, since checking to see if vertex1 is in the list 
		// of vertex2 would be redundant 
		if ( this.hasVertex(vertex1) && this.hasVertex(vertex2) ){
			return vertex1.hasEdge(vertex2);
		}
		else
			return -1;
	};

	/**
	 * Checks if the graph is empty
	 * @return true if the list is empty
	 */
	this.ifEmpty = function() {
		return hash.isEmpty();
	};
	
	/**
	 * Depth first search traversal
	 * @param a Graph Vertex that is in this graph
	 * @return
	 */
	this.dfs = function(v) {
		// start a set and whenever you visit a vertex, add it to a set
		var visitSet = new HashSet();
		var toReturn = [];
		
		visitSet.add(v);	// label the passed vertex as visited
		toReturn.push(v);	// add the passed vertex to the ordered list of nodes visited
		
		toReturn = dfsRec(v, visitSet, toReturn);
		
		return toReturn;
	};
	
	/**
	 * Helper method/ recursive method to the depth first search traversal
	 * @param v
	 * @param set
	 * @param list
	 * @return
	 */
	dfsRec = function(v, set, list)
	{
		var current;
		for (var i = 0; i < (v.neighbors).length; i++) {
			current = (list.neighbors)[i];
			if ( !(set.contains(current)) ) {
				set.add( current );
				list.push( current );
				dfsRec(current, set, list);
			}
		}

		return list;
	};
	
	
	/**
	 * Breath first search traversal
	 * @param v
	 * @return
	 */
	this.bfs = function(v)
	{
		// a set that will contain all the vertices that have been visited / "white"
		var visitSet = new HashSet();
		visitSet.add(v);
		
		// a list that will have all the vertices as they are visited
		var toReturn = [];
		toReturn.push(v);
		
		// start a queue, you add things to the queue; dequeue when in a while loop
		var queue = [];
		queue.push(v);
		
		// loop through all the queue, those that aren't visited are added to the queue and then made visited
		while ( queue.length !== 0 )
		{
			v = queue.shift();
			
			for (var x = 0; x < (v.neighbors).size(); x++)
			{
				// if the neighbor has not yet been visited, meaning it is not in the visitSet
				if ( !(visitSet.contains( (v.neighbors)[x] )) )
				{
					// then add said neighbor vertex to the visitSet
					visitSet.add( (v.neighbors)[x] );
					// and add said neighbor vertex to the queue
					queue.push( (v.neighbors)[x] );
					// and add it to the list of arrays visited
					toReturn.push( (v.neighbors)[x] );
				}			
			}
		}
		
		// ends when the queue is empty
		return toReturn;
	};
}

/**
 *	One vertex in a graph
 *	@param the data stored at one graph vertex
 */
function GraphVertex(data) {
	this.data = data;
	this.neighbors = [];

	/**
	 * Sets the data for this vertex 
	 * @param data
	 */
	this.setData = function(newData) {
		this.data = newData;
	};

	/**
	 * Sets an an edge between this vertex and the passed vertex
	 * @param vertex2
	 */
	this.setEdge = function(newVertex) {
		neighbors.push(newVertex);
	};

	/**
	 * Deletes an edge between the this vertex and the passed vertex
	 */
	this.deleteEdge = function(oldVertex) {
		neighbors.pop(oldVertex);
	};

	/**
	 * Checks to see if there is an edge between vertex2 and this graph vertex
	 * @param vertex2
	 * @return true if the edge exists
	 */
	this.hasEdge = function(vertex2) {
		return neighbors.indexOf(vertex2) > -1 ? true : false ;
	};
}



/********************************************************************************/


/**
 * @license jahashtable, a JavaScript implementation of a hash table. It creates a single constructor function called
 * Hashtable in the global scope.
 *
 * http://www.timdown.co.uk/jshashtable/
 * Copyright 2013 Tim Down.
 * Version: 3.0
 * Build date: 17 July 2013
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Hashtable = (function(UNDEFINED) {
    var FUNCTION = "function", STRING = "string", UNDEF = "undefined";

    // Require Array.prototype.splice, Object.prototype.hasOwnProperty and encodeURIComponent. In environments not
    // having these (e.g. IE <= 5), we bail out now and leave Hashtable null.
    if (typeof encodeURIComponent == UNDEF ||
            Array.prototype.splice === UNDEFINED ||
            Object.prototype.hasOwnProperty === UNDEFINED) {
        return null;
    }

    function toStr(obj) {
        return (typeof obj == STRING) ? obj : "" + obj;
    }

    function hashObject(obj) {
        var hashCode;
        if (typeof obj == STRING) {
            return obj;
        } else if (typeof obj.hashCode == FUNCTION) {
            // Check the hashCode method really has returned a string
            hashCode = obj.hashCode();
            return (typeof hashCode == STRING) ? hashCode : hashObject(hashCode);
        } else {
            return toStr(obj);
        }
    }
    
    function merge(o1, o2) {
        for (var i in o2) {
            if (o2.hasOwnProperty(i)) {
                o1[i] = o2[i];
            }
        }
    }

    function equals_fixedValueHasEquals(fixedValue, variableValue) {
        return fixedValue.equals(variableValue);
    }

    function equals_fixedValueNoEquals(fixedValue, variableValue) {
        return (typeof variableValue.equals == FUNCTION) ?
            variableValue.equals(fixedValue) : (fixedValue === variableValue);
    }

    function createKeyValCheck(kvStr) {
        return function(kv) {
            if (kv === null) {
                throw new Error("null is not a valid " + kvStr);
            } else if (kv === UNDEFINED) {
                throw new Error(kvStr + " must not be undefined");
            }
        };
    }

    var checkKey = createKeyValCheck("key"), checkValue = createKeyValCheck("value");

    /*----------------------------------------------------------------------------------------------------------------*/

    function Bucket(hash, firstKey, firstValue, equalityFunction) {
        this[0] = hash;
        this.entries = [];
        this.addEntry(firstKey, firstValue);

        if (equalityFunction !== null) {
            this.getEqualityFunction = function() {
                return equalityFunction;
            };
        }
    }

    var EXISTENCE = 0, ENTRY = 1, ENTRY_INDEX_AND_VALUE = 2;

    function createBucketSearcher(mode) {
        return function(key) {
            var i = this.entries.length, entry, equals = this.getEqualityFunction(key);
            while (i--) {
                entry = this.entries[i];
                if ( equals(key, entry[0]) ) {
                    switch (mode) {
                        case EXISTENCE:
                            return true;
                        case ENTRY:
                            return entry;
                        case ENTRY_INDEX_AND_VALUE:
                            return [ i, entry[1] ];
                    }
                }
            }
            return false;
        };
    }

    function createBucketLister(entryProperty) {
        return function(aggregatedArr) {
            var startIndex = aggregatedArr.length;
            for (var i = 0, entries = this.entries, len = entries.length; i < len; ++i) {
                aggregatedArr[startIndex + i] = entries[i][entryProperty];
            }
        };
    }

    Bucket.prototype = {
        getEqualityFunction: function(searchValue) {
            return (typeof searchValue.equals == FUNCTION) ? equals_fixedValueHasEquals : equals_fixedValueNoEquals;
        },

        getEntryForKey: createBucketSearcher(ENTRY),

        getEntryAndIndexForKey: createBucketSearcher(ENTRY_INDEX_AND_VALUE),

        removeEntryForKey: function(key) {
            var result = this.getEntryAndIndexForKey(key);
            if (result) {
                this.entries.splice(result[0], 1);
                return result[1];
            }
            return null;
        },

        addEntry: function(key, value) {
            this.entries.push( [key, value] );
        },

        keys: createBucketLister(0),

        values: createBucketLister(1),

        getEntries: function(destEntries) {
            var startIndex = destEntries.length;
            for (var i = 0, entries = this.entries, len = entries.length; i < len; ++i) {
                // Clone the entry stored in the bucket before adding to array
                destEntries[startIndex + i] = entries[i].slice(0);
            }
        },

        containsKey: createBucketSearcher(EXISTENCE),

        containsValue: function(value) {
            var entries = this.entries, i = entries.length;
            while (i--) {
                if ( value === entries[i][1] ) {
                    return true;
                }
            }
            return false;
        }
    };

    /*----------------------------------------------------------------------------------------------------------------*/

    // Supporting functions for searching hashtable buckets

    function searchBuckets(buckets, hash) {
        var i = buckets.length, bucket;
        while (i--) {
            bucket = buckets[i];
            if (hash === bucket[0]) {
                return i;
            }
        }
        return null;
    }

    function getBucketForHash(bucketsByHash, hash) {
        var bucket = bucketsByHash[hash];

        // Check that this is a genuine bucket and not something inherited from the bucketsByHash's prototype
        return ( bucket && (bucket instanceof Bucket) ) ? bucket : null;
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    function Hashtable() {
        var buckets = [];
        var bucketsByHash = {};
        var properties = {
            replaceDuplicateKey: true,
            hashCode: hashObject,
            equals: null
        };

        var arg0 = arguments[0], arg1 = arguments[1];
        if (arg1 !== UNDEFINED) {
            properties.hashCode = arg0;
            properties.equals = arg1;
        } else if (arg0 !== UNDEFINED) {
            merge(properties, arg0);
        }

        var hashCode = properties.hashCode, equals = properties.equals;

        this.properties = properties;

        this.put = function(key, value) {
            checkKey(key);
            checkValue(value);
            var hash = hashCode(key), bucket, bucketEntry, oldValue = null;

            // Check if a bucket exists for the bucket key
            bucket = getBucketForHash(bucketsByHash, hash);
            if (bucket) {
                // Check this bucket to see if it already contains this key
                bucketEntry = bucket.getEntryForKey(key);
                if (bucketEntry) {
                    // This bucket entry is the current mapping of key to value, so replace the old value.
                    // Also, we optionally replace the key so that the latest key is stored.
                    if (properties.replaceDuplicateKey) {
                        bucketEntry[0] = key;
                    }
                    oldValue = bucketEntry[1];
                    bucketEntry[1] = value;
                } else {
                    // The bucket does not contain an entry for this key, so add one
                    bucket.addEntry(key, value);
                }
            } else {
                // No bucket exists for the key, so create one and put our key/value mapping in
                bucket = new Bucket(hash, key, value, equals);
                buckets.push(bucket);
                bucketsByHash[hash] = bucket;
            }
            return oldValue;
        };

        this.get = function(key) {
            checkKey(key);

            var hash = hashCode(key);

            // Check if a bucket exists for the bucket key
            var bucket = getBucketForHash(bucketsByHash, hash);
            if (bucket) {
                // Check this bucket to see if it contains this key
                var bucketEntry = bucket.getEntryForKey(key);
                if (bucketEntry) {
                    // This bucket entry is the current mapping of key to value, so return the value.
                    return bucketEntry[1];
                }
            }
            return null;
        };

        this.containsKey = function(key) {
            checkKey(key);
            var bucketKey = hashCode(key);

            // Check if a bucket exists for the bucket key
            var bucket = getBucketForHash(bucketsByHash, bucketKey);

            return bucket ? bucket.containsKey(key) : false;
        };

        this.containsValue = function(value) {
            checkValue(value);
            var i = buckets.length;
            while (i--) {
                if (buckets[i].containsValue(value)) {
                    return true;
                }
            }
            return false;
        };

        this.clear = function() {
            buckets.length = 0;
            bucketsByHash = {};
        };

        this.isEmpty = function() {
            return !buckets.length;
        };

        var createBucketAggregator = function(bucketFuncName) {
            return function() {
                var aggregated = [], i = buckets.length;
                while (i--) {
                    buckets[i][bucketFuncName](aggregated);
                }
                return aggregated;
            };
        };

        this.keys = createBucketAggregator("keys");
        this.values = createBucketAggregator("values");
        this.entries = createBucketAggregator("getEntries");

        this.remove = function(key) {
            checkKey(key);

            var hash = hashCode(key), bucketIndex, oldValue = null;

            // Check if a bucket exists for the bucket key
            var bucket = getBucketForHash(bucketsByHash, hash);

            if (bucket) {
                // Remove entry from this bucket for this key
                oldValue = bucket.removeEntryForKey(key);
                if (oldValue !== null) {
                    // Entry was removed, so check if bucket is empty
                    if (bucket.entries.length === 0) {
                        // Bucket is empty, so remove it from the bucket collections
                        bucketIndex = searchBuckets(buckets, hash);
                        buckets.splice(bucketIndex, 1);
                        delete bucketsByHash[hash];
                    }
                }
            }
            return oldValue;
        };

        this.size = function() {
            var total = 0, i = buckets.length;
            while (i--) {
                total += buckets[i].entries.length;
            }
            return total;
        };
    }

    Hashtable.prototype = {
        each: function(callback) {
            var entries = this.entries(), i = entries.length, entry;
            while (i--) {
                entry = entries[i];
                callback(entry[0], entry[1]);
            }
        },

        equals: function(hashtable) {
            var keys, key, val, count = this.size();
            if (count == hashtable.size()) {
                keys = this.keys();
                while (count--) {
                    key = keys[count];
                    val = hashtable.get(key);
                    if (val === null || val !== this.get(key)) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        },

        putAll: function(hashtable, conflictCallback) {
            var entries = hashtable.entries();
            var entry, key, value, thisValue, i = entries.length;
            var hasConflictCallback = (typeof conflictCallback == FUNCTION);
            while (i--) {
                entry = entries[i];
                key = entry[0];
                value = entry[1];

                // Check for a conflict. The default behaviour is to overwrite the value for an existing key
                if ( hasConflictCallback && (thisValue = this.get(key)) ) {
                    value = conflictCallback(key, thisValue, value);
                }
                this.put(key, value);
            }
        },

        clone: function() {
            var clone = new Hashtable(this.properties);
            clone.putAll(this);
            return clone;
        }
    };

    Hashtable.prototype.toQueryString = function() {
        var entries = this.entries(), i = entries.length, entry;
        var parts = [];
        while (i--) {
            entry = entries[i];
            parts[i] = encodeURIComponent( toStr(entry[0]) ) + "=" + encodeURIComponent( toStr(entry[1]) );
        }
        return parts.join("&");
    };

    return Hashtable;
})();

function HashSet(param1, param2) {
    var hashTable = new Hashtable(param1, param2);

    this.add = function(o) {
        hashTable.put(o, true);
    };

    this.addAll = function(arr) {
        for (var i = 0, len = arr.length; i < len; ++i) {
            hashTable.put(arr[i], true);
        }
    };

    this.values = function() {
        return hashTable.keys();
    };

    this.remove = function(o) {
        return hashTable.remove(o) ? o : null;
    };

    this.contains = function(o) {
        return hashTable.containsKey(o);
    };

    this.clear = function() {
        hashTable.clear();
    };

    this.size = function() {
        return hashTable.size();
    };

    this.isEmpty = function() {
        return hashTable.isEmpty();
    };

    this.clone = function() {
        var h = new HashSet(param1, param2);
        h.addAll(hashTable.keys());
        return h;
    };

    this.intersection = function(hashSet) {
        var intersection = new HashSet(param1, param2);
        var values = hashSet.values(), i = values.length, val;
        while (i--) {
            val = values[i];
            if (hashTable.containsKey(val)) {
                intersection.add(val);
            }
        }
        return intersection;
    };

    this.union = function(hashSet) {
        var union = this.clone();
        var values = hashSet.values(), i = values.length, val;
        while (i--) {
            val = values[i];
            if (!hashTable.containsKey(val)) {
                union.add(val);
            }
        }
        return union;
    };

    this.isSubsetOf = function(hashSet) {
        var values = hashTable.keys(), i = values.length;
        while (i--) {
            if (!hashSet.contains(values[i])) {
                return false;
            }
        }
        return true;
    };

    this.complement = function(hashSet) {
        var complement = new HashSet(param1, param2);
        var values = this.values(), i = values.length, val;
        while (i--) {
            val = values[i];
            if (!hashSet.contains(val)) {
                complement.add(val);
            }
        }
        return complement;
    };
}