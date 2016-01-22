/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * http://sailsjs.org/#!/documentation/concepts/Logging
 */
var winston = require('winston');

var fs = require('fs');

if(!fs.existsSync('./logs')){
    fs.mkdirSync('./logs');
}

var logger = new winston.Logger({
    transports: [
        new(winston.transports.File)({
            level: 'error',
            filename: './logs/errors.log',
            json: true,
            timestamp: true,
            colorize: false
        }),
        new (winston.transports.Console)({
            level: 'debug',
            colorize: true,
            timestamp: false,
            json: false
        })
    ],
});

module.exports.log = {

  /***************************************************************************
  *                                                                          *
  * Valid `level` configs: i.e. the minimum log level to capture with        *
  * sails.log.*()                                                            *
  *                                                                          *
  * The order of precedence for log levels from lowest to highest is:        *
  * silly, verbose, info, debug, warn, error                                 *
  *                                                                          *
  * You may also set the level to "silent" to suppress all logs.             *
  *                                                                          *
  ***************************************************************************/

  custom: logger,
  color: false
};
