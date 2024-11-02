// resources/BookResource.js
class BookResource {
    constructor(book) {
      this.id = book.id;
      this.title = book.title;
      this.author = book.author;
      this.isbn = book.isbn;
      this.quantity = book.quantity;
      this.availableQuantity = book.availableQuantity;
      this.location = book.location;
      this.createdAt = book.created_at; // Assuming you have this in your model
      this.updatedAt = book.updated_at; // Assuming you have this in your model
    }
  
    static collection(books) {
      return books.map(book => new BookResource(book));
    }
  }
  
  module.exports = BookResource;
  