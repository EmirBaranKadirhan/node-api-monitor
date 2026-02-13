const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CheckResult = new Schema({
    monitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Monitor',
        required: true
    },
    ok: {
        type: Boolean,
        required: true
    },
    status: {
        type: Number,
    },
    latencyMs: {
        type: Number
    },
    error: {
        type: String
    },
    checkedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

CheckResult.index({ monitor: 1, checkedAt: -1 });       // Bileşik İndeks: monitor(1:artan), checkedAt(-1:azalan/en yeni üstte). Tum db'yi tek tek taramasina gerek kalmaz bu sayede

module.exports = mongoose.model("CheckResult", CheckResult);