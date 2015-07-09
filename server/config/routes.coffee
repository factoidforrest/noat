module.exports = (app) ->


	app.set('apiRoot', process.env.APIROOT || 'http://localhost:3000')

	app.get '/layout', (req,res ) ->
		res.render 'templates/layout.jade'
	require('../controllers/authenticationController')(app)
	require('../controllers/userController')(app)

