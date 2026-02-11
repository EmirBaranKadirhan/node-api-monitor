const CheckResult = require("../models/CheckResult")
const Monitor = require("../models/Monitor")

const { runCheck } = require("./checkService")

let isRunning = false;

const startScheduler = () => {

    setInterval(async () => {

        if (isRunning) {                // Bir tur bitmeden ikinci tur başlamaz !!!
            console.log("Scheduler: önceki tur bitmedi, bu tur atlandı.");
            return;
        }

        isRunning = true;

        try {

            console.log("Scheduler çalıştı...")

            const monitors = await Monitor.find({ enabled: true })
            console.log("Enabled monitors:", monitors.length)

            for (const monitor of monitors) {

                try {

                    const result = await runCheck({

                        url: monitor.url,
                        timeoutMs: monitor.timeoutMs,
                        expectedStatus: monitor.expectedStatus

                    })

                    await CheckResult.create({

                        monitor: monitor._id,
                        ok: result.ok,
                        status: result.status,
                        latencyMs: result.latencyMs,
                        error: result.error,
                        checkedAt: new Date(),
                    })

                    console.log("Saved result for:", monitor.name);
                } catch (monitorError) {
                    // SADECE BU MONITOR'DA HATA VARSA
                    console.log("Monitor check failed:", monitor.name, monitorError.message);

                }

            }
        } catch (error) {
            console.log("Scheduler tick failed:", error.message);
        } finally {
            isRunning = false;                  // bu kisim her turlu olmali yoksa schedular bir daha calismaz
        }



    }, 60000)


}



module.exports = { startScheduler }