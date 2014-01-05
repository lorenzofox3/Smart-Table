# grunt-html2js

> Converts AngularJS templates to JavaScript

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-html2js --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-html2js');
```

## The "html2js" task

### Overview

Angular-JS normally loads templates lazily from the server as you reference them in your application (via `ng-include`, routing configuration or other mechanism).  Angular caches the source code for each template so that subsequent references do not require another server request.  However, if your application is divided into many small components, then the initial loading process may involve an unacceptably large number of additional server requests.

This plugin converts a group of templates to JavaScript and assembles them into an Angular module that primes the cache directly when the module is loaded.  You can concatenate this module with your main application code so that Angular does not need to make any additional server requests to initialize the application.

Note that this plugin does *not* compile the templates.  It simply caches the template source code.

### Setup

By default, this plugin assumes you are following the naming conventions and build pipeline of the [angular-app][https://github.com/angular-app/angular-app] demo application.

In your project's Gruntfile, add a section named `html2js` to the data object passed into `grunt.initConfig()`.

This simplest configuration will assemble all templates in your src tree into a module named `templates-main`, and write the JavaScript source for the module to `tmp/template.js`:

```js
grunt.initConfig({
  html2js: {
    options: {
      // custom options, see below    
    },
    main: {
      src: ['src/**/*.tpl.html'],
      dest: 'tmp/templates.js'
    },
  },
})
```

Assuming you concatenate the resulting file with the rest of your application code, you can then specify the module as a dependency in your code:

```
angular.module('main', ['templates-main'])
  .config(['$routeProvider', function ($routeProvidear) {
    $routeProvider.when('/somepath', {
      templateUrl:'some/template.tpl.html',
```

Note that you should use relative paths to specify the template URL, to
match the keys by which the template source is cached.

### Gotchas

The `dest` property must be a string.  If it is an array, Grunt will fail when attempting to write the bundle file.

### Options

#### options.base
Type: `String`
Default value: `'src'`

The prefix relative to the project directory that should be stripped from each template path to produce a module identifier for the template.  For example, a template located at `src/projects/projects.tpl.html` would be identified as just `projects/projects.tpl.html`.

#### options.target
Type: `String`
Default value: `'js'`

Language of the output file. Possible values: `'coffee'`, `'js'`.

#### options.module
Type: `String`
Default value: `templates-TARGET` 

The name of the parent Angular module for each set of templates.  Defaults to the task target prefixed by `templates-`.

If no bundle module is desired, set this to false.

#### options.rename
Type: `Function`
Default value: `none`

A function that takes in the module identifier and returns the renamed module identifier to use instead for the template.  For example, a template located at `src/projects/projects.tpl.html` would be identified as `/src/projects/projects.tpl` with a rename function defined as:

```
function (moduleName) {
  return '/' + moduleName.replace('.html', '');
}
```

#### options.quoteChar
Type: `Character`
Default value: `"`

Strings are quoted with double-quotes by default.  However, for projects 
that want strict single quote-only usage, you can specify:

```
options: { quoteChar: '\'' }
```

to use single quotes, or any other odd quoting character you want

#### indentString
Type: `String`
Default value: `  `

By default a 2-space indent is used for the generated code. However,
you can specify alternate indenting via:

```
options: { indentString: '    ' }
```

to get, for example, 4-space indents. Same goes for tabs or any other
indent system you want to use.

#### fileHeaderString: 
Type: `String`
Default value: ``

If specified, this string  will get written at the top of the output
Template.js file. As an example, jshint directives such as
/* global angular: false */ can be put at the head of the file.

### Usage Examples

See the `Gruntfile.js` in the project source code for various configuration examples.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

0.1.1 Build module even if templates do not exist yet

0.1.2 Preserve line feeds in templates to avoid breaking &lt;pre>-formatted text

0.1.3 Add option to set the `module` option to null to disable creation of bundle module

0.1.4 Add rename option

0.1.5 Add config options for quoteChar, indentString and fileHeaderString (thanks @jonathana)

0.1.6 Add support for CoffeeScript (thanks @srigi)

0.1.7 Escape backslashes in template source (issue #11, thanks @JoakimBe)
