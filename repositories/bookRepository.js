const { Book } = require('../models');
const { Op } = require('sequelize');

class BookRepository {
  async findAll() {
    return await Book.findAll();
  }

  async findById(id) {
    return await Book.findByPk(id);
  }

  async search(query) {
    console.log(query);
    return await Book.findAll({ where: query });
  }

  async create(bookData) {
    bookData.availableQuantity = bookData.quantity;
    return Book.create(bookData);
  }

  async update(id, bookData) {
    const book = await this.findById(id);
    await book.update(bookData);
    return book;
  }

  async delete(id) {
    const book = await this.findById(id);
    await book.destroy();
  }

  async findByISBN(ISBN) {
    return await Book.findOne({ where: { ISBN } });
  }


  async findByAuthor(author) {
    return await Book.findAll({ where: { author : { [Op.like]: `%${author.trim()}%` } } });
  }

}

module.exports = new BookRepository();
