exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        'e2e_testing/running test/*.js'
    ],
    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://dtapi.local/',

    framework: 'jasmine',
    directConnect: true,

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
