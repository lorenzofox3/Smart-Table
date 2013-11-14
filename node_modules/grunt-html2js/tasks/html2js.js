/*
 * grunt-html2js
 * https://github.com/karlgoldstein/grunt-html2js
 *
 * Copyright (c) 2013 Karl Goldstein
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var path = require('path');

  var escapeContent = function(content, quoteChar, indentString) {
    var bsRegexp = new RegExp('\\\\', 'g');
    var quoteRegexp = new RegExp('\\' + quoteChar, 'g');
    var nlReplace = '\\n' + quoteChar + ' +\n' + indentString + indentString + quoteChar;
    return content.replace(bsRegexp, '\\\\').replace(quoteRegexp, '\\' + quoteChar).replace(/\r?\n/g, nlReplace);
  };

  // convert Windows file separator URL path separator
  var normalizePath = function(p) {
    if ( path.sep !== '/' ) {
      p = p.replace(/\\/g, '/');
    }
    return p;
  };

  // Warn on and remove invalid source files (if nonull was set).
  var existsFilter = function(filepath) {

    if (!grunt.file.exists(filepath)) {
      grunt.log.warn('Source file "' + filepath + '" not found.');
      return false;
    } else {
      return true;
    }
  };

  // compile a template to an angular module
  var compileTemplate = function(moduleName, filepath, quoteChar, indentString) {

    var content = escapeContent(grunt.file.read(filepath), quoteChar, indentString);
    var doubleIndent = indentString + indentString;

    var module = 'angular.module(' + quoteChar + moduleName +
      quoteChar + ', []).run([' + quoteChar + '$templateCache' + quoteChar + ', function($templateCache) ' +
      '{\n' + indentString + '$templateCache.put(' + quoteChar + moduleName + quoteChar + ',\n' + doubleIndent  + quoteChar +  content +
       quoteChar + ');\n}]);\n';

    return module;
  };

  // compile a template to an angular module
  var compileCoffeeTemplate = function(moduleName, filepath, quoteChar, indentString) {
    var content = escapeContent(grunt.file.read(filepath), quoteChar, indentString);
    var doubleIndent = indentString + indentString;

    var module = 'angular.module(' + quoteChar + moduleName +
      quoteChar + ', []).run([' + quoteChar + '$templateCache' + quoteChar + ', ($templateCache) ->\n' +
      indentString + '$templateCache.put(' + quoteChar + moduleName + quoteChar + ',\n' + doubleIndent  + quoteChar +  content +
      quoteChar + ')\n])\n';

    return module;
  };

  grunt.registerMultiTask('html2js', 'Compiles Angular-JS templates to JavaScript.', function() {

    var options = this.options({
      base: 'src',
      module: 'templates-' + this.target,
      quoteChar: '"',
      fileHeaderString: '',
      indentString: '  ',
      target: 'js'
    });

    // generate a separate module
    this.files.forEach(function(f) {

      // f.dest must be a string or write will fail

      var moduleNames = [];

      var modules = f.src.filter(existsFilter).map(function(filepath) {

        var moduleName = normalizePath(path.relative(options.base, filepath));
        if(grunt.util.kindOf(options.rename) === 'function') {
          moduleName = options.rename(moduleName);
        }
        moduleNames.push("'" + moduleName + "'");
        if (options.target === 'js') {
          return compileTemplate(moduleName, filepath, options.quoteChar, options.indentString);
        } else if (options.target === 'coffee') {
          return compileCoffeeTemplate(moduleName, filepath, options.quoteChar, options.indentString);
        } else {
          grunt.fail.fatal('Unknow target "' + options.target + '" specified');
        }

      }).join(grunt.util.normalizelf('\n'));

      var fileHeader = options.fileHeaderString !== '' ? options.fileHeaderString + '\n' : '';
      var bundle = "";
      var targetModule = f.module || options.module;
      //Allow a 'no targetModule if module is null' option
      if (targetModule) {
        bundle = "angular.module('" + targetModule + "', [" + moduleNames.join(', ') + "])";
        if (options.target === 'js') {
          bundle += ';';
        }

        bundle += "\n\n";
      }
      grunt.file.write(f.dest, fileHeader + bundle + modules);
    });
    //Just have one output, so if we making thirty files it only does one line
    grunt.log.writeln("Successfully converted "+(""+this.files.length).green +
                      " html templates to " + options.target + ".");
  });
};
