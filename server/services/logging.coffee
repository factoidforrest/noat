
winston = require('winston')
expressWinston = require('express-winston')
require('winston-loggly')
 


module.exports = (app) ->

	#logging

	logLevel = if process.env.NODE_ENV == 'production' then 'info' else 'silly'
	global.logger = new (winston.Logger)()
	###
	  transports: [
	    new (winston.transports.Console)({ level: logLevel, 'timestamp':true }),
	    #new (winston.transports.File)({ filename: 'somefile.log', level: 'error', 'timestamp':true})
	  ]
	})
	### 
	#winston.remove(winston.transports.Console)

	consoleOptions = {
		'timestamp':true,
		#json: true, 
		colorize: true, 
		prettyPrint: true,
		humanReadableUnhandledException: true,
		level: logLevel

	}

	logger.add(winston.transports.Console, consoleOptions)
	###
	logger.add(winston.transports.Loggly, {
    token: "f421ea75-1821-4db1-bf97-36d4abe3e002",
    subdomain: "giftit",
    tags: ["gift-it-api"],
    json:true
	})
	###


	logger.ignoreRoute = (req, res) ->
		if req.url == '/uptimerobot'
			return true
		else
			return false

	#request logging
	app.use(expressWinston.logger({
	  winstonInstance: logger
	}))

	return logger
	