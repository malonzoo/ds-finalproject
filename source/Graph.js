/**
 * Interface for the ADT Graph Vertex
 **/
function Graph() {
	var hash = new HashSet();

	/**
	 * Add a vertex to the graph
	 * @param data
	 */
	addVertex: function(vertex) {
		hash.add(vertex);
	}

	/**
	 * Deletes the passed vertex from the graph
	 * Will only delete if the vertex is actually in the set
	 * @param vertex
	 */
	deleteVertex: function (vertex) {
		hash.remove(vertex);
	}

	/**
	 * Checks to see if the passed vertex is in the graph
	 * @param vertex
	 * @return true if in the graph
	 */
	hasVertex: function(vertex) {
		return hash.contains(vertex);
	}
	
	/**
	 * 
	 */
	getVertex: function(data) {
		 var allKeys = hash.values();

		 for (var i = 0; i < allKeys.length; i++) {
		 	if (allKeys[i].data === data ){
		 		return allKeys[i];
		 	}
		 }

		 return null;
	}
	
	/**
	 * Creates an edge between the two passed vertices
	 * @param vertex1
	 * @param vertex2
	 */
	addEdge: function(vertex1, vertex2) {
		if ( this.hasVertex(vertex1) && this.hasVertex(vertex2) ) {
			// add vertex2 to the list of neighbors of vertex1
			vertex1.setEdge(vertex2);
		
			// add vertex1 to the list of neighbors of vertex2
			vertex2.setEdge(vertex1);
		}
		else
			return -1;
	}

	/**
	 * Deletes the edge between the passed vertices
	 * @param vertex1
	 * @param vertex2
	 */
	deleteEdge: function(vertex1, vertex2) {
		if ( this.hasVertex(vertex1) && this.hasVertex(vertex2) ) {
			// delete vertex2 from the list of neighbors of vertex1
			vertex1.deleteEdge(vertex2);
		
			// delete vertex1 from the list of neighbors of vertex2
			vertex2.deleteEdge(vertex1);
		}
		else
			return -1;
	}
	
	/**
	 * Checks to see if there is an edge between the two vertices
	 * @param vertex1
	 * @param vertex2
	 * @return true if the edge exists
	 */
	hasEdge: function(vertex1, vertex2) {
		// since edges in this implementation are solely undirected
		// we just have to check if vertex2 is in the list of neighbors
		// of vertex1, since checking to see if vertex1 is in the list 
		// of vertex2 would be redundant 
		if ( this.hasVertex(vertex1) && this.hasVertex(vertex2) ){
			return vertex1.hasEdge(vertex2);
		}
		else
			return -1;
	}

	/**
	 * Checks if the graph is empty
	 * @return true if the list is empty
	 */
	ifEmpty: function() {
		return hash.isEmpty();
	}
	
	/**
	 * Depth first search traversal
	 * @param a Graph Vertex that is in this graph
	 * @return
	 */
	dfs: function(v) {
		// start a set and whenever you visit a vertex, add it to a set
		var visitSet = new HashSet();
		var toReturn = [];
		
		visitSet.add(v);	// label the passed vertex as visited
		toReturn.push(v);	// add the passed vertex to the ordered list of nodes visited
		
		toReturn = dfsRec(v, visitSet, toReturn);
		
		return toReturn;
	}
	
	/**
	 * Helper method/ recursive method to the depth first search traversal
	 * @param v
	 * @param set
	 * @param list
	 * @return
	 */
	dfsRec: function(v, set, list)
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
	}
	
	
	/**
	 * Breath first search traversal
	 * @param v
	 * @return
	 */
	bfs: function(v)
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
		while ( queue.length != 0 )
		{
			v = queue.shift();
			
			for (int x = 0; x < (v.neighbors).size(); x++)
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
	}
}

/**
 *	One vertex in a graph
 *	@param the data stored at one graph vertex
 */
function GraphVertex(data) {
	this.data = data;
	neighbors = [];

	/**
	 * Sets the data for this vertex 
	 * @param data
	 */
	setData: function(newData) {
		this.data = newData;
	}

	/**
	 * Sets an an edge between this vertex and the passed vertex
	 * @param vertex2
	 */
	setEdge: function(newVertex) {
		neighbors.push(newVertex);
	}

	/**
	 * Deletes an edge between the this vertex and the passed vertex
	 */
	deleteEdge: function(oldVertex) {
		neighbors.pop(oldVertex);
	}

	/**
	 * Checks to see if there is an edge between vertex2 and this graph vertex
	 * @param vertex2
	 * @return true if the edge exists
	 */
	hasEdge: function(vertex2) {
		return neighbors.indexOf(vertex2) > -1 ? true : false ;
	}
}

/**
 * Copyright 2013 Tim Down.
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
function HashSet(t,n){var e=new Hashtable(t,n);this.add=function(t){e.put(t,!0)},this.addAll=function(t){for(var n=0,r=t.length;r>n;++n)e.put(t[n],!0)},this.values=function(){return e.keys()},this.remove=function(t){return e.remove(t)?t:null},this.contains=function(t){return e.containsKey(t)},this.clear=function(){e.clear()},this.size=function(){return e.size()},this.isEmpty=function(){return e.isEmpty()},this.clone=function(){var r=new HashSet(t,n);return r.addAll(e.keys()),r},this.intersection=function(r){for(var i,u=new HashSet(t,n),o=r.values(),s=o.length;s--;)i=o[s],e.containsKey(i)&&u.add(i);return u},this.union=function(t){for(var n,r=this.clone(),i=t.values(),u=i.length;u--;)n=i[u],e.containsKey(n)||r.add(n);return r},this.isSubsetOf=function(t){for(var n=e.keys(),r=n.length;r--;)if(!t.contains(n[r]))return!1;return!0},this.complement=function(e){for(var r,i=new HashSet(t,n),u=this.values(),o=u.length;o--;)r=u[o],e.contains(r)||i.add(r);return i}}
var Hashtable=function(t){function n(t){return typeof t==p?t:""+t}function e(t){var r;return typeof t==p?t:typeof t.hashCode==y?(r=t.hashCode(),typeof r==p?r:e(r)):n(t)}function r(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])}function i(t,n){return t.equals(n)}function u(t,n){return typeof n.equals==y?n.equals(t):t===n}function o(n){return function(e){if(null===e)throw new Error("null is not a valid "+n);if(e===t)throw new Error(n+" must not be undefined")}}function s(t,n,e,r){this[0]=t,this.entries=[],this.addEntry(n,e),null!==r&&(this.getEqualityFunction=function(){return r})}function a(t){return function(n){for(var e,r=this.entries.length,i=this.getEqualityFunction(n);r--;)if(e=this.entries[r],i(n,e[0]))switch(t){case E:return!0;case K:return e;case q:return[r,e[1]]}return!1}}function l(t){return function(n){for(var e=n.length,r=0,i=this.entries,u=i.length;u>r;++r)n[e+r]=i[r][t]}}function f(t,n){for(var e,r=t.length;r--;)if(e=t[r],n===e[0])return r;return null}function h(t,n){var e=t[n];return e&&e instanceof s?e:null}function c(){var n=[],i={},u={replaceDuplicateKey:!0,hashCode:e,equals:null},o=arguments[0],a=arguments[1];a!==t?(u.hashCode=o,u.equals=a):o!==t&&r(u,o);var l=u.hashCode,c=u.equals;this.properties=u,this.put=function(t,e){g(t),d(e);var r,o,a=l(t),f=null;return r=h(i,a),r?(o=r.getEntryForKey(t),o?(u.replaceDuplicateKey&&(o[0]=t),f=o[1],o[1]=e):r.addEntry(t,e)):(r=new s(a,t,e,c),n.push(r),i[a]=r),f},this.get=function(t){g(t);var n=l(t),e=h(i,n);if(e){var r=e.getEntryForKey(t);if(r)return r[1]}return null},this.containsKey=function(t){g(t);var n=l(t),e=h(i,n);return e?e.containsKey(t):!1},this.containsValue=function(t){d(t);for(var e=n.length;e--;)if(n[e].containsValue(t))return!0;return!1},this.clear=function(){n.length=0,i={}},this.isEmpty=function(){return!n.length};var y=function(t){return function(){for(var e=[],r=n.length;r--;)n[r][t](e);return e}};this.keys=y("keys"),this.values=y("values"),this.entries=y("getEntries"),this.remove=function(t){g(t);var e,r=l(t),u=null,o=h(i,r);return o&&(u=o.removeEntryForKey(t),null!==u&&0==o.entries.length&&(e=f(n,r),n.splice(e,1),delete i[r])),u},this.size=function(){for(var t=0,e=n.length;e--;)t+=n[e].entries.length;return t}}var y="function",p="string",v="undefined";if(typeof encodeURIComponent==v||Array.prototype.splice===t||Object.prototype.hasOwnProperty===t)return null;var g=o("key"),d=o("value"),E=0,K=1,q=2;return s.prototype={getEqualityFunction:function(t){return typeof t.equals==y?i:u},getEntryForKey:a(K),getEntryAndIndexForKey:a(q),removeEntryForKey:function(t){var n=this.getEntryAndIndexForKey(t);return n?(this.entries.splice(n[0],1),n[1]):null},addEntry:function(t,n){this.entries.push([t,n])},keys:l(0),values:l(1),getEntries:function(t){for(var n=t.length,e=0,r=this.entries,i=r.length;i>e;++e)t[n+e]=r[e].slice(0)},containsKey:a(E),containsValue:function(t){for(var n=this.entries,e=n.length;e--;)if(t===n[e][1])return!0;return!1}},c.prototype={each:function(t){for(var n,e=this.entries(),r=e.length;r--;)n=e[r],t(n[0],n[1])},equals:function(t){var n,e,r,i=this.size();if(i==t.size()){for(n=this.keys();i--;)if(e=n[i],r=t.get(e),null===r||r!==this.get(e))return!1;return!0}return!1},putAll:function(t,n){for(var e,r,i,u,o=t.entries(),s=o.length,a=typeof n==y;s--;)e=o[s],r=e[0],i=e[1],a&&(u=this.get(r))&&(i=n(r,u,i)),this.put(r,i)},clone:function(){var t=new c(this.properties);return t.putAll(this),t}},c.prototype.toQueryString=function(){for(var t,e=this.entries(),r=e.length,i=[];r--;)t=e[r],i[r]=encodeURIComponent(n(t[0]))+"="+encodeURIComponent(n(t[1]));return i.join("&")},c}();