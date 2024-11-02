const borrowerService = require('../services/borrowerService');
const BorrowerResource = require('../resources/BorrowerResource');

class BorrowerController {
  async listBorrowers(req, res, next) {
    const borrowers = await borrowerService.listAllBorrowers();
    res.json({
      status: 'success',
      data: borrowers,
    });
  }

  async getBorrower(req, res, next) {
    const borrower = await borrowerService.getBorrower(req.params.id);
    res.json({
      status: 'success',
      data: borrower,
    });
  }

  async addBorrower(req, res, next) {
    const borrowerData = req.body;
    const newBorrower = await borrowerService.addBorrower(borrowerData);
    res.status(201).json({
      status: 'success',
      data: newBorrower,
    });
  }

  async updateBorrower(req, res, next) {
    const borrowerData = req.body;
    const updatedBorrower = await borrowerService.updateBorrower(req.params.id, borrowerData);
    res.json({
      status: 'success',
      data: updatedBorrower,
    });
  }

  async deleteBorrower(req, res, next) {
    await borrowerService.deleteBorrower(req.params.id);
    res.json({
      status: 'success',
      message: 'Borrower deleted successfully',
    });
  }
}

module.exports = new BorrowerController();
