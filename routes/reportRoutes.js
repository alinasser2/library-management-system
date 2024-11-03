const express = require('express');
const reportController = require('../controllers/reportController'); // Adjust the import path as needed

const router = express.Router();

// Route to generate borrowing reports

router.get('/report/borrowing/export', reportController.exportBorrowingReportToCSV);

module.exports = router;
