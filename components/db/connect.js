const mongoose = require("mongoose");
require('dotenv').config();
mongoose.connect(process.env.DB_KEY).then(() => {
    console.log("connection succesful")
}).catch((err) => { 
    console.log(err) 
});

