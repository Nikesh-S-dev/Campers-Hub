require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

dns.setServers(['1.1.1.1', '8.8.8.8']);

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Connected to MongoDB at ${mongoose.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

app.use(cors());
app.use(express.json());

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' }],
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Test endpoint
app.post('/api/test', (req, res) => {
  console.log('Test POST endpoint called');
  console.log('Request body:', req.body);
  res.json({ message: 'Test successful', received: req.body });
});

// Auth endpoints
app.post('/api/auth/register', async (req, res) => {
  try {
    console.log('Register endpoint called');
    console.log('Request body:', req.body);
    
    const { email, password } = req.body;
    console.log('Email:', email, 'Password length:', password ? password.length : 'undefined');
    
    const existingUser = await User.findOne({ email });
    console.log('Existing user check:', existingUser ? 'User exists' : 'User does not exist');
    
    if (existingUser) {
      console.log('Returning: User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ 
      email, 
      password: hashedPassword,
      favorites: [],
      wishlist: []
    });
    await user.save();
    console.log('User saved successfully');

    const token = jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET);
    console.log('Token generated');
    
    res.json({ token, user: { _id: user._id, email: user.email } });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET);
    res.json({ token, user: { _id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// User data endpoints
app.get('/api/user/data', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites').populate('wishlist');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      favorites: user.favorites.map(fav => fav._id.toString()),
      wishlist: user.wishlist.map(item => item._id.toString())
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error: error.message });
  }
});

app.post('/api/user/favorites', authenticateToken, async (req, res) => {
  try {
    const { locationId } = req.body;
    const user = await User.findById(req.user._id);

    const index = user.favorites.indexOf(locationId);
    if (index > -1) {
      user.favorites.splice(index, 1);
    } else {
      user.favorites.push(locationId);
    }

    await user.save();
    res.json({ favorites: user.favorites.map(id => id.toString()) });
  } catch (error) {
    res.status(500).json({ message: 'Error updating favorites', error: error.message });
  }
});

app.post('/api/user/wishlist', authenticateToken, async (req, res) => {
  try {
    const { equipmentId } = req.body;
    const user = await User.findById(req.user._id);

    const index = user.wishlist.indexOf(equipmentId);
    if (index > -1) {
      user.wishlist.splice(index, 1);
    } else {
      user.wishlist.push(equipmentId);
    }

    await user.save();
    res.json({ wishlist: user.wishlist.map(id => id.toString()) });
  } catch (error) {
    res.status(500).json({ message: 'Error updating wishlist', error: error.message });
  }
});



const equipmentSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: String,
    images: Object,
    category: String,
    "shopping link": String
  }
);

const Equipment = mongoose.model('Equipment', equipmentSchema);

app.get('/api/equipments', async (req, res) => {
  try {
    const equipments = await Equipment.find();
    res.json({ 
      message: "Success!", 
      data: equipments
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching data", 
      error: error.message 
    });
  }
});


const locationSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    images: Object,
    map: String,
    activities: Object || String,
    charges: {
      visiting: String,
      parking: String, 
      food: String,
      total: String
    },
    book: String,
    category: String,
    climate: String 
  }
);

const Location = mongoose.model('Location', locationSchema, 'location');

app.get('/api/locations', async (req, res) => {
  try {
    const searchTerm = req.query.query;
    console.log(searchTerm)
    let results;
    
    if(searchTerm){
      results = await Location.find({
      name: new RegExp(query, 'gi')
      });
    }else{
      results = await Location.find();
    }

    res.json({ 
      message: "Success!", 
      data: results 
    });
  } catch (error) {
    res.status(500).json({  
      message: "Error fetching data", 
      error: error.message 
    });
  }
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});