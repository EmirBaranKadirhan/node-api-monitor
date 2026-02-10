const mongoose = require('mongoose');


const connectDB = async (uri) => {

    try {

        await mongoose.connect(uri)
        console.log("MongoDb Connected");

    } catch (error) {

        console.log("MongoDb connection error", error)
    }
}


module.exports = connectDB