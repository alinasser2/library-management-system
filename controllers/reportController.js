const reportService = require('../services/reportService');
const createErrorResponse = require('../resources/errorResource');

const reportController = {

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
