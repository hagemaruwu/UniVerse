const mongoose = require('mongoose');
const clubSchema = new mongoose.Schema({
    name: String,        // e.g. "Coding Club"
    category: String,    // e.g. "Tech", "Cultural"
    description: String,
    members: { type: Number, default: 0 },
    president: String    // Who runs it?
});
module.exports = mongoose.model('Club', clubSchema);