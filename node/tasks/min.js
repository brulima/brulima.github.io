module.exports = function (grunt) {
    var min = function () {
        var fs = require('fs');
        var html = fs.readFileSync('../test.html', 'UTF-8');

        html = html.replace('js/app.js', 'js/app.min.js');
        html = html.replace('css/style.css', 'css/style.min.css');

        fs.writeFileSync('../index.html', html, 'UTF-8');
    };

    return grunt.task.registerTask('min', min);
};