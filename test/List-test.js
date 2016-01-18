import { expect } from 'chai'

import List from '../lib/list.js'

const l = console.log
const test = m => ( { expect: v => expect( v, m ) } )

export default () => {
	test( 'Empty list' )
		.expect( List( null ).value ).to.eql( { head: null, tail: null } )

	test( 'Single-element list' )
		.expect( List( 1 ).value ).to.eql( { head: 1, tail: null } )

	test( 'Multi-element list' )
		.expect( List( 1, List( 2 ) ).value ).to.eql( { head: 1, tail: { head: 2, tail: null } } )

	test( 'Must have a head to have a tail' )
		.expect( () => List( null, List( 1 ) ).value ).to.throw( TypeError )

	test( 'Construct empty list on list' )
		.expect( List( 1, List( null ) ).value ).to.eql( { head: 1, tail: null } )

	// Monoid
	test( 'mempty is empty list' )
		.expect( List().mempty.value ).to.eql( { head: null, tail: null } )

	test( 'mappend onto empty list :: List a ++ id = List a' )
		.expect( List( null ).mappend( List( 1 ) ).value ).to.eql( { head: 1, tail: null } )

	test( 'mappend empty list onto list :: id ++ List a = List a' )
		.expect( List( 1 ).mappend( List( null ) ).value ).to.eql( { head: 1, tail: null } )

	test( 'mappend of singles is cons :: List a ++ List b = List a b' )
		.expect( List( 1 ).mappend( List( 2 ) ).value ).to.eql( List( 1, List( 2 ) ).value )

	test( 'mappend two single-element lists' )
		.expect( List( 1 ).mappend( List( 2 ) ).value ).to.eql( { head: 1, tail: { head: 2, tail: null } } )

	let l1 = List( 1, List( 2 ) )
	let l2 = List( 3, List( 4 ) )
	test( 'mappend of two multi-element lists' )
		.expect( l1.mappend( l2 ).value ).to.eql( { head: 1, tail: { head: 2, tail: { head: 3, tail: { head: 4, tail: null } } } } )

	l( List( 1 ).mappend( List( 2 ) ).mappend( List( 3 ) ).valueOf() )
}