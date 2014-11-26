/**
 * LinkedList structure class that lets 
 * user insert and delete data throughout
 **/
function LinkedList() {
	head = new LinkedListNode(null);

	/**
	 * Get the head node of the list.
	 **/
	getFirst: function(){
		return head;
	}

	/**
	 * Get the tail node of the list.
	 **/
	getLast: function(){
		var current = head;
		if (current == null)
			return null;

		while (current.getNext() !== null ){
			current = current.getNext();
		}
		return current;
	}

	/**
	 * Insert a new node with data at the head of the list.
	 **/
	insertFirst: function(data){
		var newNode = new LinkedListNode(data);
		newNode.setNext(head);
		this.head = newNode;
	}

	/**
	 * Insert a new node with data after currentNode
	 **/
	insertAfter: function(currentNode, data){
		var newNode = new LinkedListNode(data);
		newNode.setNext(currentNode.getNext);
		currentNode.setNext(newNode);
	}

	/**
	 * Insert a new node with data at the tail of the list.
	 **/
	insertLast: function( data ){
		var newNode = new LinkedListNode(data);
		var current = head;
		if (head === null){
			head = newNode;
			return;
		}

		while( current.getNext() !== null ){
			current = current.getNext();
		}

		current.setNext(newNode);
	} 

	/**
	 * Remove head node
	 **/
	deleteFirst: function() {
		// make the head point to the node after the head node
		head = head.getNext();
	}
	 
	/**
	 * Remove tail node
	 **/
	deleteLast: function()
	{
		var current = head; // start at head
		var counter = 0;
		
		// what if your list was empty or length 1 -- empty the list	
		if (this.size() === 1 || head === null) {
			head = null;
			return;
		}
		
		// while loop, while you're not at a node whose next pointer is null
		// keep updating until you get there
		while (current.getNext().getNext() !== null) {
			// update to the next node
			current = current.getNext();
			counter++;
		}
		
		current.setNext( null );
	}
	 
	/**
	 * Remove node following currentNode
	 * If no node exists (i.e., currentNode is the tail), do nothing
	 **/
	deleteNext: function( LinkedListNode<T> currentNode ){
		var current = head; // start at head
		
		while (current !== null && (current.data != currentNode.data) && current.getNext() != null)
		{
			// update to the next node
			current = current.getNext();
		}
		
		// if we're at the current node in the list then remove it
		if ( current.data == currentNode.data )
			current.setNext( current.getNext().getNext() );
		else 
			return; // if not, do nothing
	}
	 
	/**
	 * Compute the size of this list.
	 **/
	size: function()
	{
		var current = head; // start at head
		var counter = 0;
		
		// while loop, while you're not at a node whose next pointer is null
		// keep updating until you get there
		
		// keep whiling until null
		// every time next is not null increment the counter
		while (current != null) {
			// update to the next node
			current = current.getNext();
			counter++;
		}
		
		return counter;
	}
	 
	/**
	 * Check if list is empty.
	 * @return true if list contains no items.
	 **/
	isEmpty: function()
	{
		// check if the head is empty
		if (head == null)
			return true;
		
		return false;
	}
}

/**
 * A node of a linked list. Houses data and 
 * a pointer to the next node in the linked list
 **/
function LinkedListNode(data) {
	this.data = data;
	this.next = new LinkedListNode(null);

	/**
	 * Set the data stored at this node.
	 **/
	setData: function(newData){
		this.data = newData;
	}

	/**
	 * Get next node.
	 **/
	getNext: function(){
		return this.next;
	}

	/**
	 * Set the next pointer to passed node.
	 **/
	setNext: function(newNode){
		this.next = newNode;
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
	this.setData = function(newData) {
		this.data = newData;
	}

	/**
	 * Sets an an edge between this vertex and the passed vertex
	 * @param vertex2
	 */
	this.setEdge = function(newVertex) {
		neighbors.push(newVertex);
	}

	/**
	 * Deletes an edge between the this vertex and the passed vertex
	 */
	this.deleteEdge = function(oldVertex) {
		neighbors.pop(oldVertex);
	}

	/**
	 * Checks to see if there is an edge between vertex2 and this graph vertex
	 * @param vertex2
	 * @return true if the edge exists
	 */
	this.hasEdge = function(vertex2) {
		for(var i = 0; i < neighbors.length; i++){
			if ( neighbors[i] === vertex2 )
				return true;
		}

		return false;
	}
}
