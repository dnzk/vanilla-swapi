module.exports = function(grunt) {

  grunt.initConfig({
    less: {
      develop: {
        files: {
          'build/assets/style/app.css': 'src/assets/style/app.less'
        }
      }
    },
    pug: {
      compile: {
        options: {
          pretty: true,
        },
        files: [
          {
            src: 'src/index.pug',
            dest: 'build/index.html'
          },
          {
            cwd: 'src/assets/template',
            src: '**/*.pug',
            dest: 'build/assets/template',
            expand: true,
            ext: '.html'
          }
        ]
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
      },
      js: {
        files: ['src/**/*.js'],
        tasks: ['copy:js']
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
      },
      js: {
        expand: true,
        cwd: 'src/assets/script',
        src: '*.js',
        dest: 'build/assets/script'
      },
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

  grunt.registerTask('dev', ['clean:build', 'pug:compile', 'less:develop', 'copy:font', 'copy:js', 'connect:server', 'watch']);
  
};
