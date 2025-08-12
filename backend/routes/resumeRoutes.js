const express = require('express');
const router = express.Router();
const { uploadResume, getAllResumes, getResumeById, deleteResume } = require('../controllers/resumeController');

router.post('/upload', uploadResume);
router.get('/', getAllResumes);
router.get('/:id', getResumeById);
router.delete('/:id', deleteResume);

module.exports = router;
