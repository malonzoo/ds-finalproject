/**
 * Interface for the ADT Graph Vertex
 **/
function Graph() {
	// hash of GraphVertex(es)
	this.hash = [];

	/**
	 * To String
	 */
	this.toString = function() {
		var toReturn = "";
		for (var i = 0; i < this.hash.length; i++) {
			toReturn+= this.getVertex(i).data.atom;
			toReturn+= i == this.hash.length-1 ? "" : " " ;
		}
		return toReturn;
	};

	/**
	 * Add a vertex to the graph
	 * @param data
	 */
	this.addVertex = function(vertex) {
		this.hash.push(vertex);
	};

	/**
	 * Deletes the passed vertex from the graph
	 * Will only delete if the vertex is actually in the set
	 * @param vertex
	 */
	this.deleteVertex = function (vertex) {
		if ( this.hasVertex(vertex) ) {
			this.hash.splice(this.hash.indexOf(vertex), 1);
		}
	};

	/**
	 * Checks to see if the passed vertex is in the graph
	 * @param vertex
	 * @return true if in the graph
	 */
	this.hasVertex = function(vertex) {
		return this.hash.indexOf(vertex) > -1 ? true : false;
	};

	/**
	 *
	 * @param num is the number of the node/ its id in the hash
	 */
	this.getVertex = function(num) {
		return this.hash[num];
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
		return this.hash.isEmpty();
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


	/**
	* Get the value of the node's network of n degree
	* @param n integer of degree of separation
	* @param v original vertex/node
	*/
	this.valueDegreeN = function(v, n) {
		console.log("getting to valueDegreeN");
		var set = [];
		set.push(v);

		// set is a set of nodes that have been visited
		return this.getTotalOfSet( this.valueDegreeNhelper(v, n, set) );

	};

	this.valueDegreeNhelper = function(v, n, visited) {
		if (n > 0) {
			for (var i = 0; i < v.neighbors.length; i++) {
				if( $.inArray(v.neighbors[i], visited) < 0 ) {
					visited.push(v.neighbors[i]);
					visited = this.valueDegreeNhelper(v.neighbors[i], n-1, visited);
				}
			}
		}
		return visited;
	};

	this.getTotalOfSet = function(set) {
		var total = 0;
		for (var i = 0; i < set.length; i++) {
			total += set[i].data.donation;
		}
		return total;
	};

	this.valueDegree1 = function(v) {
		var total = 0;
		for (var i = 0; i < v.neighbors.length; i++) {
			total += v.neighbors[i].data.donation;
		}
		return total;
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
		this.neighbors.push(newVertex);
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
