const moongose = require('mongoose');
require('dotenv').config();

const mongourl = process.env.MONGO_URI

const connectMoongoseDb = async () => {
    try{
        await moongose.connect(mongourl,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        // moongose.set("useFindAndModify", false);
        console.log("Connected to MongoDB successfully");
    }
    catch(err){
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }
}
module.exports = connectMoongoseDb;