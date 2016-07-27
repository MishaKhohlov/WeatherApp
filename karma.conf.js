module.exports = function (config) {
  config.set({

    basePath: '',

    frameworks: ['browserify', 'jasmine'],

    files: [
      './build/libs/underscore.js',
      './build/libs/backbone.js',
      './build/tests/model_test.js'
    ],

    exclude: [],

    //reporters: ['progress', 'coverage'],

    preprocessors: {
      './build/tests/model_test.js': ['browserify']
    },

    //coverageReporter: {
    //  type: 'html',
    //  dir: 'coverage/'
    //},

    browserify: {
      debug: true,
      transform: ['babelify']
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false,

    concurrency: Infinity
  })
};
