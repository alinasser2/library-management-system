// resources/BorrowerResource.js
class BorrowerResource {
    constructor(borrower) {
      this.id = borrower.id;
      this.name = borrower.name;
      this.email = borrower.email;
      this.registeredAt = borrower.registeredAt;
    }
  
    static collection(borrowers) {
      return borrowers.map(borrower => new BorrowerResource(borrower));
    }
  }
  
  module.exports = BorrowerResource;
  