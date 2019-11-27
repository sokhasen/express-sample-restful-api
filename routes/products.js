var express = require('express');
var mongoose = require('mongoose');
var Product = require('../models/product');
var upload = require('../helpers/upload');
var router = express.Router();

/* GET product listing. */
router.get('/', async function(req, res, next) {
	try {
		let products = await Product.find();
		res.json(products);
	}
	catch(e) {
		res.status(500).
			json({
			message: "Error internal server"
		});
	}
  
});

/* GET single product id. */
router.get('/:id', async function(req, res, next) {
	let {id} = req.params;
  	try {
  		id = mongoose.Types.ObjectId(id);
		let product = await Product.find({_id: id});
		res.json({...product});
	}
	catch(e) {
		console.log({e});
		res.status(500).
			json({
			message: "Error internal server"
		});
	}
});

/* POST create new product. */
router.post('/', async function(req, res, next) {
  let body = req.body;
  	try {
  		let image  = '';
  		if (body.image && body.image.length) {
  			image = upload(body.image) || '';
  		}

  		let product = {
  			name: body.name,
  			price: body.price,
  			description: body.description,
  			quantity: body.quantity,
  			image
  		};
		let query = await Product.create(product);
		res.json({...query.toJSON()});
	}
	catch(e) {
		console.log(e);
		res.status(500).
			json({
			message: "Error internal server"
		});
	}
});

/* PUT update product by id. */
router.put('/:id', async function(req, res, next) {
	let {id} = req.params;
  	let body = req.body;

  	try {
  		let product = {
  			name: body.name,
  			price: body.price,
  			description: body.description,
  			quantity: body.quantity,
  			image: body.image
  		};
  		id = mongoose.Types.ObjectId(id);
		await Product.updateOne({_id: id}, product);
		let query = await Product.findOne({_id: id});
		res.json({...query.toJSON()});
	}
	catch(e) {
		res.status(500).
			json({
			message: "Error internal server"
		});
	}
});

/* DELETE remove single product. */
router.delete('/:id', async function(req, res, next) {
  	let {id} = req.params;

  	try {
  		id = mongoose.Types.ObjectId(id);
		await Product.deleteOne({_id: id});
		res.status(204).end();
	}
	catch(e) {
		res.status(500).
			json({
			message: "Error internal server"
		});
	}
});

module.exports = router;
