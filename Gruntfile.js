module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'client/app/**/*.js', 'client/database/**/*.js', 'spec/**/*.js']
    },
    concat: {
      dist: {
        src: ['client/app/**/*.js', 'client/database/**/*.js'],
        dest: 'client/dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      dist: {
        files : {
          'dist/<%= pkg.name %>.min.js' : ['client/dist']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

}