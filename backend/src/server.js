require("dotenv").config()      // env dosyasini okumamizi saglar! (process.env.MONGO_URL) sekline donusur artik
console.log("ENV MONGO_URL:", process.env.MONGO_URL);


const app = require('./app')
const connectDB = require('./config/db')
const Monitor = require('./models/Monitor')
console.log("Monitor modeli yüklendi mi:", !!Monitor);

const PORT = process.env.PORT || 5000


const startServer = async () => {

    try {

        await connectDB(process.env.MONGO_URL)

        app.listen(PORT, () => {
            console.log(`Server running: http://localhost:${PORT}`);
        })


    } catch (error) {

        console.log("Server başlatılamadı:", error)
    }

}


startServer();
