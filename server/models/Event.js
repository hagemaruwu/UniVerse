const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    title: String,
    clubName: String, // e.g. "Coding Club"
    description: String,
    date: String,
    createdBy: String, // Student ID who posted it
    attendees: { type: Number, default: 0 }
});
module.exports = mongoose.model('Event', eventSchema);