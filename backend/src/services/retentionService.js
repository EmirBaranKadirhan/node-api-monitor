const CheckResult = require("../models/CheckResult")


const deleteOldCheckResults = async (days = 30) => {

    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);


    const result = await CheckResult.deleteMany({

        checkedAt: { $lt: cutoff },

    })


    return { deletedCount: result.deletedCount, cutoff }


}



module.exports = { deleteOldCheckResults }