module.exports = function(grunt) {

  grunt.initConfig({
    less: {
      develop: {
        files: {
          'build/app.css': 'src/app.less'
        }
      }
    },
    pug: {
      compile: {
        options: {
          pretty: true,
        },
        files: {
          'build/index.html': 'src/index.pug',
        }
      }
    },
    watch: {
      less: {
        files: ['src/**/*.less'],
        tasks: ['less:develop']
      },
      pug: {
        files: ['src/**/*.pug'],
        tasks: ['pug:compile']
      }
    },
  });

  var npmTasks = ['grunt-contrib-pug', 'grunt-contrib-less', 'grunt-contrib-watch'];
  npmTasks.forEach(function(npmTask) {
    grunt.loadNpmTasks(npmTask);
  });

  grunt.registerTask('dev', ['pug:compile', 'less:develop', 'watch']);
  
};
