var fs = require('fs');
var watch = require('node-watch');
var uglifyjs = require("uglify-js");
var jshint = require("jshint").JSHINT;

function colorize(str, color) {
    var colors = {
        'blue': '1;34m',
        'cyan': '1;36m',
        'green': '1;32m',
        'magenta': '1;35m',
        'red': '1;31m',
        'yellow': '1;33m'
    };

    return colors[color] ? '\033[' + colors[color] + str + '\033[39m' : str
}

var sourceFiles = [
    'src/VGFL.js',
    'src/Core/Util.js',
    'src/Core/Class.js',
    'src/Game/Game.js',
    'src/Team/Team.js',
    'src/Object/Object.js',
    'src/Player/Player.js'
];



desc('Watches for changes inthe files and rebuilds when they change');
task('watch', function () {
    console.log(colorize('===============================================', 'yellow'));
    console.log(colorize('  Files are now being watched. ctrl+c to exit  ', 'green'));
    console.log(colorize('===============================================', 'yellow'));
    watch('src', function(filename) {
        jake.Task.minify.execute();
    });
});



desc('Build all the assets');
task('minify', { async: true }, function () {
    var result = uglifyjs.minify(sourceFiles, { outSourceMap : "VGFL.js.map" });

    fs.writeFile('dist/VGFL.min.js', result.code, function (err) {
        if (err) throw new Error(colorize(err, 'red'));

        console.log(colorize('+ Minify success', 'green'));
    });
});



desc('Lint code');
task('lint', {async: true}, function () {
    var errors = 0;
    sourceFiles.forEach(function(file) {
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) throw new Error(colorize('Error reading file: ' + err));

            var success = jshint(data);
            if (!success) {
                console.log(colorize('- ' + file + ' : Lint failed', 'red'));
                for (x in jshint.errors) {
                    console.log(colorize('  * Error on line ' + jshint.errors[x].line + ': ' + jshint.errors[x].reason, 'yellow'));
                    errors += 1;
                }
                //throw new Error(colorize('x Lint failed', 'red'));

            } else {
                console.log(colorize('+ ' + file + ' : Lint success', 'green'));
            }
        });
    });
    complete();
});



desc('Builds the project and lints before building');
task('build', {async: true}, function () {
    var lintTask = jake.Task.lint;
    var minifyTask = jake.Task.minify;

    lintTask.addListener('complete', function () {
        minifyTask.addListener('complete', function () {
            console.log(colorize('+ Build complete :)', 'green'));
        });
        minifyTask.addListener('error', function () {
            console.log(colorize('- Build failed :(', 'red'));
        });
        minifyTask.invoke();
    });

    lintTask.invoke();
});

