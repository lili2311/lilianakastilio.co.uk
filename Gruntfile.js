module.exports = function(grunt) {

grunt.loadNpmTasks('grunt-aws-s3');
grunt.loadNpmTasks('grunt-compass'); 
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-contrib-concat');
//grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-imagemin');


grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  s3settings: grunt.file.readJSON('s3settings.json'),

  aws_s3: {
    options: {
      accessKeyId: '<%= s3settings.key %>', // Use the variables
      secretAccessKey: '<%= s3settings.secret %>', // You can also use env variables
      region: '<%= s3settings.region %>',
      uploadConcurrency: 5, // 5 simultaneous uploads
      downloadConcurrency: 5 // 5 simultaneous downloads
    },
    live: {
      options: {
        bucket: '<%= s3settings.bucket %>',
        differential: true // Only uploads the files that have changed
      },
      files: [
        {expand: true, cwd: 'deploy/', src: ['**'], dest: ''},
      ]
    },
    download: {
      options: {
        bucket: '<%= s3settings.bucket %>',
      },
      files: [
        {dest: '/', cwd: 'backup/', action: 'download'},
      ]
    }
  },
  cssmin: {
    combine: {
      files: [
        {expand: true, cwd: 'src', src: ['**/*.css'], dest: 'deploy/'},
      ]
   }
  },
  htmlmin: {                                     // Task
    dist: {                                      // Target
      options: {                                 // Target options
        removeComments: true,
        collapseWhitespace: true,
      },
      files: [                     
        {expand: true, cwd: 'src', src: ['**/*.html'], dest: 'deploy/'},
      ]
    }
  }
});

  grunt.registerTask('deploy', ['default','aws_s3:live']);
  grunt.registerTask('download', ['aws_s3:download']);
  grunt.registerTask('default', ['cssmin', 'htmlmin']); // not working =/


};