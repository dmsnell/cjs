import { expect } from 'chai'

import {
	head, tail, take
} from '../lib/prelude.js'
import List from '../lib/list.js'

describe( 'Prelude', () => {
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