// =============================================
// 📚 UNIVERSE BACKEND - Main Server File
// =============================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// ============ IMPORT ALL MODELS ============
const User = require('./models/User');
const StudyGroup = require('./models/StudyGroup');
const Resource = require('./models/Resource');
const Tutor = require('./models/Tutor');
const Event = require('./models/Event');
const LostItem = require('./models/LostItem');
const MarketItem = require('./models/MarketItem');
const Club = require('./models/Club');

// ============ EXPRESS APP SETUP ============
const app = express();

// Middleware
app.use(cors());                    // Allow cross-origin requests
app.use(express.json());            // Parse JSON request bodies

// =============================================
// 🔐 AUTHENTICATION ROUTES
// =============================================

// SIGNUP - Create new user
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password, studentId } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { studentId }] 
        });
        
        if (existingUser) {
            return res.status(400).json({ 
                error: "User with this email or student ID already exists" 
            });
        }

        // Create new user
        const newUser = new User({ name, email, password, studentId });
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            studentId: newUser.studentId
        });
    } catch (err) {
        console.error('Signup Error:', err);
        res.status(500).json({ error: "Server error during signup" });
    }
});

// LOGIN - Authenticate user
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists and password matches
        if (!user || user.password !== password) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Return user data (without password)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            studentId: user.studentId
        });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ error: "Server error during login" });
    }
});

// GET USER ACTIVITY - All posts by a user
app.get('/user-activity/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Fetch all user's posts from different collections
        const [beacons, resources, tutors, events, lostfound, market, clubs] = await Promise.all([
            StudyGroup.find({ creatorId: userId }),
            Resource.find({ uploadedById: userId }),
            Tutor.find({ tutorId: userId }),
            Event.find({ createdBy: userId }),
            LostItem.find({ postedBy: userId }),
            MarketItem.find({ sellerId: userId }),
            Club.find({ createdBy: userId })
        ]);

        res.json({ beacons, resources, tutors, events, lostfound, market, clubs });
    } catch (err) {
        console.error('User Activity Error:', err);
        res.status(500).json({ error: "Failed to fetch user activity" });
    }
});

// =============================================
// 🛠️ GENERIC CRUD HANDLERS
// =============================================

// CREATE - Add new item to database
const createHandler = (Model) => async (req, res) => {
    try {
        const newItem = new Model(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        console.error('Create Error:', err);
        res.status(500).json({ error: "Failed to create item" });
    }
};

// READ - Get all items from database
const getAllHandler = (Model) => async (req, res) => {
    try {
        const items = await Model.find().sort({ createdAt: -1 }); // Newest first
        res.json(items);
    } catch (err) {
        console.error('Fetch Error:', err);
        res.status(500).json({ error: "Failed to fetch items" });
    }
};

// READ ONE - Get single item by ID
const getOneHandler = (Model) => async (req, res) => {
    try {
        const item = await Model.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json(item);
    } catch (err) {
        console.error('Fetch One Error:', err);
        res.status(500).json({ error: "Failed to fetch item" });
    }
};

// UPDATE - Modify existing item
const updateHandler = (Model) => async (req, res) => {
    try {
        const updatedItem = await Model.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return updated document
        );
        if (!updatedItem) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json(updatedItem);
    } catch (err) {
        console.error('Update Error:', err);
        res.status(500).json({ error: "Failed to update item" });
    }
};

// DELETE - Remove item from database
const deleteHandler = (Model) => async (req, res) => {
    try {
        const deletedItem = await Model.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json({ message: "Item deleted successfully", id: req.params.id });
    } catch (err) {
        console.error('Delete Error:', err);
        res.status(500).json({ error: "Failed to delete item" });
    }
};

// =============================================
// 🎓 ACADEMIC ROUTES
// =============================================

// Study Beacons
app.get('/beacons', getAllHandler(StudyGroup));
app.get('/beacons/:id', getOneHandler(StudyGroup));
app.post('/beacons', createHandler(StudyGroup));
app.put('/beacons/:id', updateHandler(StudyGroup));
app.delete('/beacons/:id', deleteHandler(StudyGroup));

// Resources
app.get('/resources', getAllHandler(Resource));
app.get('/resources/:id', getOneHandler(Resource));
app.post('/resources', createHandler(Resource));
app.put('/resources/:id', updateHandler(Resource));
app.delete('/resources/:id', deleteHandler(Resource));

// Tutors
app.get('/tutors', getAllHandler(Tutor));
app.get('/tutors/:id', getOneHandler(Tutor));
app.post('/tutors', createHandler(Tutor));
app.put('/tutors/:id', updateHandler(Tutor));
app.delete('/tutors/:id', deleteHandler(Tutor));

// =============================================
// 👥 COMMUNITY ROUTES
// =============================================

// Clubs
app.get('/clubs', getAllHandler(Club));
app.get('/clubs/:id', getOneHandler(Club));
app.post('/clubs', createHandler(Club));
app.put('/clubs/:id', updateHandler(Club));
app.delete('/clubs/:id', deleteHandler(Club));

// Events
app.get('/events', getAllHandler(Event));
app.get('/events/:id', getOneHandler(Event));
app.post('/events', createHandler(Event));
app.put('/events/:id', updateHandler(Event));
app.delete('/events/:id', deleteHandler(Event));

// Lost & Found
app.get('/lostfound', getAllHandler(LostItem));
app.get('/lostfound/:id', getOneHandler(LostItem));
app.post('/lostfound', createHandler(LostItem));
app.put('/lostfound/:id', updateHandler(LostItem));
app.delete('/lostfound/:id', deleteHandler(LostItem));

// =============================================
// 🛒 MARKETPLACE ROUTES
// =============================================

app.get('/market', getAllHandler(MarketItem));
app.get('/market/:id', getOneHandler(MarketItem));
app.post('/market', createHandler(MarketItem));
app.put('/market/:id', updateHandler(MarketItem));
app.delete('/market/:id', deleteHandler(MarketItem));

// =============================================
// 🔍 SEARCH ROUTE (Optional - searches all)
// =============================================

app.get('/search', async (req, res) => {
    try {
        const { q } = req.query; // Search query
        if (!q) {
            return res.status(400).json({ error: "Search query required" });
        }

        const searchRegex = new RegExp(q, 'i'); // Case-insensitive search

        const [beacons, resources, events, market, clubs, lostfound] = await Promise.all([
            StudyGroup.find({ $or: [{ subject: searchRegex }, { location: searchRegex }] }),
            Resource.find({ $or: [{ title: searchRegex }, { subject: searchRegex }] }),
            Event.find({ $or: [{ title: searchRegex }, { clubName: searchRegex }] }),
            MarketItem.find({ $or: [{ title: searchRegex }, { description: searchRegex }] }),
            Club.find({ $or: [{ name: searchRegex }, { category: searchRegex }] }),
            LostItem.find({ $or: [{ itemName: searchRegex }, { location: searchRegex }] })
        ]);

        res.json({ beacons, resources, events, market, clubs, lostfound });
    } catch (err) {
        console.error('Search Error:', err);
        res.status(500).json({ error: "Search failed" });
    }
});

// =============================================
// 🏥 HEALTH CHECK ROUTE
// =============================================

app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'UniVerse API is running',
        timestamp: new Date().toISOString()
    });
});

// =============================================
// 🚀 START SERVER
// =============================================

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        
        // Start server after DB connection
        const PORT = process.env.PORT || 5001;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });