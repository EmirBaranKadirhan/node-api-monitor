const Monitor = require("../models/Monitor")
const CheckResult = require("../models/CheckResult")
const { runCheck } = require("../services/checkService")


const getMonitors = async (req, res) => {

    try {
        const monitors = await Monitor.find().sort({ createdAt: -1 })

        return res.json(monitors)
    } catch (error) {

        return res.status(500).json({ message: "Monitors alınamadı", error: error.message });
    }

}


const createMonitor = async (req, res) => {

    try {

        const { name, url, intervalSec, timeoutMs, expectedStatus, enabled } = req.body

        if (!name || !url) {
            return res.status(400).json({ message: "name ve url zorunludur" });
        }

        const monitor = await Monitor.create({
            name,
            url,
            intervalSec,
            timeoutMs,
            expectedStatus,
            enabled
        })

        return res.status(201).json(monitor);
    } catch (error) {

        return res.status(500).json({ message: "Monitor oluşturulamadı", error: error.message });
    }

}

const checkNow = async (req, res) => {

    try {

        const { id } = req.params
        // const { id } = req.params;

        const monitor = await Monitor.findById(id)
        if (!monitor) {
            return res.status(404).json({ message: "Monitor Bulunamadi" })
        }

        const result = await runCheck({
            url: monitor.url,
            timeoutMs: monitor.timeoutMs,
            expectedStatus: monitor.expectedStatus

        });


        const saved = await CheckResult.create({

            monitor: monitor._id,
            ok: result.ok,
            status: result.status,
            latencyMs: result.latencyMs,
            error: result.error,
            checkedAt: new Date(),
        })

        return res.json({ monitor, result: saved });


    } catch (error) {

        return res.status(500).json({ message: "Check başarısız", error: error.message });
    }


}


const getMonitorResults = async (req, res) => {

    try {

        const { id } = req.params

        const limit = Number(req.query.limit) || 20;
        const skip = Number(req.query.skip) || 0;

        // CheckResult.find({ monitor: id }) ==>  monitor alani bu id olani getirme islemi
        const results = await CheckResult.find({ monitor: id }).sort({ checkedAt: -1 }).skip(skip).limit(limit)

        return res.json({
            monitorId: id,
            skip,
            limit,
            count: results.length,
            results

        })

    } catch (error) {

        return res.status(500).json({
            message: "Sonuclar Alinmadi",
            error: error.message

        })
    }



}


const getLastResult = async (req, res) => {

    try {

        const { id } = req.params;

        const monitor = await Monitor.findById(id)
        if (!monitor) {

            return res.status(404).json({ message: "Monitor Bulunamadi" })

        }

        last = await CheckResult.findOne({ monitor: id }).sort({ checkedAt: -1 })   // en son ki 1 kaydi istedigimiz icin findOne kullandik


        return res.json({

            monitor: {
                id: monitor._id,
                name: monitor.name,
                url: monitor.url,
                enabled: monitor.enabled
            },

            lastResult: last            // hiç sonuç yoksa null döner

        })




    } catch (error) {

        return res.status(500).json({
            message: "Son sonuç alınamadı",
            error: error.message,
        });

    }

}







module.exports = {
    getMonitors,
    createMonitor,
    checkNow,
    getMonitorResults,
    getLastResult
}