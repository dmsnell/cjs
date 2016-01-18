import { expect } from 'chai'

import List from '../lib/list.js'
import { mempty, mappend } from '../lib/monoid.js'

const emptyList = { head: null, tail: null }
const oneList = { head: 1, tail: null }
const twoList = { head: 1, tail: { head: 2, tail: null } }

describe( 'List', () => {
	describe( '#construct', () => {
		it( 'should create an empty list', () => {
			expect( List( null ).value, 'explicit null' ).to.eql( emptyList )
			expect( List().value, 'undefined' ).to.eql( emptyList )
		} )

		it( 'should create a single-element list', () => {
			expect( List( 1 ).value ).to.eql( oneList )
		} )

		it( 'should create a multi-element list', () => {
			expect( List( 1, List( 2 ) ).value ).to.eql( twoList )
		} )

		it( 'should throw an error if head is null', () => {
			expect( () => List( null, List( 1 ) ) ).to.throw( TypeError )
		} )

		it( 'should collapse empty-list tail', () => {
			expect( List( 1, List() ).value ).to.eql( oneList )
		} )
	} )

	describe( '#prelude', () => {
		describe( '#head', () => {
			it( 'head (x:xs) -> x', () => {
				expect( List( 1, List( 2 ) ).head ).to.eql( 1 )
			} )
		} )

		describe( '#tail', () => {
			it( 'tail () -> null', () => {
				expect( List().tail ).to.be.null
			} )

			it( 'tail (x) -> null', () => {
				expect( List( 1 ).tail ).to.be.null
			} )

			it( 'tail (x:y) -> y', () => {
				expect( List( 1, List( 2 ) ).tail ).to.eql( 2 )
			} )

			it( 'tail (x:xs) -> (xs)', () => {
				expect( List( 3, List( 1, List( 2 ) ) ).tail.value ).to.eql( twoList )
			} )
		} )

		describe( '#tail', () => {
			it( 'take 0 xs -> ()', () => {
				expect( List().take( 0 ).value ).to.eql( emptyList )
			} )

			it( 'take N () -> ()', () => {
				expect( List().take( 1 ).value ).to.eql( emptyList )
			} )

			it( 'should return up to N elements', () => {
				const l1 = List( 1, List( 2, List( 3 ) ) )

				expect( l1.take( 2 ).value ).to.eql( twoList )
			} )

			it( 'should return up to the length of the list', () => {
				expect( List( 1 ).take( 2 ).value ).to.eql( oneList )
			} )
		} )
	} )

	describe( '#monoid', () => {
		const l0 = List()
		const l1 = List( 1 )
		const l2 = List( 1, List( 2 ) )

		describe( 'mempty', () => {
			it( 'should be an empty list', () => {
				expect( mempty( l0 ).value ).to.eql( emptyList )
			} )

			it( 'should hold right identity under mappend', () => {
				expect( mappend( l0, mempty( l0 ) ).value, 'empty list' ).to.eql( emptyList )
				expect( mappend( l1, mempty( l0 ) ).value, 'single-element list' ).to.eql( oneList )
				expect( mappend( l2, mempty( l0 ) ).value, 'multi-element list' ).to.eql( twoList )
			} )

			it( 'should hold left identity under mappend', () => {
				expect( mappend( mempty( l0 ), l0 ).value, 'empty list' ).to.eql( emptyList )
				expect( mappend( mempty( l0 ), l1 ).value, 'single-element list' ).to.eql( oneList )
				expect( mappend( mempty( l0 ), l2 ).value, 'multi-element list' ).to.eql( twoList )
			} )
		} )

		describe( 'mappend', () => {
			it( 'should join two single-element lists into one multi-element list', () => {
				expect( List( 1 ).mappend( List( 2 ) ).value ).to.eql( twoList )
			} )

			it( 'should join two multi-element lists into one multi-element list', () => {
				const l1 = List( 1, List( 2 ) )
				const l2 = List( 3, List( 4 ) )

				expect( mappend( l1, l2 ).value ).to.eql( { head: 1, tail: { head: 2, tail: { head: 3, tail: { head: 4, tail: null } } } } )
			} )

			it( 'should hold associativity', () => {
				const l1 = List( 1 )
				const l2 = List( 2 )
				const l3 = List( 3 )

				expect( mappend( l1, mappend( l2, l3 ) ).value ).to.eql( mappend( mappend( l1, l2 ), l3 ).value )mappend( l3 ) ) ).value )
			} )
		} )
	} )
} )
