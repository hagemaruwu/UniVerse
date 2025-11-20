const mongoose = require('mongoose');

const studyGroupSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    location: { type: String, required: true },
    creator: { type: String, required: true },  // Display Name (e.g. "Aditya")
    creatorId: { type: String, required: true }, // Secret ID (e.g. "user_12345") to prove ownership
    endTime: { type: String, required: true },
    members: { type: Number, default: 1 },
    maxMembers: { type: Number, default: 5 }
});

module.exports = mongoose.model('StudyGroup', studyGroupSchema);