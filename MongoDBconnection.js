//To use mongoose we need to require it....
const mongoose = require('mongoose');


// MongoDB connection URL 
const mongoURI = 'mongodb://127.0.0.1:27017/FootBallDB';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });


const db=mongoose.connection;
db.on('error',function(err){
    console.log("error");
});
db.once('connected',function(){
    console.log("connected"+mongoURI);
});

module.exports=db;