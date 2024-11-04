class BookResource {
    constructor(book) {
      this.id = book.id;
      this.title = book.title;
      this.author = book.author;
      this.isbn = book.isbn;
      this.quantity = book.quantity;
      this.availableQuantity = book.availableQuantity;
      this.location = book.location;
      this.createdAt = book.created_at;
      this.updatedAt = book.updated_at;
    }
  
    static collection(books) {
      return books.map(book => new BookResource(book));
    }
  }
  
  module.exports = BookResource;
  
