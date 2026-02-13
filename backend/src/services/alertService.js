const CheckResult = require("../models/CheckResult")
const Monitor = require("../models/Monitor")


const evaluateMonitorHealth = async (monitorId, windowSize = 5, failThreshold = 3) => {         // windowSize ==> kac sonuc bakilacak , failThreshold ==> failThreshold


    const lastResults = await CheckResult.find({ monitor: monitorId }).sort({ checkedAt: -1 }).limit(windowSize)

    if (lastResults.length === 0) {

        return { changed: false, status: null, reason: "no_results" };
    }

    let failCount = 0;

    for (const result of lastResults) {

        if (!result.ok) {
            failCount += 1
        }

    }

    //  Yeni status’u hesapla
    const newStatus = failCount >= failThreshold ? "unhealthy" : "healthy"      // failThreshold ==> parametreden gelen deger 

    const monitor = await Monitor.findById(monitorId)

    if (!monitor) {

        return { changed: false, status: null, reason: "monitor_not_found" };
    }

    // Status zaten aynıysa DB yazma
    if (monitor.status === newStatus) {
        return { changed: false, status: newStatus, failCount, windowSize };
    }


    // Status değiştiyse güncelle
    monitor.status = newStatus;
    monitor.lastStatusChangeAt = new Date();
    await monitor.save();

    return { changed: true, status: newStatus, failCount, windowSize };
};


module.exports = { evaluateMonitorHealth };