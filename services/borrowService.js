const borrowRepository = require('../repositories/borrowRepository');
const NotFoundError = require('../exceptions/NotFoundError');

class BorrowService {
  async borrowBook(bookId, borrowerId, dueDate) {
    return await borrowRepository.createBorrowRecord({ bookId, borrowerId, dueDate });
  }

  async returnBook(id) {
    const borrow = await borrowRepository.findBorrowById(id);    
    borrow.returnedAt = new Date();
    borrow.save();
    return borrow;
  }

  async listAllBorrows() {
    return borrowRepository.findAllBorrows();
  }
}

module.exports = new BorrowService();
