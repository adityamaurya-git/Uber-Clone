require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');


// CONNECTING TO DATABASE:-
connectDB();


// STARTING THE SERVER:-
app.listen(3000, () =>{
    console.log("server is running on port 3000");
})