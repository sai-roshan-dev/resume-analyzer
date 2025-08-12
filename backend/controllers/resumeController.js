const multer = require('multer');
const path = require('path');
const pdf = require('pdf-parse');
const Resume = require('../models/Resume');
const { getAIAnalysis } = require('../services/analysisService');

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Error: File upload only supports the following filetypes - " + filetypes));
    }
}).single('resume');

const uploadResume = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, error: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No file uploaded.' });
        }

        try {
            // 1. Extract text from PDF
            const dataBuffer = req.file.buffer;
            const pdfData = await pdf(dataBuffer);
            const extractedText = pdfData.text;

            // 2. Perform AI analysis using the new service
            const aiAnalysisResult = await getAIAnalysis(extractedText);

            // 3. Save the data to MongoDB
            const newResume = new Resume({
                fileName: req.file.originalname,
                // We are saving the raw extracted text as well
                extractedData: aiAnalysisResult.extractedData, // <-- Check this line
                aiAnalysis: aiAnalysisResult.aiAnalysis // <-- And this line
            });
            await newResume.save();

            res.status(201).json({
                success: true,
                message: 'Resume analyzed and saved successfully.',
                data: newResume
            });

        } catch (error) {
            console.error('Error during resume upload and analysis:', error);
            res.status(500).json({ success: false, error: 'Internal server error.' });
        }
    });
};

const getAllResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({});
        res.status(200).json({ success: true, data: resumes });
    } catch (error) {
        console.error('Error fetching resumes:', error);
        res.status(500).json({ success: false, error: 'Internal server error.' });
    }
};

const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ success: false, error: 'Resume not found.' });
        }
        res.status(200).json({ success: true, data: resume });
    } catch (error) {
        console.error('Error fetching resume by ID:', error);
        res.status(500).json({ success: false, error: 'Internal server error.' });
    }
};

const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findByIdAndDelete(req.params.id);
        if (!resume) {
            return res.status(404).json({ success: false, error: 'Resume not found.' });
        }
        res.status(200).json({ success: true, message: 'Resume deleted successfully.' });
    } catch (error) {
        console.error('Error deleting resume:', error);
        res.status(500).json({ success: false, error: 'Internal server error.' });
    }
};

module.exports = {
    uploadResume,
    getAllResumes,
    getResumeById,
    deleteResume
};
