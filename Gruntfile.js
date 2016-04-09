module.exports = function (grunt) {

	'use strict';

	grunt.initConfig({
		jshint: {
			options: {
				bitwise: true,
				curly: true,
				eqeqeq: true,
				futurehostile: true,
				laxcomma: true,
				strict: true,
				undef: true,
				unused: true,
				globals: {
					define: false, module: false, require: false
				}
			},
			src: 'src/**/*.js',
			test: {
				options: {
					// https://github.com/jshint/jshint/blob/master/src/messages.js#L80
					//'-W027': true,  // Ignore: Unreachable '{a}' after '{b}'.
					'-W097': true,  // Ignore: Use the function form of "use strict".
					globals: {
						console: false, __dirname: false, require: false, describe: false, it: false, before: false
					}
				},
				files: { src: 'test/*.js' }
			},
			grunt: 'Gruntfile.js'
		},

		uglify: {
			dist: {
				files: { 'dist/querySelectorExt.min.js': 'src/**/*.js' }
			},
			options: {
				banner: "/*!\n  querySelectorExt | MIT | ©Nick Freear | <%= grunt.template.today('yyyy-mm-dd HH:MM:ss') %>.\n*/\n\n",
				sourceMap: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', [ 'jshint', 'uglify' ]);
};
