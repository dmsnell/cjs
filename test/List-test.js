import { expect } from 'chai'

import List from '../lib/list.js'

const emptyList = { head: null, tail: null }
const oneList = { head: 1, tail: null }
const twoList = { head: 1, tail: { head: 2, tail: null } }

const mempty = List().mempty

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

	describe( '#monoid', () => {
		describe( 'mempty', () => {
			it( 'should be an empty list', () => {
				expect( mempty.value ).to.eql( emptyList )
			} )

			it( 'should hold right identity under mappend', () => {
				expect( List().mappend( mempty ).value, 'empty list' ).to.eql( emptyList )
				expect( List( 1 ).mappend( mempty ).value, 'single-element list' ).to.eql( oneList )
				expect( List( 1, List( 2 ) ).mappend( mempty).value, 'multi-element list' ).to.eql( twoList )
			} )

			it( 'should hold left identity under mappend', () => {
				expect( mempty.mappend( List() ).value, 'empty list' ).to.eql( emptyList )
				expect( mempty.mappend( List( 1 ) ).value, 'single-element list' ).to.eql( oneList )
				expect( mempty.mappend( List( 1, List( 2 ) ) ).value, 'multi-element list' ).to.eql( twoList )
			} )
		} )

		describe( 'mappend', () => {
			it( 'should behave like #construct for two single-element lists', () => {
				expect( List( 1 ).mappend( List( 2 ) ).value ).to.eql( List( 1, List( 2 ) ).value )
			} )

			it( 'should join two single-element lists into one multi-element list', () => {
				expect( List( 1 ).mappend( List( 2 ) ).value ).to.eql( twoList )
			} )

			it( 'should join two multi-element lists into one multi-element list', () => {
				const l1 = List( 1, List( 2 ) )
				const l2 = List( 3, List( 4 ) )

				expect( l1.mappend( l2 ).value ).to.eql( { head: 1, tail: { head: 2, tail: { head: 3, tail: { head: 4, tail: null } } } } )
			} )

			it( 'should hold associativity', () => {
				const l1 = List( 1 )
				const l2 = List( 2 )
				const l3 = List( 3 )

				expect( l1.mappend( l2 ).mappend( l3 ).value, 'a+b+c = (a+b)+c' ).to.eql( ( l1.mappend( l2 ) ).mappend( l3 ).value )
				expect( l1.mappend( l2 ).mappend( l3 ).value, 'a+b+c = a+(b+c)' ).to.eql( l1.mappend( ( l2.mappend( l3 ) ) ).value )
				expect( ( l1.mappend( l2 ) ).mappend( l3 ).value, '(a+b)+c = a+(b+c)' ).to.eql( l1.mappend( ( l2.mappend( l3 ) ) ).value )
			} )
		} )
	} )
} )
