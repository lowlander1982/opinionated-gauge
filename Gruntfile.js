module.exports = function (grunt) {
  // This is the configuration.
  grunt.initConfig({
    concat: {
      options: {
        separator: ";",
      },
      dist: {
        src: ["app/js/gauge.js", "app/js/custom-gauge.js"],
        dest: "build/ti-gauge.js",
      },
    },
    uglify: {
      bundle: {
        files: { "build/ti-gauge.min.js": "build/ti-gauge.js" },
      },
    },
  });

  // Load the plugin that provides the "concat" task.
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // Default task(s).
  grunt.registerTask("default", ["concat", "uglify:bundle"]);
};
