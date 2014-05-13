module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-aws-s3');

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
          {expand: true, cwd: 'src/', src: ['**'], dest: ''},
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
  }
});

  grunt.registerTask('deploy', ['aws_s3:live']);
  grunt.registerTask('download', ['aws_s3:download']);


};