const mongoose = require('mongoose');
const lostItemSchema = new mongoose.Schema({
    itemName: String,
    status: String, // "Lost" or "Found"
    location: String,
    description: String,
    contact: String,
    postedBy: String
});
module.exports = mongoose.model('LostItem', lostItemSchema);