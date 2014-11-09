module.exports = function( grunt ) {
  // Add the library tasks
  grunt.loadNpmTasks( "grunt-mocha-test" );
  grunt.loadNpmTasks( "grunt-contrib-jshint" );
  grunt.loadNpmTasks( "grunt-contrib-clean" );
  grunt.loadNpmTasks( "grunt-browserify" );

  grunt.initConfig({
    pkg: grunt.file.readJSON( "package.json" ),

    jshint: {
      files: [
        "Gruntfile.js",
        "index.js",
        "test/*.js",
        "./*.js",
        "client/index.js"
      ]
    },

    clean: [ "public/js/main.js" ],
    mochaTest: {
      test: {
        options: {
          reporter: "spec",
          timeout: "20000"
        },
        src: [ "./test/test.js" ]
      }
    },
    browserify: {
      main: {
        src: "./client/index.js",
        dest: "./public/js/main.js",
      }
    }
  });

  // Register custom tasks
  grunt.registerTask( "default", [ "jshint", "mochaTest" ]);
  grunt.registerTask( "travis", [ "jshint", "mochaTest" ]);
  grunt.registerTask( "build", [ "clean", "browserify:main" ]);
};
