const Pledge = require('../models/Pledge');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

const router = express.Router();
=======
const express = require('express');
const Pledge = require('../models/Pledge');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Get io instance from app
const getIo = (req) => req.app.get('io');
