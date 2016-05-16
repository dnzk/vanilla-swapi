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
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'build',
        },
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
    clean: {
      build: {
        src: ['build']
      }
    },
    copy: {
      font: {
        expand: true,
        cwd: 'bower_components/components-font-awesome/fonts',
        src: '**',
        dest: 'build/assets/fonts/'
      }
    }
  });

  var npmTasks = [
    'grunt-contrib-pug',
    'grunt-contrib-less',
    'grunt-contrib-watch',
    'grunt-contrib-connect',
    'grunt-contrib-clean',
    'grunt-contrib-copy',
  ];
  npmTasks.forEach(function(npmTask) {
    grunt.loadNpmTasks(npmTask);
  });

  grunt.registerTask('dev', ['clean:build', 'pug:compile', 'less:develop', 'copy:font', 'connect:server', 'watch']);
  
};
