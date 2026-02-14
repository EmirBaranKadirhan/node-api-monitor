const mongoose = require("mongoose");


const alertSchema = new mongoose.Schema({

    monitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Monitor",
        required: true,
        index: true
    },

    type: {
        type: String,
        enum: ["DOWN", "RECOVERED"],
        required: true,
        index: true
    },

    fromStatus: {
        type: String,
        enum: ["healthy", "unhealthy", "unknown"],
        default: "unknowm"
    },
    toStatus: {
        type: String,
        enum: ["healthy", "unhealthy"],
        required: true,
    },
    failCount: Number,
    windowSize: Number,
    reason: String,
    createdAt: { type: Date, default: Date.now, index: true },


}, { timestamps: true })


alertSchema.index({ monitor: 1, createdAt: -1 });

module.exports = mongoose.model("Alert", alertSchema)