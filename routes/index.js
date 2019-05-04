// Full Documentation - https://www.turbo360.co/docs
const express = require('express');
const router = express.Router();

const Repas = require('../models/repas')
const ApreRepas = require('../models/repas_appre')
const BDE = require('../models/bde')
const Basket = require('../models/basket')
const Taximan = require('../models/taximan')
const Voiture = require('../models/voiture')

router.get("/", (req, res) => {
	res.render("home", {
		title: "Bienvenue : Page de Gestion de polytechbot",
	});

});
router.get("/repas", (req, res) => {
	res.render("restau", {
		title: "Restauration"
	});

});
router.get("/repas/all", (req, res) => {
	Repas.find()
		.then(repas => {
			res.render("restau_plat", {
				title: "Le menu de ce mois",
				plats: repas
			});
		})

});
router.get("/repas/update", (req, res) => {
	res.render("restau_update", {
		title: "Modifer le plat d'un jour"
	});

});


router.get('/basket', (req, res) => {
	res.render('basket', {
		title: "Basket"
	})
})

router.get('/basket/add', (req, res) => {
	res.render('basket_add', {
		title: "Ajouter un nouveau scorer en Basket"
	})
})

router.get('/basket/all', (req, res) => {
	Basket.find()
		.then(scorer => {
			res.render('basket_all', {
				title: "Liste des marqueurs en basket",
				baskets: scorer
			})
		})
})

router.get('/taximan', (req, res) => {
	res.render('taximan', {
		title: "Gestion numero de taximan"
	})
})
router.get('/taximan/all', (req, res) => {
	Taximan.find()
		.then(taximans => {
			res.render('all_taximan', {
				title: "Tous les numeros de taximan",
				taximans: taximans
			})
		})
})
router.get('/taximan/new', (req, res) => {
	res.render('add_taximan', {
		title: "Ajouter un numero de taximan"
	})
})


/*  This route sends text back as plain text. */
router.get("/send", (req, res) => {
	res.send("This is the Send Route");
});

/*  This route redirects requests to Turbo360. */
router.get("/redirect", (req, res) => {
	res.redirect("https://www.turbo360.co/landing");
});

module.exports = router;