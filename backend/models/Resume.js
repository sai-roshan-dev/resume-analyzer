const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    extractedData: {
        type: Object,
        required: false // Not required immediately on upload
    },
    aiAnalysis: {
        type: Object,
        required: false // Not required immediately on upload
    }
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);