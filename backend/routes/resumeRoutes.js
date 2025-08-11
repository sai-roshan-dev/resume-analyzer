const express = require('express');
const router = express.Router();
const { uploadResume, getAllResumes } = require('../controllers/resumeController');

router.post('/upload', uploadResume);
router.get('/', getAllResumes);

module.exports = router;