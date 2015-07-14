module.exports = (app) ->


	app.set('apiRoot', process.env.APIROOT || 'http://localhost:3000')

	app.get '/', (req,res ) ->
		res.render 'templates/main.jade'
		
	require('../controllers/authenticationController')(app)
	require('../controllers/userController')(app)

