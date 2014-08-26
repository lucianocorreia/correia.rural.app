/**
 * Created by luciano on 26/08/2014.
 */
'use strict';

module.exports = {
    db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/correia-rural',
    assets: {
        lib: {
            css: [
                'client/lib/bootstrap/dist/css/bootstrap.min.css',
                'client/lib/bootstrap/dist/css/bootstrap-theme.min.css',
            ],
            js: [
                'client/lib/angular/angular.min.js',
                'client/lib/angular-resource/angular-resource.js',
                'client/lib/angular-cookies/angular-cookies.js',
                'client/lib/angular-animate/angular-animate.js',
                'client/lib/angular-touch/angular-touch.js',
                'client/lib/angular-sanitize/angular-sanitize.js',
                'client/lib/angular-ui-router/release/angular-ui-router.min.js',
                'client/lib/angular-ui-utils/ui-utils.min.js',
                'client/lib/angular-bootstrap/ui-bootstrap-tpls.min.js'
            ]
        },
        css: 'client/dist/application.min.css',
        js: 'client/dist/application.min.js'
    }
};