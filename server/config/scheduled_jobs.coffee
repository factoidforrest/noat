CronJob = require('cron').CronJob

#every hour refresh programs
new CronJob('00 00 * * * *', -> 
  logger.info 'Refreshing Programs on schedule'
  Program.refresh (err) ->
  	logger.log 'error', 'error refreshing programs ', err if err?
, null, true, 'America/Los_Angeles')