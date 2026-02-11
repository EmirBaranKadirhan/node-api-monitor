const express = require('express')
const router = express.Router()
const { getMonitors, createMonitor, checkNow, getMonitorResults } = require('../controllers/monitorsController')


router.get("/", getMonitors)


router.post("/", createMonitor)

router.post("/:id/check", checkNow)

router.get("/:id/results", getMonitorResults)

module.exports = router