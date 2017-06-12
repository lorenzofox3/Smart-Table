[![Build Status](https://travis-ci.org/lorenzofox3/Smart-Table.svg?branch=master)](https://travis-ci.org/lorenzofox3/Smart-Table)

# Smart Table

Smart Table is a table module for angular js. It allows you to quickly compose your table in a declarative way including sorting, filtering, row selection, and pagination.
It is lightweight (around 3kb minified) and has no other dependencies than Angular itself.
Check the [documentation](http://lorenzofox3.github.io/smart-table-website/) website for more details

## Submitting an issue

Please be responsible -- investigate potential issues yourself to eliminate the possibility that your issue isn't just an error.  If you are still having problems, try posting on our [gitter](https://gitter.im/lorenzofox3/Smart-Table).  When submitting an issue try as much as possible to:

1. Search in the already existing issues or on [stackoverflow](http://stackoverflow.com/questions/tagged/smart-table?sort=newest&pageSize=30) if your issue has not been raised before.

2. Give a precise description mentionning angular version, smart-table version.

3. Give a way to reproduce your issue, the best would be with a <strong>running example</strong>, you can use [plunkr](http://plnkr.co/) (smart-table is the list of available packages). Note if you want to mimic ajax loading behaviour you can use [$timeout](https://docs.angularjs.org/api/ng/service/$timeout) angular service or [$httpBackend](https://docs.angularjs.org/api/ng/service/$httpBackend).

4. Isolate your code sample on the probable issue to avoid pollution and noise.

5. Close your issue when a solution has been found (and share it with the community).

Note that 80% of the open issues are actually not issues but due to lack of good investigation. These issues create unnecessary work, so please be considerate.

Any open issue which do not follow the steps above will be closed without investigation.

## Install

The easiest way is to run `bower install angular-smart-table`, then you just have to add the script and register the module `smart-table` to you application.

You can also install using NPM `npm install angular-smart-table`, so you can use with browserify or webpack

## Test

Run `npm install` after you have installed the dependencies (`npm install` and `bower install`).

## Custom builds

Smart Table is based around a main directive which generate a top level controller whose API can be accessed by sub directives
(plugins). If you don't need some of these, simply edit the gulpfile (the pluginList variable) and run `gulp build`.

## Older versions

Smart Table used to be configuration based and if you rely on this version, you can still access the code on the [0.2.x](https://github.com/lorenzofox3/Smart-Table/tree/vx.2.x) branch. You will be able to find the documentation related to this version
[here](https://github.com/lorenzofox3/smart-table-website) (simply open index.html in a browser).

Note, I have closed all the issues related to these versions as people get confused when reading these issues and commented on them like it was related to the newer version. Feel free to reopen any of them (or open a new one), but don't forget to mention it is related to the older versions.

## License

Smart Table module is under MIT license:

> Copyright (C) 2016 Laurent Renard.
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
