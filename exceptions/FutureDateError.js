class FutureDateError extends Error {
    constructor(message) {
      super(message);
      this.name = 'FutureDateError';
      this.statusCode = 400;
    }
  }
  
  module.exports = FutureDateError;
  