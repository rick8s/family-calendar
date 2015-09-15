module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['../app/controllers/**/*.js']
    },
    sass: {
      dist: {
        files: {
          '../styles/main.css': '../sass/main.scss'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['../app/controllers/**/*.js'],
        tasks: ['jshint']
      },
    	sassy: {
      	files: ['../sass/**/*.scss'],
      	tasks: ['sass']
    	}
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'watch']);
};
