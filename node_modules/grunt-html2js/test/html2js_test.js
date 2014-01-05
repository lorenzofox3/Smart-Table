'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var assertFileContentsEqual = function(test, actualFile, expectedFile, message) {

  var actual = grunt.file.read(actualFile);
  var expected = grunt.file.read(expectedFile);
  test.equal(actual, expected, message);
};

exports.html2js = {

  setUp: function(done) {
    // setup here if necessary
    done();
  },

  regex_in_template: function(test) {

    test.expect(1);

    assertFileContentsEqual(test, 'tmp/regex_in_template.js',
          'test/expected/regex_in_template.js',
          'expected compiled template module');

    test.done();
  },
  compact_format_default_options: function(test) {

    test.expect(1);

    assertFileContentsEqual(test, 'tmp/compact_format_default_options.js',
          'test/expected/compact_format_default_options.js',
          'expected compiled template module');

    test.done();
  },
  files_object_default_options: function(test) {

    test.expect(2);

    assertFileContentsEqual(test, 'tmp/files_object_default_options_1.js',
          'test/expected/files_object_default_options_1.js',
          'expected compiled template module');

    assertFileContentsEqual(test, 'tmp/files_object_default_options_2.js',
          'test/expected/files_object_default_options_2.js',
          'expected compiled template module');

    test.done();
  },
  files_array_default_options: function(test) {

    test.expect(2);

    assertFileContentsEqual(test, 'tmp/files_array_default_options_1.js',
          'test/expected/files_array_default_options_1.js',
          'expected compiled template module');

    assertFileContentsEqual(test, 'tmp/files_array_default_options_2.js',
          'test/expected/files_array_default_options_2.js',
          'expected compiled template module');

    test.done();
  },
  compact_format_custom_options: function(test) {

    test.expect(1);

    assertFileContentsEqual(test, 'tmp/compact_format_custom_options.js',
          'test/expected/compact_format_custom_options.js',
          'expected compiled template module');

    test.done();
  },
  files_object_custom_options: function(test) {

    test.expect(2);

    assertFileContentsEqual(test, 'tmp/files_object_custom_options_1.js',
          'test/expected/files_object_custom_options_1.js',
          'expected compiled template module');

    assertFileContentsEqual(test, 'tmp/files_object_custom_options_2.js',
          'test/expected/files_object_custom_options_2.js',
          'expected compiled template module');

    test.done();
  },
  files_array_custom_options: function(test) {

    test.expect(2);

    assertFileContentsEqual(test, 'tmp/files_array_custom_options_1.js',
          'test/expected/files_array_custom_options_1.js',
          'expected compiled template module');

    assertFileContentsEqual(test, 'tmp/files_array_custom_options_2.js',
          'test/expected/files_array_custom_options_2.js',
          'expected compiled template module');

    test.done();
  },
  multi_lines: function(test) {

    test.expect(1);

    assertFileContentsEqual(test, 'tmp/multi_lines.js',
          'test/expected/multi_lines.js',
          'expected compiled template module');

    test.done();
  },
  multi_lines_4spaces: function(test) {

    test.expect(1);

    assertFileContentsEqual(test, 'tmp/multi_lines_4spaces.js',
        'test/expected/multi_lines_4spaces.js',
        'expected compiled template module');

    test.done();
  },
  multi_lines_tabs: function(test) {

    test.expect(1);

    assertFileContentsEqual(test, 'tmp/multi_lines_tabs.js',
        'test/expected/multi_lines_tabs.js',
        'expected compiled template module');

    test.done();
  },
  double_quotes: function(test) {

    test.expect(1);

    assertFileContentsEqual(test, 'tmp/double_quotes.js',
        'test/expected/double_quotes.js',
        'expected compiled template module');

    test.done();
  },
  single_quotes: function(test) {

    test.expect(1);

    assertFileContentsEqual(test, 'tmp/single_quotes.js',
        'test/expected/single_quotes.js',
        'expected compiled template module');

    test.done();
  },
  file_header: function(test) {

    test.expect(1);

    assertFileContentsEqual(test, 'tmp/file_header.js',
        'test/expected/file_header.js',
        'expected compiled template module');

    test.done();
  },
  rename: function(test) {

    test.expect(1);

    assertFileContentsEqual(test, 'tmp/rename.js',
          'test/expected/rename.js',
          'expected compiled template module');

    test.done();
  },
  coffee: function(test) {

    test.expect(1);

    assertFileContentsEqual(test, 'tmp/coffee.coffee',
          'test/expected/coffee.coffee',
          'expected compiled template module');

    test.done();
  }
};
