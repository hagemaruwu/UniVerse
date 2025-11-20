// =============================================
// 👤 USER MODEL
// Stores student account information
// =============================================

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Student's full name
    name: { 
        type: String, 
        required: [true, 'Name is required'],
        trim: true
    },
    
    // Email address (unique)
    email: { 
        type: String, 
        required: [true, 'Email is required'], 
        unique: true,
        lowercase: true,
        trim: true
    },
    
    // Password (In production, use bcrypt to hash!)
    password: { 
        type: String, 
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    
    // Student ID (unique identifier like "PES12345")
    studentId: { 
        type: String, 
        required: [true, 'Student ID is required'], 
        unique: true,
        uppercase: true,
        trim: true
    },
    
    // Account creation date
    joinedDate: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('User', userSchema);