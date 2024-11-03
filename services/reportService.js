const reportRepository = require('../repositories/reportRepository');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');

const reportService = {
  async getBorrowingReport(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return await reportRepository.getBorrowingProcessReport(start, end);
  },

  async exportBorrowingReportToCSV(startDate, endDate) {
    const reportData = await this.getBorrowingReport(startDate, endDate);
    return await this.writeRecordsToCSV(reportData, 'borrowing_report.csv');
  },

  async exportOverdueBorrowsLastMonthToCSV() {
    const reportData = await reportRepository.getOverdueBorrowsLastMonth();
    return await this.writeRecordsToCSV(reportData, 'overdue_borrows_last_month.csv');
  },

  async exportAllBorrowsLastMonthToCSV() {
    const reportData = await reportRepository.getAllBorrowsLastMonth();
    return await this.writeRecordsToCSV(reportData, 'all_borrows_last_month.csv');
  },

  async writeRecordsToCSV(reportData, fileName) {
    const csvWriter = createCsvWriter({
      path: path.join(__dirname, '../exports', fileName), // Define CSV file path
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
    return path.join(__dirname, '../exports', fileName);
  },
};

module.exports = reportService;
