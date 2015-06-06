'use strict';
module.exports = function (grunt) {
  // Show elapsed time at the end
  require('time-grunt')(grunt);
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: ['Gruntfile.js']
      },
      js: {
        src: ['index.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },
    mochacli: {
      all: ['test/*.js']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      js: {
        files: '<%= jshint.js.src %>',
        tasks: ['jshint:js', 'mochacli']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'mochacli']
      }
    },
    browserify: {
      'fledit.js': 'index.js',
      options: {
        browserifyOptions: {
          standalone: 'Fledit'
        }
      }
    },
    uglify: {
      'fledit.min.js': 'fledit.js'
    }
  });

  grunt.registerTask('default', ['jshint', 'mochacli']);
  grunt.registerTask('bower', ['browserify', 'uglify']);
};
