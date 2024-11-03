const { Borrow, Book, User } = require('../models'); // Adjust the path based on your project structure
const { Op } = require('sequelize');

const reportRepository = {
  // Get all borrowing processes within a specific date range
  async getBorrowingProcessReport(startDate, endDate) {
    return await Borrow.findAll({
      where: {
        borrowDate: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      include: [
        {
          model: Book,
          as: 'book',
          attributes: ['id', 'title', 'author'], // Select fields to include
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'], // Select fields to include
        },
      ],
    });
  },

  // Get all overdue borrows in a specific date range
  async getOverdueBorrows(startDate, endDate) {
    return await Borrow.findAll({
      where: {
        dueDate: {
          [Op.lt]: new Date(), // Due date in the past
        },
        returnDate: null, // Not returned yet
        borrowDate: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      include: [
        {
          model: Book,
          as: 'book',
          attributes: ['id', 'title', 'author'], // Select fields to include
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'], // Select fields to include
        },
      ],
    });
  },

  // Additional function to get all borrows in the last month
  async getAllBorrowsLastMonth() {
    const end = new Date();
    const start = new Date();
    start.setMonth(end.getMonth() - 1);
    
    return await this.getBorrowingProcessReport(start, end);
  },

  // Additional function to get overdue borrows in the last month
  async getOverdueBorrowsLastMonth() {
    const end = new Date();
    const start = new Date();
    start.setMonth(end.getMonth() - 1);
    
    return await this.getOverdueBorrows(start, end);
  },
};

module.exports = reportRepository;
