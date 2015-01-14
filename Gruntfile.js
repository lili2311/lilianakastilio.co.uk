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
      files: {
        'src/css/style6.css': ['deploy/css/style6.css'] // FIND OUT HOW TO AUTOMATE
      }
   }
  },
  htmlmin: {                                     // Task
    dist: {                                      // Target
      options: {                                 // Target options
        removeComments: true,
        collapseWhitespace: true
      },
      files: {                                   // Dictionary of files
        'deploy/index.html': 'src/index.html',     // 'destination': 'source'
        'deploy/404.html': 'src/404.html',     // 'destination': 'source'
        'deploy/old-index.html': 'src/old-index.html',     // 'destination': 'source'
        'deploy/blog/index.html': 'src/blog/index.html',     // 'destination': 'source'
        'deploy/blog/2014/02/18/Meow/index.html': 'src/blog/2014/02/18/Meow/index.html',     // 'destination': 'source'
        'deploy/blog/2013/01/16/Hello-World/index.html': 'src/blog/2013/01/16/Hello-World/index.html',     // 'destination': 'source'
        'deploy/blog/2011/12/04/first-post/index.html': 'src/blog/2011/12/04/first-post/index.html',
        'deploy/blog/2011/12/04/It-works/index.html': 'src/blog/2011/12/04/It-works/index.html',
        'deploy/diamongrid/index.html': 'src/diamongrid/index.html',     // 'destination': 'source'
        'deploy/onscrollheader/on-scroll-animated-fixed-header.html.html': 'src/onscrollheader/on-scroll-animated-fixed-header.html.html',     // 'destination': 'source'
        'deploy/meow/index.html': 'src/meow/index.html',     // 'destination': 'source'
        'deploy/stickyheader/stickyheader.html': 'src/stickyheader/stickyheader.html',     // 'destination': 'source'
        'deploy/responsive/responsive.html': 'src/responsive/responsive.html',     // 'destination': 'source'
        'deploy/todolist/to-do-list.html': 'src/todolist/to-do-list.html',     // 'destination': 'source'
        'deploy/simplyfreewebdevelopment/simplyfreewebdevelopment.html': 'src/simplyfreewebdevelopment/simplyfreewebdevelopment.html',     // 'destination': 'source'

      }
    }
  },
});

  grunt.registerTask('deploy', ['aws_s3:live']);
  grunt.registerTask('download', ['aws_s3:download']);
  grunt.registerTask('default', ['cssmin', 'htmlmin']); // not working =/


};