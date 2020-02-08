// require library 
const mongoose = require('mongoose');
// connected to database
mongoose.connect('mongodb://localhost/contact_list_db');
// check if it is connected 
const db = mongoose.connection;
//  if error is occures 
db.on('error', console.error.bind(console,'Error in connecting to database'));
// if it successfully connected 
db.once('open',function(){
    console.log('successfully connected to database');
});