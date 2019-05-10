// Full Documentation - https://www.turbo360.co/docs
const express = require('express');
const router = express.Router();
const multer = require('multer')

const Repas = require('../models/repas')
const ApreRepas = require('../models/repas_appre')
const BDE = require('../models/bde')
const Basket = require('../models/basket')
const Taximan = require('../models/taximan')
const Voiture = require('../models/voiture')
const SugRepas = require('../models/sugRepas')
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.originalname)
	}
})
const upload = multer({
	storage: storage
})
router.get('/repas', (req, res, next) => {
	Repas.find()
		.then(repas => {
			res.json({
				set_attributes: repas
			})
		})
		.catch(err => console.log(err))
})

router.get('/repas/toText', (req, res, next) => {
	let msg = []
	Repas.find()
		.then(repas => {
			repas.forEach(element => {
				console.log()
				let ch = " \n Les repas de " + element.day + " sont : \n " + "Diner : " + element.repas + "\n" + " Xeudd : " + element.diner + " \n \n ";
				console.log(ch);
				msg.push(ch)
			});
			res.json({
				messages: [{
					"text": msg.join(" ")
				}, ]
			})

		})
		.catch(err => console.log(err))
})

router.get('/repas/today', (req, res, next) => {
	const today = new Date();
	Repas.findOne({
			day_number: today.getDay()
		})
		.then(repas => {
			res.json({
				set_attributes: repas
			})
		})
		.catch(err => console.log(err))
})

router.get('/repas/update', (req, res, next) => {
	const query = req.query
	const day_number = query.day_number
	const day = query.day
	const id = query.id
	delete query['id']
	delete query['day_number']

	Repas.findOneAndUpdate({
			day: day
		}, query, {
			new: true
		})
		.then((user) => {
			res.json({
				status: 'success',
				data: user
			})
		})
		.catch((err) => {
			res.json({
				status: 'failed',
				message: err.message
			})
		})
})
router.post('/repas', (req, res, next) => {
	Repas.create(req.body)
		.then(repas => {
			res.json(repas)
		})
		.catch(err => console.log(err))
})

router.post('/repas/apre', (req, res, next) => {
	ApreRepas.create(req.body)
		.then(appre => {
			res.json(appre)
		})
		.catch(err => console.log(err))
})





// router.get('/bde/', (res, res, next) => {
// 	BDE.find()
// 		.then(data => {
// 			res.json({
// 				set_attributes: data
// 			})
// 		})
// 		.catch(err => console.log(err))
// })

router.get('/bde', (req, res) => {
	const query = req.query;
	BDE.findOne(query)
		.then(data => {
			res.json({
				set_attributes: data
			})
		})
		.catch(err => console.log(err))
})
router.post('/bde', (req, res) => {
	BDE.create(req.body)
		.then(data => {
			res.json({
				set_attributes: data
			})
		})
		.catch(err => console.log(err))
})

router.get('/basket', (req, res) => {
	let msg = []
	Basket.find()
		.then(data => {
			data.forEach((element, index) => {
				let ch = " \n " + (index + 1) + " => " + element.joueur + "  avec " + element.total + " points  \n ";
				msg.push(ch)
			});
			res.json({
				messages: [{
					"text": msg.join(" ")
				}, ]
			})
		})
		.catch(err => console.log(err))
})
router.post('/basket', (req, res) => {
	Basket.create(req.body)
		.then(data => {
			res.json({
				status: 'success',
				data: data
			})
		})
		.catch(err => console.log(err))
})

router.route('/taximan')
	.get((req, res, next) => {
		Taximan.find()
			.then(taximan => {
				res.json(taximan)
			})
			.catch(err => console.log(err))
	})
	.post((req, res, next) => {
		Taximan.create(req.body)
			.then(data => {
				res.json({
					status: true,
					msg: 'Create with succees',
					data: data
				})
			})
			.catch(err => console.log(err))
	})
router.get('/taximan/one', (req, res, next) => {
	let msg = []
	Taximan.aggregate([{
			$sample: {
				size: 1
			}
		}])
		.then(taximan => {
			taximan.forEach(taxi => {
				let ch = "Voici un numero de taximan joignable a Thies : " + taxi.number
				msg.push(ch)
			})
			res.json({
				messages: [{
					"text": msg.join(" ")
				}, ]
			})
		})
		.catch(err => console.log(err))
})

router.route('/voiture')
	.post((req, res, next) => {
		Voiture.create(req.body)
			.then(voiture => {
				res.json(voiture)
			})
			.catch(err => console.log(err))
	})
	.get((req, res, next) => {
		let query = req.query
		let msg = []
		Voiture.find(query)
			.then(voiture => {
				voiture.forEach(voiture => {
					let ch = voiture.name + " \n A comme heure de depart : " + voiture.heure + "\n Les itineraires : " + voiture.itineraire + "\n"
					msg.push(ch)
				})
				res.json({
					messages: [{
						"text": msg.join(" ")
					}, ]
				})
			})
			.catch(err => console.log(err))
	})

router.route('/sugrepas')
	.get((req, res, next) => {
		SugRepas.find()
			.then(data => {
				res.json(data)
			})
			.catch(err => console.log(err))
	})
	.post((req, res, next) => {
		SugRepas.create(req.body)
			.then(data => {
				res.json({
					status: true,
					msg: 'Suggestion added',
					data: data
				})
			})
			.catch(err => console.log(err))
	})

module.exports = router