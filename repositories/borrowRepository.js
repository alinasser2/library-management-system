const { Borrow } = require('../models');
const { Book } = require('../models');
const { User } = require('../models');

class BorrowRepository {
  async createBorrowRecord(data) {
    console.log(data);
    return Borrow.create(data);
  }

  async findBorrowById(id) {
    return Borrow.findByPk(id);
  }

  async findBorrowsByUserId(userId) {
    return Borrow.findAll({
      where: {
        userId,
        return_date: null, // Only get borrows that have not been returned
      },
    });
  }

  async findBorrowByBookIdAndUserId(bookId, userId) {
    return Borrow.findOne({
      where: {
        bookId,
        userId,
        returnDate: null,
      },
    });
  }


  

}

module.exports = new BorrowRepository();
