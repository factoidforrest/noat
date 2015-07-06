module.exports = (app) ->
  app.use (err, req, res, next) ->
    #somewhat brittle way to test if we generated the error
    if !err.routine?
      logger.log 'warn', 'Request Error: ', err
      console.log err.stack
      logger.warn 'on request ', req.originalUrl, ' with params ', req.body #ADD A CONDITIONAL SO THIS DOESN'T HAPPEN ON THE PROD SERVER ONCE THAT IS SET UP
      #status is a property when express couldnt parse the json...so brittle but I cant figure out a better way to check for this
      res.send(err.code || err.status || 500, err)
    else
      logger.log('error', 'caught unhandled error passed to express: ', err)
      logger.log('error', err.stack)
      response = {name: 'internalServerError', message: err.message}
      response.stack = err.stack # if !production commented for now since stacks are ok on daily CHANGE THIS BACK FOR PROD
      console.log('the response is ', response)
      res.send(500, response)
###
    process.on 'uncaughtException', (err) ->
      console.log("FATAL EXCEPTION ", err)
      console.log(err.stack)
      logger.log('error', 'CAUGHT FATAL EXCEPTION ', err.message,  err, err.stack)
      process.exit(1)
###