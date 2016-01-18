const l = console.log;

function isList( o ) {
	return o &&
		o.hasOwnProperty( 'value' ) &&
		o.value.hasOwnProperty( 'head' ) &&
		o.value.hasOwnProperty( 'tail' )
}

function isEmptyList( o ) {
	return o &&
		isList( o ) &&
		o.value.head == null &&
		o.value.tail == null
}

function createList( head, tail = null ) {
	const tailIsList = isList( tail )

	if ( ! head && tail ) { throw new TypeError( 'Cannot construct list tail with no head' ) }

	if ( ! head ) { return { head: null, tail: null } }

	if ( isEmptyList( tail ) ) { return { head, tail: null } }

	return { head, tail: tailIsList ? tail.value : tail }
}

function appendList( next ) {
	const nextValue = isEmptyList( next ) ? null : next.value
	const tailDescender = tail => ! tail ? nextValue : { head: tail.head, tail: tailDescender( tail.tail ) }

	if ( isEmptyList( this ) ) { return next }

	return List( this.value.head, tailDescender( this.value.tail ) )
}

function List( head, tail ) { return {
	value: createList( head, tail ),
	toString() { return JSON.stringify( this.value ) },
	valueOf() { return this.value },

	get mempty () { return List( null ) },
	mappend: appendList
} }

export default List;