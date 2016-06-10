'use strict';

module.exports = function(grunt) {

  // show elapsed time at the end
  require('time-grunt')(grunt);

  // load tasks on demand (speeds up dev)
  require('jit-grunt')(grunt, {
  });

  grunt.initConfig({
    yeoman: {
      src: 'src',
      dist: 'dist',
      test: 'test',
      pkg: grunt.file.readJSON('package.json'),
      meta: {
        banner: '/*! <%= yeoman.pkg.name %> - v<%= yeoman.pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '* <%= yeoman.pkg.homepage %>\n' +
          '* Copyright © <%= grunt.template.today("yyyy") %> ' +
          '<%= yeoman.pkg.author.name %>; Licensed <%= yeoman.pkg.license %> */\n'
      },
    },
    watch: {
      qa: {
        files: [
          '<%= yeoman.src %>/iptools-utils.js',
          '<%= yeoman.test %>/spec/test.js'
        ],
        tasks: ['concurrent:qa']
      },
      bdd: {
        files: [
          '<%= yeoman.src %>/iptools-utils.js',
          '<%= yeoman.test %>/spec/*.js',
          '<%= yeoman.test %>/index.html'
        ],
        tasks: ['test']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.src %>/{,*/}*.js',
        '<%= yeoman.test %>/spec/{,*/}*.js'
      ]
    },
    mocha: {
      all: {
        options: {
          run: true,
          log: true
        },
        src: ['<%= yeoman.test %>/index.html']
      }
    },
    concurrent: {
      qa: {
        tasks: [
          'jshint',
          'jscs',
          'mocha'
        ]
      },
      build: {
        tasks: [
          'uglify'
        ]
      },
      docs: {
        tasks: [
          'jsdoc2md'
        ]
      }
    },
    uglify: {
      options: {
        banner: '<%= yeoman.meta.banner %>'
      },
      dist: {
        files: {
          '<%= yeoman.dist %>/iptools-utils.min.js': ['<%= yeoman.src %>/iptools-utils.js']
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.dist %>/*'
          ]
        }]
      }
    },
    jscs: {
      options: {
        config: '.jscsrc',
        esnext: false,
        verbose: true
      },
      files: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.test %>/spec/*.js',
          '<%= yeoman.src %>/*.js'
        ]
      }
    },
    jsdoc2md: {
      oneOutputFile: {
        src: 'src/*.js',
        dest: 'api/documentation.md'
      },
      /*separateOutputFilePerInput: {
        files: [
          { src: 'src/jacket.js', dest: 'api/jacket.md' },
          { src: 'src/shirt.js', dest: 'api/shirt.md' }
        ]
      },*/
      withOptions: {
        options: {
          'no-gfm': true
        },
        src: 'src/*.js',
        dest: 'api/with-index.md'
      }
    }
  });

  grunt.loadNpmTasks('grunt-jsdoc-to-markdown');

  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('qa', ['concurrent:qa']);

  grunt.registerTask('build', [
    'concurrent:qa',
    'clean:dist',
    'concurrent:build'
  ]);

  grunt.registerTask('default', ['build']);

  grunt.registerTask('travis', ['concurrent:qa']);

  grunt.registerTask('docs', ['concurrent:docs']);
};
