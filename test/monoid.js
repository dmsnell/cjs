import { expect } from 'chai'

import { mempty, mappend } from '../lib/monoid.js'

const m = function( value ) { return {
	value,
	get mempty () { return m( 0 ) },
	mappend( m2 ) { return m( this.value + m2.value ) }
} }

describe( 'Monoid', () => {
	describe( '#mempty', () => {
		it( 'should hold right identity under mappend', () => {
			const m1 = m( 1 )

			expect( mappend( m1, mempty( m1 ) ).value ).to.be.eql( m1.value )
		} )

		it( 'should hold left identity under mappend', () => {
			const m1 = m( 1 )

			expect( mappend( mempty( m1 ), m1 ).value ).to.be.eql( m1.value )
		} )
	} )

	describe( '#mappend', () => {
		it( 'should hold associativity', () => {
			const [ m1, m2, m3 ] = [ 1, 2, 3 ].map( m )

			expect( mappend( m1, mappend( m2, m3 ) ).value ).to.eql( mappend( mappend( m1, m2 ), m3 ).value )
		} )
	} )
} )