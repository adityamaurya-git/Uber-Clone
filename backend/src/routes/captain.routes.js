const express = require('express');
const router = express.Router();
const controller = require('../controllers/captain.controller');
const middleware = require('../middlewares/auth.middleware')


// POST METHOD:- REGISTER ROUTE:-
router.post('/register', controller.registerCaptain);

// POST METHOD:- LOGIN ROUTE:-
router.post('/login' , controller.loginCaptain);

// GET METHOD:- PROFILE ROUTE:-
router.get('/profile' , middleware.authCaptainMiddleware, controller.getProfile);

// GET METHOD:- LOGOUT ROUTE:-
router.get('/logout' , middleware.authCaptainMiddleware, controller.logoutCaptain);

module.exports = router;