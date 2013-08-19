var grunt = require('grunt');

var browsers = [
    {
        name: 'Linux - Chrome',
        browserName: 'chrome',
        platform: 'Linux'
    },

    {
        name: 'Linux - Firefox',
        browserName: 'firefox',
        platform: 'Linux'
    },

    {
        name: 'Mac OS X - Safari',
        browserName: 'safari',
        platform: 'OS X 10.8',
        version: 6
    },

    {
        name: 'Windows 8 - IE 10',
        browserName: 'internet explorer',
        platform: 'Windows 8',
        version: 10
    },

    {
        name: 'Windows 7 - IE 9',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: 9,
    },

    {
        name: 'Android 4.0',
        browserName: 'android',
        platform: 'Linux',
        version: '4.0'
    },

    {
        name: 'iOS 6',
        browserName: 'iphone',
        platform: 'OS X 10.8',
        version: 6
    }
];

grunt.initConfig({
    browserify: {
        test: {
            files: {
                'build/test.js': 'test.js'
            }
        }
    },

    sauce_tap: {
        options: {
            user: process.env.SAUCE_USER,
            key: process.env.SAUCE_KEY,
            browsers: browsers
        },

        test: {
            files: {
                test: 'build/test.js'
            }
        }
    }
});

grunt.loadNpmTasks('grunt-browserify');
grunt.loadNpmTasks('grunt-sauce-tap');

grunt.registerTask('test', ['browserify', 'sauce_tap']);
grunt.registerTask('default', ['test']);