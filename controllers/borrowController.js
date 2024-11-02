// controllers/borrowController.js
const borrowService = require('../services/borrowService');
const BorrowResource = require('../resources/BorrowResource');

class BorrowController {
  async borrowBook(req, res, next) {
    const { bookId, userId, dueDate } = req.body;
    const borrowData = await borrowService.borrowBook(bookId, userId, dueDate);
    res.status(201).json({
      status: 'success',
      data: new BorrowResource(borrowData),
    });
  }

  async returnBook(req, res) {
    const { id } = req.params;
    const borrowData = await borrowService.returnBook(id);
    res.json({
      status: 'success',
      data: new BorrowResource(borrowData),
    });
  }

  async listBorrows(req, res, next) {
    const borrows = await borrowService.listAllBorrows();
    res.json({
      status: 'success',
      data: BorrowResource.collection(borrows),
    });
  }

  async listUserBorrowedBooks(req, res, next) {
    const { userId } = req.params;
    const borrows = await borrowService.listUserBorrowedBooks(userId);
    res.json({
      status: 'success',
      data: BorrowResource.collection(borrows),
    });
  }
}

module.exports = new BorrowController();
