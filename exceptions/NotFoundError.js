// exceptions/NotFoundError.js
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404; // You can also include a status code if you want
  }
}

module.exports = NotFoundError;
