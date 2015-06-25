module.exports = function (grunt) {
    return {
        app: {
            src: [
                '../js/app.js'
            ],
            dest: '../js/app.min.js'
        }
    };
};