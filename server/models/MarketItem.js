const mongoose = require('mongoose');
const marketItemSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    sellerName: String,
    sellerId: String,
    contact: String
});
module.exports = mongoose.model('MarketItem', marketItemSchema);