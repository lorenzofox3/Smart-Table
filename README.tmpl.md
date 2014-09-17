# <%- name %> an easy to use table/grid 

[![Build Status](https://secure.travis-ci.org/turn/<%- name %>.png)](http://travis-ci.org/turn/<%- name %>)

## Turn fork modifications

- Added mock server in ./example-server
- Example in ./example-app now loads data from mock server
- Set "sort-ascent"/"sort-descent" class on `<th>`'s directly (rather than on the `<span>` inside them)
- Removed `isGlobalSearchActivated` flag
- Added Fixed subHeader functionality

### Events

```js
// search
scope.$on('search', function (event, column) {
    ...
});
// sort
scope.$on('sortColumn', function (event, column) {
    ...
});
```

### Table options

- `serverSideSort` (default: `false`)
- `serverSideFilter` (default: `false`)

## How to use Smart-Table

1. Install smart table: `npm install --save git://github.com/turn/Smart-Table.git#v<%- version %>`
2. Then require it in your module:

```js
require('<%- name %>');

angular
.module('myApp', ['smartTable.table'])
...
```

This project is a lightweight table/grid builder. It is meant to be easy configurable but also easy customisable
(if you want to use it as a base for your own grid development). In The current version (0.1.0) the features are

* table markup: it is a table and follows the semantic of an HTML table.
* manage your layout: you can choose the number of columns and how the should be mapped to your data model
* format data: you can choose how the data are formatted within a given column:
    * by giving your own format function
    * using one of the built-in angular filters
* Sort data
    * using your own algorithm
    * using the 'orderBy' angular algorithm: in this case you'll be able to provide predicates as explained in [orderBy filter documentation](http://docs.angularjs.org/api/ng.filter:orderBy)
* Filter data
    * using a global search input box
    * using the controller API to filter according to a particular column
* Select data row(s) according to different modes:
    * single: one row selected at the time
    * multiple: many row selected at the time. In this case you can also add a selection column with checkboxes
* Simple style: you can easily give class name to all the cells of a given column and to the header as well
* template cell:
    * you can provide template for a given column header (it will be compiled so that you can attach directves to it)
    * same for the data cells
* Edit cells: you can make cells editable and specify a type for the input so that validation rules, etc will be applied
* Client side pagination : you can choose the number of rows you want to display and use the [angular-ui.bootstrap](http://angular-ui.github.io/bootstrap/) pagination directive to navigate.
* All the directives of the table use the table controller API. It means that you can easily change the templates and directives but still using the API to perform any operation
* Sub-headers feature
    * Sub-headers can be configured through 'sub-headers' attribute in '<smart-table>' directive
    * Provide array of objects in '<smart-table>' directive
    * subHeaderCellClass, subHeaderTemplateUrl, formatFunction, formatParameter features are available on 'subHeaders'
```js
// Configure sub-headers data below example is for configuring multiple sub-headers
scope.subHeaders = [{
					'foo':{'label':'subHeader1-firstColumn','subHeaderCellClass':'subHeader1'},
					'bar':{'label':'subHeader1--secondColumn','subHeaderCellClass':'subHeader2','formatFunction':'uppercase', 'subHeaderTemplateUrl' : 'subHeaderURL.html'},
					}, {
					'foo':{'label':'subHeader2-firstColumn','subHeaderCellClass':'subHeader1'},
					'bar':{'label':'subHeader2--secondColumn','subHeaderCellClass':'subHeader2','formatFunction':'uppercase'},
					}];
```
You'll find running examples and more documentation at [the demo website](http://lorenzofox3.github.io/smart-table-website/)

## Smart Table for developers

### How does Smart-Table work ?

If you want to adapt smart-table to your own flow, it is really easy. But first you should understand how it works, so you will know what to change to customise it.

The `Table.js` file is the key. When you bind a dataCollection to the smart table directive
```html
<smart-table rows="dataCollection" columns="myColumns"></smart-table>
```
the table controller (Table.js) will have access to this data collection through the scope. This controller provides an API which table child directives (`Directives.js`) will be able to call.
Through this API calls, the controller will perform some operations on the dataCollection (sort,filter, etc) to build a subset of dataCollection (displayedCollection) which is the actual displayed data.
Most of the API method simply change table controller or scope variables and then call the `pipe` function which will actually chain the operations to build the subset (displayedCollection) and regarding to the updated
local/scope variables. The `Column.js` simply wraps (and add some required properties) to your column configuration to expose it to the table child directives through the scope.

So, at the end you don't even have to use the provided directives and build yours if you want a special behavior.

###The build process

```bash
npm install
grunt build
```

The build tasks use [Grunt](http://gruntjs.com/):
* if you run `grunt build` it will perform the following operations:
    * transform the template (.html) files into an angular module and load them in the [$templateCache](http://docs.angularjs.org/api/ng.$templateCache) (it will result with the `Template.js` file.
    * concatenate all the source files into a single one (Smart-Table.debug.js)
    * minify the debug file so you have a production ready file (Smart-Table.min.js)

### Example app
The example app is a running example of <%- name %> in action. To run it:

```bash
# serve mock JSON from <portA>
cd example-server
npm install
node index <portA>

# start static file server on <portB>
npm install -g git://github.com/visionmedia/serve.git # NPM isn't up to date, so install directly from git
cd Smart-Table
serve . --port <portB>
```

Then open [http://local:portB/example-app/](http://local:8000/example-app/) in a browser.

### Developing Smart-Table

Say you have <%- name %> in one folder, and your project (let's call it "Foo") that depends on <%- name %> in another folder. You want to make changes to <%- name %>, and see your changes reflected immediately in Foo:

```bash
cd <%- name %>
npm install

# watch for changes and automatically trigger rebuilds for <%- name %>.debug.js and <%- name %>.min.js
grunt watch

# see npmjs.org/doc/cli/npm-link.html
npm link

cd Foo
npm install --save git://github.com/turn/Smart-Table.git#v<%- version %>
npm link <%- name %>
```

### Running unit tests

```bash
npm install
karma start config/karma.conf.js
karma run
```

## License

Smart Table module is under MIT license:

> Copyright (C) 2013 Laurent Renard.
>
> Permission is hereby granted, free of charge, to any person
> obtaining a copy of this software and associated documentation files
> (the "Software"), to deal in the Software without restriction,
> including without limitation the rights to use, copy, modify, merge,
> publish, distribute, sublicense, and/or sell copies of the Software,
> and to permit persons to whom the Software is furnished to do so,
> subject to the following conditions:
>
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
> NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
> BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
> ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
> CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.