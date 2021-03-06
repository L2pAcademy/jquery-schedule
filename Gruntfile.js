module.exports = function (grunt) {

    grunt.initConfig({
        package: grunt.file.readJSON('package.json'),
        clean: {
            dist: [
                'dist/',
                'cache/'
            ]
        },
        jshint: {
            options: {
                curly: true,
                browser: true,
                devel: true,
                eqeqeq: true,
                undef: true,
                globals: {
                    jQuery: true
                }
            },
            dist: {
                src: 'src/js'
            }
        },
        copy: {
            css: {
                expand: true,
                cwd: 'cache/',
                src: '*.css',
                dest: 'dist/',
                ext: '.min.css',
                extDot: 'last'
            },
            js: {
                expand: true,
                cwd: 'src/js/',
                src: '*.js',
                dest: 'dist/'
            }
        },
        uglify: {
            dist: {
                expand: true,
                cwd: 'src/js/',
                src: '*.js',
                dest: 'dist/',
                ext: '.min.js',
                extDot: 'last'
            }
        },
        compass: {
            dev: {
                options: {
                    sassDir: 'src/scss/',
                    cssDir: 'dist/',
                    noLineComments: true
                }
            },
            prod: {
                options: {
                    sassDir: 'src/scss/',
                    cssDir: 'cache/',
                    environment: 'production'
                }
            }
        },
        usebanner: {
            options: {
                position: 'top',
                linebreak: true
            },
            dev: {
                options: {
                    banner: '/**\n' +
                    ' * jQuery Schedule v<%= package.version %>\n' +
                    ' * <%= package.homepage %>\n' +
                    ' * <%= package.author.name %> <<%= package.author.email %>>\n' +
                    ' */'
                },
                expand: true,
                cwd: 'dist/',
                src: [
                    '*.js',
                    '*.css',
                    '!*.min.js',
                    '!*.min.css'
                ]
            },
            prod: {
                options: {
                    banner: '/** jQuery Schedule v<%= package.version %> | <%= package.homepage %> */',
                },
                expand: true,
                cwd: 'dist/',
                src: [
                    '*.min.js',
                    '*.min.css'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-banner');

    grunt.registerTask('default', [
        'clean',
        'jshint',
        'compass:prod',
        'compass:dev',
        'copy:js',
        'copy:css',
        'uglify',
        'usebanner:dev',
        'usebanner:prod'
    ]);
};