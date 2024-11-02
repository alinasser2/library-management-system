const { Borrow } = require('../models');
const { Book } = require('../models');
const { Borrower } = require('../models');

class BorrowRepository {
  async createBorrowRecord(data) {
    console.log(data);
    return Borrow.create(data);
  }

  async findBorrowById(id) {
    return Borrow.findByPk(id);
  }

  async findAllBorrows() {
    return Borrow.findAll({ include: [Book, Borrower] });
  }
}

module.exports = new BorrowRepository();
