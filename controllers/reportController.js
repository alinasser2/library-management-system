const reportService = require('../services/reportService');

const reportController = {
  getBorrowingReport: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const report = await reportService.generateBorrowingReport(startDate, endDate);
      res.status(200).json(report);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  exportBorrowingReport: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const filePath = await reportService.exportToCSV(startDate, endDate);
      res.download(filePath);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = reportController;
