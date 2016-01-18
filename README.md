# Categorical enhancements to JavaScript

The goal of this project is to experiment with Haskell-like categorical functionality in JavaScript.
It differs from a functional library like **lodash** in that the goal isn't merely to provide a way
to program functionally, but to extend the syntax of JavaScript to make it more natural to program
this way.

## Examples

### Getting the second two elements in a list
```js
const secondTwoVanilla = l => l.slice( 1, 3 )

const secondTwo_ = _.partialRight( _.slice, 1, 3 )
 
const secondTwo = compose( partial( take, 2 ), tail )
```

### Type class instances
Type class inheritence follows duck-typing on the instance methods.

```js
import { mempty, mappend } from 'lib/monoid'

const additionWithZero = value => {
	value,
	mempty: 0,
	mappend( v2 ) { return additionWithZero( this.value + v2 ) }
}

const m0 = mempty( additionWithZero( 0 ) )
const [ m1, m2, m3 ] = [ 1, 2, 3 ].map( additionWithZero )

mappend( m0, m1 ) === m1
mappend( m1, m0 ) === m1
mappend( m1, mappend( m2, m3 ) ) === mappend( mappend( m1, m2 ), m3 )
```

The monoid laws hold for any type class inheriting `mempty` and `mappend`
```js
import List from 'lib/list'
import { mempty, mappend } from 'lib/monoid'

const l0 = mempty( List() )
const [ l1, l2, l3 ] = [ 1, 2, 3 ].map( List )

mappend( l0, l1 ) === l1
mappend( l1, l0 ) === l1
mappend( l1, mappend( l2, l3 ) ) === mappend( mappend( l1, l2 ), l3 )
```
