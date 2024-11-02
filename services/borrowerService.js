const borrowerRepository = require('../repositories/borrowerRepository');
const NotFoundError = require('../exceptions/NotFoundError');
const DuplicateEntryError = require('../exceptions/DuplicateEntryError');

class BorrowerService {
  async listAllBorrowers() {
    return await borrowerRepository.findAll();
  }

  async getBorrower(id) {
    return await borrowerRepository.findById(id);
  }

  async addBorrower(borrowerData) {
    return await borrowerRepository.create(borrowerData);
  }

  async updateBorrower(id, borrowerData) {
    const borrower = await borrowerRepository.findById(id);
    return await borrowerRepository.update(borrower, borrowerData);
  }

  async deleteBorrower(id) {
    return await borrowerRepository.delete(id);
  }
}

module.exports = new BorrowerService();
