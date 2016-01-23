'use strict';
module.exports = function (grunt) {

    grunt.initConfig({
        env: {
            dist: {
                LANGUAGE: "en_US.UTF-8",
                LC_ALL: "en_US.UTF-8",
                LANG: "en_US.UTF-8"
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'assets/js/**/.js',
                '!assets/js/scripts.min.js'
            ]
        },
        recess: {
            dist: {
                options: {
                    compile: true,
                    compress: true
                },
                files: {
                    'assets/css/main.min.css': [
                        'assets/less/main.less'
                    ]
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'assets/js/scripts.min.js': [
                        'assets/js/plugins/*.js',
                        'assets/js/_*.js'
                    ]
                }
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    progressive: true,
                    interlaced: true,
                    use: [require('imagemin-zopfli')({ more: true })]
                },
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: '**/*.{png,jpg,gif,jpeg}',
                    dest: 'images/'
                }]
            }
        },
        watch: {
            less: {
                files: [
                    'assets/less/**/*.less',
                ],
                tasks: ['recess']
            },
            js: {
                files: [
                    '<%= jshint.all %>'
                ],
                tasks: ['jshint', 'uglify']
            }
        },
        clean: {
            dist: [
                '_site',
                'assets/css/main.min.css',
                'assets/js/scripts.min.js'
            ]
        },
        jekyll: {                               // Task
            options: {                          // Universal options
                bundleExec: true,
                src : '<%= app %>'
            },
            local: {                             // Target
                options: {                      // Target options
                    dest: '<%= dist %>',
                    config: '_config.yml'
                }
            },
            dist: {                             // Target
                options: {                      // Target options
                    dest: '<%= dist %>',
                    config: '_config.yml,_config.build.yml'
                }
            }
        },
        favicons: {
            options: {
                HTMLPrefix: '{{ site.url }}/assets/favicon/',
                html: '_includes/favicons.html'
            },
            icons: {
                src: 'images/avatar.jpg',
                dest: 'assets/favicon'
            }
        },
        boil: {
            empty: {
                create: "_includes/favicons.html"
            },
            favicon: {
                create: [
                    {
                        name: "favicon.png",
                        copy: "assets/favicon/favicon.png"
                    },
                    {
                        name: "favicon.ico",
                        copy: "assets/favicon/favicon.ico"
                    }
                ]
            }
        },
        zopfli: {
            options: {
                iterations: 1000
            },
            html: {
                files: [{
                    expand: true,
                    src: '_site/**/*.html',
                    dest: './',
                    ext: '.html.gz'
                }]
            },
            css: {
                files: [{
                    expand: true,
                    src: '_site/**/*.min.css',
                    dest: './',
                    ext: '.min.css.gz'
                }]
            },
            js: {
                files: [{
                    expand: true,
                    src: '_site/**/*.min.js',
                    dest: './',
                    ext: '.min.js.gz'
                }]
            },
            xml: {
                files: [{
                    expand: true,
                    src: '_site/**/*.xml',
                    dest: './',
                    ext: '.xml.gz'
                }]
            },
            json: {
                files: [{
                    expand: true,
                    src: '_site/**/*.json',
                    dest: './',
                    ext: '.json.gz'
                }]
            },
            txt: {
                files: [{
                    expand: true,
                    src: '_site/**/*.txt',
                    dest: './',
                    ext: '.txt.gz'
                }]
            },
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-boil');
    grunt.loadNpmTasks('grunt-favicons');
    grunt.loadNpmTasks('grunt-zopfli');
    grunt.loadNpmTasks('grunt-newer');

    // Register tasks
    grunt.registerTask('default', [
        'env',
        'clean',
        'boil:empty',
        'recess',
        'uglify',
        'favicons',
        'newer:imagemin',
        'boil:favicon',
        'jekyll:dist',
        'zopfli'
    ]);
    grunt.registerTask('dev', [
        'watch'
    ]);

};
