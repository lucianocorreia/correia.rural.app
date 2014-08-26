/**
 * Created by Luciano on 25/08/2014.
 */
'use strict';

module.exports = {
    app: {
        title: 'Correia.Rural',
        description: 'Controle de Fazendas',
        keywords: 'MongoDB, Express, AngularJS, Node.Js'
    },
    port: process.env.PORT || 3000,
    templateEngine: 'swig',
    sessionSecret: 'CorreiaRural Secret',
    sessionCollection: 'sessions',
    assets: {
        lib: {
            css: [
                'client/lib/bootstrap/dist/css/bootstrap.css',
                'client/lib/bootstrap/dist/css/bootstrap-theme.css'
            ],
            js: [
                'client/lib/angular/angular.js',
                'client/lib/angular-resource/angular-resource.js',
                'client/lib/angular-cookies/angular-cookies.js',
                'client/lib/angular-animate/angular-animate.js',
                'client/lib/angular-touch/angular-touch,js',
                'client/lib/angular-sanitize/angular-sanitize.js',
                'client/lib/angular-ui-router/release/angular-ui-router.js',
                'client/lib/angular-ui-utils/ui-utils.js'
            ]
        },
        css: [
            'client/modules/**/css/*.css'
        ],
        js: [
            'client/congig.js',
            'client/application.js',
            'client/modules/*/*.js',
            'client/modules/*/*[!tests]*/*.js'
        ],
        tests: [
            'client/lib/angular-mocks/angular-mocks.js',
            'client/modules/*/tests/*.js'
        ]
    }


};