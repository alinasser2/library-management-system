const reportSRepository = require('../repositories/reportRepository');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const fs = require('fs');

const reportService = {

  async getBorrowingReport(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return await reportSRepository.getBorrowingProcessReport(start, end);
  },

  async exportBorrowingReportToCSV(startDate, endDate) {
    // Ensure the exports directory exists
    const exportDir = path.join(__dirname, '../exports');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir);
    }

    const reportData = await this.getBorrowingReport(startDate, endDate);

    const csvWriter = createCsvWriter({
      path: path.join(exportDir, 'borrowing_report.csv'), // CSV file path
      header: [
        { id: 'id', title: 'Borrow ID' },
        { id: 'bookId', title: 'Book ID' },
        { id: 'userId', title: 'User ID' },
        { id: 'borrowDate', title: 'Borrow Date' },
        { id: 'dueDate', title: 'Due Date' },
        { id: 'returnDate', title: 'Return Date' },
        { id: 'bookTitle', title: 'Book Title' },
        { id: 'bookAuthor', title: 'Book Author' },
        { id: 'userName', title: 'User Name' },
        { id: 'userEmail', title: 'User Email' },
      ],
    });

    const records = reportData.map(borrow => ({
      id: borrow.id,
      bookId: borrow.bookId,
      userId: borrow.userId,
      borrowDate: borrow.borrowDate,
      dueDate: borrow.dueDate,
      returnDate: borrow.returnDate,
      bookTitle: borrow.book.title,
      bookAuthor: borrow.book.author,
      userName: borrow.user.name,
      userEmail: borrow.user.email,
    }));

    await csvWriter.writeRecords(records);
    return path.join(exportDir, 'borrowing_report.csv');
  }

};

module.exports = reportService;
