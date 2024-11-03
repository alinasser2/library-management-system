// BorrowRepository.js

const { Op } = require('sequelize');
const { Borrow, Book, User } = require('../models');

class reportRepository {
  async getBorrowingProcessReport(startDate, endDate) {
    return await Borrow.findAll({
      where: {
        borrowDate: {
          [Op.between]: [startDate, endDate], // Filter borrowDate within the date range
        },
      },
      include: [
        {
          model: Book,
          as: 'book', // Include related Book model
          attributes: ['id', 'title', 'author', 'isbn'], // Select specific attributes from Book
        },
        {
          model: User,
          as: 'user', // Include related User model
          attributes: ['id', 'name', 'email'], // Select specific attributes from User
        },
      ],
      order: [['borrowDate', 'ASC']], // Order results by borrowDate
    });
  }
}

module.exports = new reportRepository();
