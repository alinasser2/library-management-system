// routes/borrowerRoutes.js
const express = require('express');
const borrowerController = require('../controllers/borrowerController');
const {
  addBorrowerValidator,
  updateBorrowerValidator,
} = require('../validators/borrowerValidators');

const router = express.Router();

router.get('/', borrowerController.listBorrowers);
router.get('/:id', borrowerController.getBorrower);
router.post('/', addBorrowerValidator, borrowerController.addBorrower);
router.put('/:id', updateBorrowerValidator, borrowerController.updateBorrower);
router.delete('/:id', borrowerController.deleteBorrower);

module.exports = router;


