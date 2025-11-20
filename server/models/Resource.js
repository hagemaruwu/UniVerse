const mongoose = require('mongoose');
const resourceSchema = new mongoose.Schema({
    title: String,
    subject: String,
    linkOrDesc: String, // A link to Drive/PDF or a text description
    uploadedBy: String, // Student Name
    uploadedById: String // Student Unique ID
});
module.exports = mongoose.model('Resource', resourceSchema);