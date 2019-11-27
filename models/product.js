const mongoose = require('mongoose');

var schema = new mongoose.Schema({ 
	name: 'string', 
	image: 'string', 
	price: 'string',
	description: 'string',
	quantity: 'string'
});
var Product = mongoose.model('Product', schema);

module.exports = Product;