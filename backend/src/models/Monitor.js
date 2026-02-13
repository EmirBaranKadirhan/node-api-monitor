const mongoose = require('mongoose')
const Schema = mongoose.Schema

const monitorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    intervalSec: {
        type: Number,
        required: false,
        default: 60
    },
    timeoutMs: {
        type: Number,
        required: false,
        default: 5000
    },
    expectedStatus: {
        type: Number,
        required: false,
        default: 200
    },
    enabled: {
        type: Boolean,
        required: false,
        default: true
    },
    status: {
        type: String,
        enum: ["healthy", "unhealthy"],
        default: "healthy"
    },
    lastStatusChangeAt: {               // Ne zaman healthy → unhealthy oldu?
        type: Date
    },
    lastCheckedAt: {
        type: Date
    },
    nextCheckAt: {
        type: Date
    }
},
    { timestamps: true })


module.exports = mongoose.model("Monitor", monitorSchema);