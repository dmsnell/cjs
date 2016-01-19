import { expect } from 'chai'

import {
	Instance,
	compose, partial,
	head, tail, take
} from '../lib/prelude.js'
import List from '../lib/list.js'

const l = console.log

describe( 'Prelude', () => {
	describe( 'type classing', () => {
		function Monoid() { this.value = null }
		Monoid.prototype.mempty = function() { return this }
		Monoid.prototype.mappend = function() { return this }

		it( 'should add the provided methods', () => {
			function Sum( v ) { this.value = v }
			Instance( Monoid, Sum, {
				mempty () { return new Sum( 0 ) },
				mappend( s2 ) { return new Sum( this.value + s2.value ) }
			} )

			const s = new Sum()

			expect( s.mempty().value, 'mempty' ).to.eql( 0 )
			expect( s.mappend, 'mappend' ).to.be.a( 'function' )
		} )

		it( 'should throw a TypeError if missing a method', () => {
			function Sum( v ) { this.value = v }
			const createInstance = function() {
				Instance( Monoid, Sum, {
					get mempty () { return new Sum( 0 ) }
				} )
			}

			expect( createInstance ).to.throw( TypeError )
		} )
	} )

	describe( 'functions', () => {
		describe( 'compose', () => {
			const inc = a => a + 1
			const square = a => a * a

			it( 'should return a function', () => {
				expect( compose( inc, square ) ).to.be.a( 'function' )
			} )

			it( 'should preserve compositional order', () => {
				expect( compose( inc, square )( 1 ), 'inc . square' ).to.eql( 2 )
				expect( compose( square, inc )( 1 ), 'squre . inc' ).to.eql( 4 )
			} )
		} )

		describe( 'partial', () => {
			const add = ( a, b ) => a + b

			it( 'should return a function', () => {
				expect( partial( add ) ).to.be.a( 'function' )
			} )

			it( 'should apply zero args', () => {
				expect( partial( add )( 1, 2 ) ).to.eql( 3 )
			} )

			it( 'should apply one arg', () => {
				expect( partial( add, 1 )( 2 ) ).to.eql( 3 )
				expect( partial( add, 1 )( 1, 2 ) ).to.eql( 2 )
			} )

			it( 'should apply many args', () => {
				expect( partial( add, 1, 2 )() ).to.eql( 3 )
				expect( partial( add, 1, 2 )( 5 ) ).to.eql( 3 )
				expect( partial( add, 1, 2 )( 10, 10 ) ).to.eql( 3 )
			} )
		} )
	} )

	describe( 'lists', () => {
		it( 'should call head', () => {
			expect( head( List() ) ).to.be.null
			expect( head( List( 1 ) ) ).to.eql( 1 )
		} )

		it( 'should call tail', () => {
			expect( tail( List() ) ).to.be.null
			expect( tail( List( 1 ) ) ).to.be.null
			expect( tail( List( 1, List( 2 ) ) ) ).to.eql( 2 )
			expect( tail( List( 1, List( 2, List( 3 ) ) ).value ) ).to.eql( List( 2, List( 3 ) ).value )
		} )

		it( 'should call take', () => {
			expect( take( 1, List() ).value ).to.eql( List().value )
			expect( take( 2, List( 1 ) ).value ).to.eql( List( 1 ).value )
			expect( take( 2, List( 1, List( 2 ) ) ).value ).to.eql( List( 1, List( 2 ) ).value )
		} )
	} )
} )