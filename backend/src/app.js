const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');



// MIDDLEWARES:-

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());


// ROUTES:-
app.use('/api/user' , userRoutes);
app.use('/api/captain', captainRoutes);


module.exports = app;