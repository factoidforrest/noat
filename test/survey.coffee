request = require('supertest');
setup = require('./libs/setup')
expect = require('chai').expect
async = require('async')
user = require('./libs/user')
user.createHooks()
mealKey = null

describe 'survey', ->

	before (done) ->
		Program.fetchAll().then (allPrograms) ->
			console.log('fetched all programs to construct meal ', allPrograms)
			request.agent(app)
			.post('/meal/create').send(
				pos_secret:'123abc'
				meal: 
					price: 5.52, 
					programs: [allPrograms.first().get('client_id'), allPrograms.last().get('client_id')]
					location_id: 1,
					items: [{name: 'Burger', ratable: true}, {name: 'Milkshake', ratable: true}, {name: 'unratable item', ratable: false}]
			
			).expect(200)
			.end (err, res) ->
				console.log('created meal with response', res.body)
				mealKey = res.body.key
				return done(err)

	it 'should get survey questions', (done) ->
		user.login {}, (session, token) ->
			session.post('/survey/questions').send(
				meal_key: mealKey
			).expect(200)
			.end (err, res) ->
				console.log('got questions ', res.body)
				done(err)

	it 'should create', (done) ->
		user.login {}, (session, token) ->
			session.post('/survey/create').send(
				token: token
				meal_key: mealKey
				data: 
					review: "What a great meal!"
					rating: 5
			).expect(200)
			.end (err, res) ->
				console.log('survey create responded ', res.body)
				return done(err)

	it 'should have a reward for the user that did the survey', (done) ->
		user.login {}, (session, token) ->
			console.log('sending token ', token)
			session.post('/reward/list').send(
				token: token
			).expect(200)
			.end (err, res) ->
				console.log('got rewards: ', res.body)
				expect(res.body.length).to.equal(1)
				done(err)

	it 'should have subtracted the meal cost using the reward', (done) ->
		user.login {}, (session, token) ->
			console.log('sending token ', token)
			session.post('/meal/info').send(
				pos_secret:'123abc',
				meal_key: mealKey
			).expect(200)
			.end (err, res) ->
				console.log('meal info responded ', res.body)
				done(err)


