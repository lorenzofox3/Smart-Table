# Smart Table with all logic on server side

This is a short example on how to customise [smart-table module](https://github.com/lorenzofox3/Smart-Table) so that you move all the logic on server side (sort, filter, etc)

## Dummy server

The server provided by the [angular seed](https://github.com/angular/angular-seed) has been changed a bit to return a random set of ten items on any POST
request (see [commit](https://github.com/lorenzofox3/Smart-Table/commit/2b305a34bf981212594c30a6df59b44f4010c13d)).
Even if HTTP POST request is not the best semantic for our purpose, I have used it only because GET was already mapped (So it just for convenience purpose).
Anyway, the only thing important here is to know that on any POST request the server will return a set of 10 items.

But please note :
 **No logic was implemented on the server side, it only returns random set of data. So if you expect see sorted, filtered data you will be disapointed. It is just
  because I was lazy. But the idea is the same, when you click on sort an appropriate request is sent to the server**

## Understand how smart table module work

I strongly advice to read the dedicated paragraph on the [README.md](https://github.com/lorenzofox3/Smart-Table#how-does-smart-table-work-) of the master branch before going further

##The few changes to do

1. Remove the binding to the dataCollection from the smart-table directives (in Directive.js) and any reference to `scope.dataCollection` in `Table.js`. (Everything is done by the server now) [commit](https://github.com/lorenzofox3/Smart-Table/commit/2a36d7199233c908b1bf6f327cbe23bb6d504918)
2. In `Table.js` inject a service as your HTTP interface ($http in my example), and change the `this.pipe` function  to build the appropriate http request [see commit](https://github.com/lorenzofox3/Smart-Table/commit/b89954ee94ccbfa6e8c78d6945a212ee72cca826#L0R454)
3. That is (<10 lines), then you can add fine tuning (loading indicator, etc)

## see the example running

1. Launch the web server `node web-server.js`
2. Browse to your [localhost](http://localhost:8000/example-app/index.html)

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

## Contact

For more information on Smart Table, please contact the author at laurent34azerty@gmail.com