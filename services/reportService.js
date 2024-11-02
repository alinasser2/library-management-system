const borrowRepository = require('../repositories/borrowRepository');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');

const reportService = {
  generateBorrowingReport: async (startDate, endDate) => {
    return await borrowRepository.findAllBorrowsInPeriod(startDate, endDate);
  },

  exportToCSV: async (startDate, endDate) => {
    const reportData = await reportService.generateBorrowingReport(startDate, endDate);
    const filePath = path.join(__dirname, '../exports', `borrowing_report_${Date.now()}.csv`);

    const csvWriter = createCsvWriter({
      path: filePath,
      header: [
        { id: 'id', title: 'ID' },
        { id: 'bookId', title: 'Book ID' },
        { id: 'userId', title: 'User ID' },
        { id: 'borrowDate', title: 'Borrow Date' },
        { id: 'dueDate', title: 'Due Date' },
        { id: 'returnDate', title: 'Return Date' },
      ],
    });

    await csvWriter.writeRecords(reportData);
    return filePath;
  },
};

module.exports = reportService;
