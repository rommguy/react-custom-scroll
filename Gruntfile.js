'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        clean: {
            main: {
                src: ['src/**/*.rt.js', 'dist/**/*.*']
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
                tasks: ['sass']
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'example/styles.css': 'example/main.scss'
                }
            }
        },
        reactTemplates: {
            main: {
                modules: 'commonjs',
                format: 'stylish',
                src: ['src/**/*.rt']
            },
            example: {
                modules: 'amd',
                format: 'stylish',
                src: ['example/**/*.rt']
            }
        }
        //requirejs: {
        //    compile: {
        //        options: {
        //            baseUrl: "./",
        //            mainConfigFile: 'src/main/main.js',
        //            include: ['src/main/customScroll/customScroll.js', 'src/main/customScroll/customScroll.rt.js'],
        //            out: "dist/customScroll.min.js",
        //            paths: {
        //                jquery: 'empty:',
        //                react: 'empty:',
        //                lodash: 'empty:',
        //                'react-dom': 'empty:'
        //            }
        //        }
        //    }
        //}
    });

    grunt.loadNpmTasks('grunt-react-templates');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    //grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-eslint');

    grunt.registerTask('rt', ['react-templates']);
    grunt.registerTask('rt', ['react-templates']);
    grunt.registerTask('default', ['eslint', 'clean', 'rt', /*'requirejs', */'sass']);
    grunt.registerTask('test', []);

    grunt.registerTask('all', ['default', 'test']);
};
