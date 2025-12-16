const express = require('express');
const router = express.Router();
const controller = require('../controllers/captain.controller');


// POST METHOD:- REGISTER ROUTE:-
router.post('/register', controller.registerCaptain);

// POST METHOD:- LOGIN ROUTE:-
router.post('/login' , controller.loginCaptain);

module.exports = router;