/**
 *
 *
 **/
function LinkedList() {
	this.head = new LinkedListNode(null);

	/**
	 *
	 */
	this.getFirst = function(){
		return this.head;
	}

	/**
	 *
	 */
	this.getLast = function(){
		var current = head;
		if (current == null)
			return null;

		while (current.getNext() !== null ){
			current = current.getNext();
		}
		return current;
	}

	/**
	 *
	 */
	this.insertFirst = function(data){
		
	}
}

/**
 *
 *
 **/
function LinkedListNode(data) {
	this.data = data;
	this.next = new LinkedListNode(null);

	/**
	 *
	 */
	this.setData = function(newData){
		this.data = newData;
	}

	/**
	 *
	 */
	this.getNext = function(){
		return this.next;
	}

	/**
	 *
	 */
	this.setNext = function(newNextData){
		this.next = new LinkedListNode(newNextData);
	}
}

/**
 *	One vertex in a graph
 *	@param the data stored at one graph vertex
 */
function GraphVertex(data) {
	this.data = data;
	neighbors = new LinkedList();

	/**
	 *
	 */
	this.setData = function(newData) {
		this.data = newData;
	}

	/**
	 *
	 */
	this.setEdge = function(newVertex) {

	}

	/**
	 *
	 */
	this.deleteEdge = function(oldVertex) {
	
	}

	/**
	 *
	 */
	this.hasEdge = function(vertex2) {

	}

	/**
	 *
	 */
	this.getNeighbors = function(){

	}

}

/**
 *
 *
 **/
function Graph() {

}