/*global module:false*/
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		copy: {
			main: {
				files: [
					{expand: true, cwd: './components/h5f/', src: ['h5f.min.js'], dest: './js/', flatten: true}
				],
			},
		},
		uglify: {
			validation: {
				files: {
					'./js/validation.min.js': ['./js/validation.js']
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['copy', 'uglify']);
};