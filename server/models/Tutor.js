const mongoose = require('mongoose');
const tutorSchema = new mongoose.Schema({
    name: String,
    tutorId: String,
    subject: String,
    timing: String, // e.g., "Mon-Wed 5PM"
    location: String,
    contact: String // Phone or Email
});
module.exports = mongoose.model('Tutor', tutorSchema);