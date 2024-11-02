const { Borrower } = require('../models')

class BorrowerRepository {
  async findAll() {
    return Borrower.findAll();
  }

  async findById(id) {
    return Borrower.findByPk(id);
  }

  async create(borrowerData) {
    return Borrower.create(borrowerData);
  }

  async update(borrower, borrowerData) {
    return borrower.update(borrowerData);
  }

  async delete(id) {
    return Borrower.destroy({ where: { id } });
  }
}

module.exports = new BorrowerRepository();
