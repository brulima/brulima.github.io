module.exports = function (grunt) {
    return {
        app: {
            src: [
                '../js/files/ga.js',
                '../js/files/nav.js'
            ],
            dest: '../js/app.js'
        }
    };
};