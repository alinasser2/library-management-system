// resources/BorrowResource.js
class BorrowResource {
    constructor(borrow) {
      this.id = borrow.id;
      this.bookId = borrow.bookId;
      this.borrowerId = borrow.borrowerId;
      this.borrowedAt = borrow.borrowedAt;
      this.returnedAt = borrow.returnedAt;
    }
  
    static collection(borrows) {
      return borrows.map(borrow => new BorrowResource(borrow));
    }
  }
  
  module.exports = BorrowResource;
  