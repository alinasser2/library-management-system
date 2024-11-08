const express = require('express');
const reportController = require('../controllers/reportController'); // Adjust the import path as needed

const router = express.Router();

// Route to generate borrowing reports

router.get('/borrowing/export', reportController.exportBorrowingReportToCSV);

// Route to export overdue borrows of the last month
router.get('/borrows/overdue/last-month', reportController.exportOverdueBorrowsLastMonthToCSV);

// Route to export all borrows of the last month
router.get('/borrows/all/last-month', reportController.exportAllBorrowsLastMonthToCSV);

module.exports = router;
