/**
 * Created by Luciano on 25/08/2014.
 */
'use strict';

/**
 * Module dependencies.
 */
var init = require('./config/init')(),
    config = require('./config/config'),
    mongoose = require('mongoose');

/**
 * Maim application entry file.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
    if(err) {
        console.error('\x1b[31m', 'Could not connect to MongoDB!');
        console.log(err);
    }
});



// Logging initialization
console.log('Correia.Rural application started on port ' + config.port);