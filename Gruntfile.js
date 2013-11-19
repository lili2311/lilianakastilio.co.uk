module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-s3');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    s3settings: grunt.file.readJSON('s3settings.json'),

    s3: {
      options: {
        key: '<%= s3settings.key %>',
        secret: '<%= s3settings.secret %>',
        bucket: '<%= s3settings.bucket %>',
        region: '<%= s3settings.region %>',
        access: 'public-read',
        //debug: true,
        headers: {
          // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
          "Cache-Control": "max-age=630720000, public",
          "Expires": new Date(Date.now() + 63072000000).toUTCString()
        },
        gzip: true
      },
      live: {
        upload: [
          {
            src: '*.html',
            dest: '/',
          },
          {
            src: 'js/*.js',
            dest: 'js/',
          },
          {
            src: 'css/*.css',
            dest: 'css/',
          },
          {
            src: '*.svg',
            dest: '/',
          },
          {
            src: 'stickyheader/*.html',
            dest: 'stickyheader/',
          },
          {
            src: 'stickyheader/*.js',
            dest: 'stickyheader/',
          },
          {
            src: 'stickyheader/*.css',
            dest: 'stickyheader/',
          },
          {
            src: 'meow/images/*.png',
            dest: 'meow/images/',

          },
          {
            src: 'meow/*.html',
            dest: 'meow/',
          },
          {
            src: 'meow/*.js',
            dest: 'meow/',
          },
          {
            src: 'meow/*.css',
            dest: 'meow/',
          }

        ]
      }
    }
    
  });

  grunt.registerTask('deploy', ['s3:live']);

};