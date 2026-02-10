const axios = require('axios')


const runCheck = async ({ url, timeoutMs, expectedStatus }) => {

    const startTime = Date.now()        //baslangic zamani

    try {

        const response = await axios.get(url, { timeout: timeoutMs })       // istek attik

        const endTime = Date.now()              // bitis zamani 

        const latencyMs = endTime - startTime               // fark

        const ok = response.status === expectedStatus       // beklenen status mu?

        return {

            ok,
            status: response.status,
            latencyMs,
            error: null

        };


    } catch (error) {

        const endTime = Date.now();

        return {

            ok: false,
            status: null,
            latencyMs: endTime - startTime,
            error: error.message

        }
    }
}


module.exports = { runCheck }