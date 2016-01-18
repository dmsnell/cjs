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
	if ( ! head && tail ) { throw new TypeError( 'Cannot construct list tail with no head' ) }

	if ( ! head ) { return { head: null, tail: null } }

	if ( isEmptyList( tail ) ) { return { head, tail: null } }

	return { head, tail: isList( tail ) ? tail.value : tail }
}

function appendList( next ) {
	const nextValue = isEmptyList( next ) ? null : next.value
	const tailDescender = tail => ! tail ? nextValue : { head: tail.head, tail: tailDescender( tail.tail ) }

	if ( isEmptyList( this ) ) { return next }

	return List( this.value.head, tailDescender( this.value.tail ) )
}

function getTail() {
	if ( ! this.value.head ) { return null }

	if ( ! this.value.tail ) { return null }

	const { head: thead, tail: ttail } = this.value.tail

	if ( ! ttail ) { return thead }

	return List( thead, ttail )
}

function takeFrom( count ) {
	if ( 0 === count ) { return List() }
	if ( 1 === count ) { return List( this.value.head ) }

	if ( ! this.value.tail ) { return List( this.value.head ) }

	const { head: thead, tail: ttail } = this.value.tail

	return List( this.value.head, takeFrom.call( List( thead, ttail ), count - 1 ) )
}

export default function List( head, tail ) { return {
	value: createList( head, tail ),
	toString() { return JSON.stringify( this.value ) },
	valueOf() { return this.value },

	get head () { return this.value.head },
	get tail () { return getTail.call( this ) },
	take( n ) { return takeFrom.call( this, n ) },

	get mempty () { return List( null ) },
	mappend: appendList
} }
