import { expect } from 'chai'

import List from '../lib/list.js'
import { mappend, mempty } from '../lib/monoid.js'
import {
	compose, partial,
	head, tail, take
} from '../lib/prelude.js'

describe( 'Random tests', () => {
	it( 'head . tail', () => {
		const l3 = List( 1, List( 2, List( 3 ) ) )
		const second = compose( head, tail )

		expect( second( l3 ) ).to.eql( 2 )
	} )

	it( '(take 2) . tail', () => {
		const l3 = List( 1, List( 2, List( 3 ) ) )
		const secondTwo = compose( partial( take, 2 ), tail )

		expect( secondTwo( l3 ).value ).to.eql( List( 2, List( 3 ) ).value )
	} )
} )