const express = require("express")
const cors = require("cors")
const monitorsRouter = require("./routes/monitorsRoutes");

const app = express()


//Middleware
app.use(cors())
app.use(express.json())
app.use("/api/monitors", monitorsRouter)

//Test Endpoint
app.get("/", monitorsRouter)


module.exports = app;