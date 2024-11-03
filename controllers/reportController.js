const reportService = require('../services/reportService');
const createErrorResponse = require('../resources/errorResource');

const reportController = {
  // Export overdue borrows of the last month to CSV
  async exportOverdueBorrowsLastMonthToCSV(req, res) {
    try {
      const filePath = await reportService.exportOverdueBorrowsLastMonthToCSV();
      res.download(filePath, 'overdue_borrows_last_month.csv', (err) => {
        if (err) {
          res.status(500).json(createErrorResponse('Failed to download the file', 500));
        }
      });
    } catch (error) {
      res.status(500).json(createErrorResponse(error.message, 500));
    }
  },

  // Export all borrowing processes of the last month to CSV
  async exportAllBorrowsLastMonthToCSV(req, res) {
    try {
      const filePath = await reportService.exportAllBorrowsLastMonthToCSV();
      res.download(filePath, 'all_borrows_last_month.csv', (err) => {
        if (err) {
          res.status(500).json(createErrorResponse('Failed to download the file', 500));
        }
      });
    } catch (error) {
      res.status(500).json(createErrorResponse(error.message, 500));
    }
  },

  // Export borrowing report to CSV file
  async exportBorrowingReportToCSV(req, res) {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json(createErrorResponse('Please provide both startDate and endDate', 400));
    }

    try {
      const filePath = await reportService.exportBorrowingReportToCSV(startDate, endDate);
      res.download(filePath, 'borrowing_report.csv', (err) => {
        if (err) {
          res.status(500).json(createErrorResponse('Failed to download the file', 500));
        }
      });
    } catch (error) {
      res.status(500).json(createErrorResponse(error.message, 500));
    }
  },
};

module.exports = reportController;
