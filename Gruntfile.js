'use strict';
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
		    banner: '/*!\n' +
		    ' * <%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>\n' +
		    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> - <%= pkg.homepage %>\n' +
		    ' * License: <%= _.map(pkg.licenses, function(x) {return x.type + " (" + x.url + ")";}).join(", ") %>\n' +
		    ' */\n\n',
		    outputDir: 'dist',
		    output : '<%= meta.outputDir %>/<%= pkg.name %>',
		    outputMin : '<%= meta.outputDir %>/<%= pkg.name.replace("js", "min.js") %>'
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
			'!js/scripts.js'
			]
		},
		uglify: {
			development: {
				options: {
					banner : '<%= meta.banner %>',
					mangle: false,
					compress: false,
					beautify: true
				},
				files: {
					'js/scripts.dev.js': [
						'js/scripts.js'
						]
				}
			},
			production: {
				options: {
					banner : '<%= meta.banner %>',
					compress: {
						global_defs: {
							"DEBUG": false
						},
						dead_code: true
					}
				},
				files: {
					'js/scripts.min.js': [
					'js/scripts.dev.js'
					]
				}
			}
		},

		watch: {
			js: {
				files: [
				'js/scripts.js'
				],
				tasks: ['jshint', 'uglify:development'],
				options: {
					spawn: false
				}
			}
		},
		clean: {
			dist: [
			'css/styles.min.css',
			'js/scripts.min.js'
			]
		}
	});

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	// Register tasks
	grunt.registerTask('default', [
		'jshint',
		'clean',
		'uglify'
		]);
	
	grunt.registerTask('prod', [
		'jshint',
		'clean',
		'uglify:production'
	]);

	grunt.registerTask('dev', [
		'watch'
		]);

};