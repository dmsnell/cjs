import { AssertionError } from 'chai'

import ListTest from './List-test.js'

const l = console.log

try {
	ListTest()

	l( 'All tests passed' )
} catch ( e ) {
	if ( e instanceof AssertionError ) {
		l( e.message )
		l( e.actual )
		l( e.expected )
	} else {
		l( e )
	}
}