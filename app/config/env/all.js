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
                'public/lib/angular/angular.js',
                'public/lib/angular-resource/angular-resource.js',
                'public/lib/angular-cookies/angular-cookies.js',
                'public/lib/angular-animate/angular-animate.js',
                'public/lib/angular-touch/angular-touch,js',
                'public/lib/angular-sanitize/angular-sanitize.js',
                'public/lib/angular-ui-router/release/angular-ui-router.js',
                'public/lib/angular-ui-utils/ui-utils.js'
            ]
        }
    }


};