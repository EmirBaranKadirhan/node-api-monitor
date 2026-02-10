const express = require('express')
const router = express.Router()
const { getMonitors, createMonitor, checkNow } = require('../controllers/monitorsController')


router.get("/", getMonitors)


router.post("/", createMonitor)

router.post("/:id/check", checkNow)


module.exports = router