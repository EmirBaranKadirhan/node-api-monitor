const express = require('express')
const router = express.Router()
const { getMonitors, createMonitor, checkNow, getMonitorResults, getLastResult, getMonitorStats } = require('../controllers/monitorsController')


router.get("/", getMonitors)


router.post("/", createMonitor)

router.post("/:id/check", checkNow)

router.get("/:id/results", getMonitorResults)

router.get("/:id/last-result", getLastResult)

router.get("/:id/stats", getMonitorStats)

module.exports = router