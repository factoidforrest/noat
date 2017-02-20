
express = require('express')
app = express()
coffeescript = require('connect-coffee-script')
sass = require('node-sass-middleware')
path = require('path')
favicon = require('serve-favicon')
require('./views/build_system')
production = process.env.PRODUCTION == 'true'

global.async = require('asyncawait/async')
global.await = require('asyncawait/await')
#COMPRESSION
compression = require('compression')
app.use(compression())

#LOGGING
require('./server/services/logging')(app)


app.set('views', __dirname + '/views')
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')))
app.locals.uglify = production

app.set('view engine', 'jade')

app.use(sass({
  src: __dirname + '/views/stylesheets',
  dest: __dirname + '/public',
  debug: !production,
  outputStyle: if production then 'compressed' else 'nested'
}))

#TODO: switch to a compiler with compression support
###
app.use(coffeescript({
  src: __dirname + '/views/js',
  dest: __dirname + '/public',
  bare: true,
  compress: production
}))
###
if production
  cachetime = 86400000
else
  cachetime = 0

#static assets
app.use(express.static(__dirname + '/public', { maxAge: cachetime }))

#static file routes
require('./server/config/roles')(app)
require('./server/config/routes')(app)
#app.get('/', handlers.home)
#app.get('/tables/:table?', handlers.tables)

port = process.env.PORT || 3000
app.listen(port)
logger.log('info', 'Server Launched on port': port)



