'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        clean: {
            main: {
                src: ['src/**/*.rt.js']
            }
        },
        eslint: {
            all: {
                src: [
                    'src/**/*.js',
                    '!src/**/*.rt.js'
                ]
            }
        },
        watch: {
            rt: {
                files: [
                    'src/**/*.rt'
                ],
                tasks: ['rt'],
                options: {
                    spawn: false
                }
            },
            sass: {
                files: [
                    'src/main/**/*.scss'
                ],
                tasks:['sass']
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'styles.css': 'src/main/main.scss'
                }
            }
        },
        reactTemplates: {
            modules: 'amd',
            format: 'stylish',
            src: ['src/**/*.rt']
        }
    });

    grunt.loadNpmTasks('grunt-react-templates');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-eslint');

    grunt.registerTask('rt', ['react-templates']);
    grunt.registerTask('default', ['eslint', 'clean', 'rt', 'sass']);
    grunt.registerTask('test', []);

    grunt.registerTask('all', ['default', 'test']);
};
