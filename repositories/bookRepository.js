const { Book } = require('../models');
const { Op } = require('sequelize');

class BookRepository {
  async findAll() {
    return await Book.findAll();
  }

  async findById(id) {
    return await Book.findByPk(id);
  }

  async create(bookData) {
    return await Book.create(bookData);
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

  // search by title, author or ISBN
 async search(query) {
  const whereClause = {};
  for (const [key, value] of Object.entries(query)) {
    whereClause[key] = value;
  }
  const books = await Book.findAll({
    where: whereClause
  });
  return books;
 }

  async findByAuthor(author) {
    return await Book.findAll({ where: { author : { [Op.like]: `%${author.trim()}%` } } });
  }

}

module.exports = new BookRepository();
