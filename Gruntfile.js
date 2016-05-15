module.exports = function(grunt) {

  grunt.initConfig({
    pug: {
      compile: {
        options: {
          pretty: true,
        },
        files: {
          'build/index.html': 'src/index.pug',
        }
      }
    }
  });

  var npmTasks = ['grunt-contrib-pug'];
  npmTasks.forEach(function(npmTask) {
    grunt.loadNpmTasks(npmTask);
  });
  
};
