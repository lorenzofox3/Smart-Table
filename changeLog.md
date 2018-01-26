## version 1.1.0

* allow binding on search predicate ([#142](https://github.com/lorenzofox3/Smart-Table/issues/142)).
Note that if you want to search against a property name you have now to put in under single quote otherwise it will be considered as a binding
```markup
<input st-search="'name'"/>
```

## version 1.1.1

* fix [#146](https://github.com/lorenzofox3/Smart-Table/issues/146) and [#148](https://github.com/lorenzofox3/Smart-Table/issues/148), set stPipe before stPagination is called. Thanks [brianchance](https://github.com/brianchance)

## version 1.2.1

* implement [#149](https://github.com/lorenzofox3/Smart-Table/issues/149) (default sorting)

## version 1.2.2

* hide pagination when less than 1 page
* add unit tests for pagination directive

## version 1.2.3

* fix back to natural sort order
* use same strategy view -> table state, table state -> view for all the plugins

## version 1.2.4

* fix [#161](https://github.com/lorenzofox3/Smart-Table/issues/161) 

## version 1.2.5

* fix [#162](https://github.com/lorenzofox3/Smart-Table/issues/162)

## version 1.2.6

* fix [#165](https://github.com/lorenzofox3/Smart-Table/issues/165)
* ability to overwrite class names for (st-sort-ascent and st-sort-descent) thanks to [replacement87](https://github.com/replacement87)

## version 1.2.7

* fix [#167](https://github.com/lorenzofox3/Smart-Table/issues/167)

## version 1.3.0

* new feature, items by page and displayed page can be bound

## version 1.4.0

* support external template for pagination
* support angular v1.3.x

## version 1.4.1

* ability to skip natural ordering state (ie fix [#192](https://github.com/lorenzofox3/Smart-Table/issues/192))

## versiokn 1.4.2

* fix [#200](https://github.com/lorenzofox3/Smart-Table/issues/200), `this` in a custom pipe function does not refer to the table controller anymore, and the signature of a custom pipe function is
```javascript
function(tableState, tableController){

}
```

## version 1.4.3

* ability to set filter function <code>st-set-filter</code>
* ability to set sort function <code>st-set-sort</code>

## version 1.4.4

* patch for sync problem

## version 1.4.5

* merge [#234](https://github.com/lorenzofox3/Smart-Table/issues/234), [#218](https://github.com/lorenzofox3/Smart-Table/issues/218)
* fix [#233](https://github.com/lorenzofox3/Smart-Table/issues/2332), [#237](https://github.com/lorenzofox3/Smart-Table/issues/237)

## version 1.4.6

* evaluate sort predicate as late as possible
* fix [#262](https://github.com/lorenzofox3/Smart-Table/issues/262)

## version 1.4.7

* fix [#276](https://github.com/lorenzofox3/Smart-Table/issues/276)

## version 1.4.8

* fix [#281](https://github.com/lorenzofox3/Smart-Table/issues/281)

## version 1.4.9

* fix [#285](https://github.com/lorenzofox3/Smart-Table/issues/285)

## version 1.4.10

* fix [#284](https://github.com/lorenzofox3/Smart-Table/issues/284)
* fix [#290](https://github.com/lorenzofox3/Smart-Table/issues/290)

## version 1.4.11

* fix [#296](https://github.com/lorenzofox3/Smart-Table/issues/296)
* add possibility to bind a callback when page changes

## version 1.4.12

* don't use pagination class twice
* build improvement

## version 1.4.13

* use a global configuration
* expose filtered collection result

## version 2.0.0

* use interpolation rather than binding for st-search directive (to avoid the creation of isolated scope)

**This is a breaking change as now, you will have to remove the single quote around the predicate property name, and if you were using a binding, you'll have to interpolate it with the curly brace notation**

## version 2.0.1

* fix [#328](https://github.com/lorenzofox3/Smart-Table/issues/328)

## version 2.0.2

* add debounce to custom pipe function to make sure tableState is stable
* fix [#329](https://github.com/lorenzofox3/Smart-Table/issues/329)

## version 2.0.3

* implements [#379](https://github.com/lorenzofox3/Smart-Table/issues/379)
* fix [#390](https://github.com/lorenzofox3/Smart-Table/issues/390)

## version 2.1.0

* support nested search (thanks to @jansabbe)
* fix [#254](https://github.com/lorenzofox3/Smart-Table/issues/254)
* fix wrong path to default config for stSkipNatural (@phuvo)
* fix [#406](https://github.com/lorenzofox3/Smart-Table/issues/406)

## version 2.1.1

* support commonjs 
* add totalItemCount on tableState (@eirikbell)

## version 2.1.2

* improve build [#461](https://github.com/lorenzofox3/Smart-Table/issues/461) [stanleyxu](https://github.com/stanleyxu2005)

## version 2.1.3

* fix [#477](https://github.com/lorenzofox3/Smart-Table/issues/477)

## version 2.1.4

* add throttle to sort
* add watch to first item in collection (@matthewbednarski)

## version 2.1.5

* added multiple sort support to st-sort, [#544](https://github.com/lorenzofox3/Smart-Table/issues/544)
* fix [#533](https://github.com/lorenzofox3/Smart-Table/issues/533)
* fix [#515](https://github.com/lorenzofox3/Smart-Table/issues/515)

## version 2.1.6

* fix [#559](https://github.com/lorenzofox3/Smart-Table/issues/559)

## version 2.1.7

* fix [#468](https://github.com/lorenzofox3/Smart-Table/issues/468) thanks to Douglas-Treadwell

