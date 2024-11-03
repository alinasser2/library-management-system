const borrowRepository = require('../repositories/borrowRepository');
const CustomException = require('../exceptions/CustomException');
const bookRepository = require('../repositories/bookRepository');
const userRepository = require('../repositories/userRepository');
const bookService = require('./bookService');



class BorrowService {

  async borrowBook(bookId, userId, dueDate) {
    await this.validateBorrowingBook(bookId, userId);
    const borrowRecord = await borrowRepository.createBorrowRecord({ bookId, userId, dueDate });
    const book = await bookRepository.findById(bookId);
    book.availableQuantity -= 1;
    await book.save();
    return borrowRecord;
  }

  async validateBorrowingBook(bookId, userId)
  {
    const book = await bookRepository.findById(bookId);
    await bookService.checkBookExists(bookId);
    await this.checkUserExists(userId);
    if(book.availableQuantity === 0)
    {
      throw new CustomException("Book is not available for borrowing");
    }
    const borrow = await borrowRepository.findBorrowByBookIdAndUserId(bookId, userId);
    if(borrow)
    {
      throw new CustomException("User has already borrowed this book");
    }
  }

  async returnBook(id) {
    await this.checkBorrowRecordExists(id);
    const borrow = await borrowRepository.findBorrowById(id); 
    const book = await bookRepository.findById(borrow.bookId);
    borrow.returnDate = new Date();
    book.availableQuantity += 1;
    await book.save();  
    await borrow.save();
    return borrow;
  }

  async checkBorrowRecordExists(id) {
    if (!await borrowRepository.findBorrowById(id)) {
      throw new CustomException('Borrow record not found');
    }
  }

  async listAllBorrows() {
    return borrowRepository.findAllBorrows();
  }


  async listUserBorrowedBooks(userId) {
    return borrowRepository.findBorrowsByUserId(userId);
  }

  async checkUserExists(userId) {
    if (!await userRepository.findById(userId)) {
      throw new CustomException('User not found');
    }
  }




}

module.exports = new BorrowService();
