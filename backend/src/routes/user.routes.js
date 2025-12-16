const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const middleware = require('../middlewares/auth.middleware')



// POST METHOD:- REGISTER ROUTE:-
router.post('/register' , controller.registerUser);

// POST METHOD:- LOGIN ROUTE:-
router.post('/login' , controller.loginUser);

// GET METHOD:- PROFILE ROUTE:-
router.get('/profile' , middleware.authUserMiddleware , controller.getProfile);

// GET METHOD:- LOGOUT ROUTE:-
router.get('/logout' , middleware.authUserMiddleware, controller.logoutUser);
module.exports = router;