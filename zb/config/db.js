const mongoose = require("mongoose");


// mongoose.connect(process.env.MONGOURL).then(()=>{
//     console.log("Connected to DB");
// });
const connectToDb = ()=>{
    mongoose.connect(process.env.MONGOURL)
    .then(()=>{
        console.log('Connected to DB');
    }).catch(err => console.log(err));
}

module.exports = connectToDb;
