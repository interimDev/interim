module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
          'client/dist/<%= pkg.name %>.min.js' : ['<%= concat.dist.dest %>']
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'concat', 'uglify']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};