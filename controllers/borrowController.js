// controllers/borrowController.js
const borrowService = require('../services/borrowService');
const ErrorResource = require('../resources/errorResource');
const BorrowResource = require('../resources/BorrowResource');

class BorrowController {
  async borrowBook(req, res, next) {
    const { bookId, borrowerId, dueDate } = req.body;
    const borrowData = await borrowService.borrowBook(bookId, borrowerId, dueDate);
    res.status(201).json({
      status: 'success',
      data: new BorrowResource(borrowData),
    });
  }

  async returnBook(req, res, next) {
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
}

module.exports = new BorrowController();
