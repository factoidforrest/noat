process.env.NODE_ENV = 'test'
process.env.PORT = '1337'
async = require 'async'
#app = require('../../server')
adapters = require('../../knexfile')
dbConf = adapters[process.env.NODE_ENV]
knex = require('knex')(dbConf)
registered = false


unless registered
	console.log('registering destroy hook')
	before (done)->
		console.log('setup before hook called')
		registered = true
		destroyAll ->
				#start the app
				app = require('../../server')
				done()
		return null


module.exports.destroyAll = destroyAll = (done) ->
	knex.migrate.rollback(dbConf).then ->
		console.log('rolled back database')
		knex.migrate.latest(dbConf).then ->
			console.log('migrated database')
			done()
	###
	console.log('calling async destroy on models')
	async.map [User, Token, Card, Authentication, Meal, Gift, Invitation, Transaction, Reward, RewardProgram, Survey], destroy, (err, results) ->
		db.knex.select('*').from('reward_programs')
	  .del()
	  .then (numRows) ->
	  	console.log('destroyed this many reward programs: ', numRows)
			done()
	###



module.exports.destroy = destroy = (model, cb) ->
	model.collection().fetch().then (collection) ->
		collection.invokeThen('destroy').then -> 
			cb()
