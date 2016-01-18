const l = console.log

// function
export const compose = ( ...fs ) => {
	if ( 0 === fs.length ) { return () => null }
	if ( 1 === fs.length ) { return fs[0] }

	const first = fs.slice( -1 )[ 0 ]
	const next  = compose( ...fs.slice( 0, -1 ) )

	return ( ...args ) => next( first( ...args ) )
}

export const partial = ( ...args ) => {
	const [ f, ...partials ] = args

	return ( ...rest ) => f( ...[ ...partials, ...rest] )
}

// list
export const head = l1 => l1.head

export const tail = l1 => l1.tail

export const take = ( n, l1 ) => l1.take( n )