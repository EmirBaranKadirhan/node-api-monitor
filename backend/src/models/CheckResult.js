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


module.exports = mongoose.model("CheckResult", CheckResult);