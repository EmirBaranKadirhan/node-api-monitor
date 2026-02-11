const express = require("express")
const cors = require("cors")
const monitorsRouter = require("./routes/monitorsRoutes");
const { startScheduler } = require("./services/schedulerService")

const app = express()


//Middleware
app.use(cors())
app.use(express.json())
app.use("/api/monitors", monitorsRouter)

startScheduler()

//Test Endpoint
app.get("/", (req, res) => {
    res.send("API OK")
})


module.exports = app;