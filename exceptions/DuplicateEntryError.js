class DuplicateEntryError extends Error {
    constructor(message) {
      super(message);
      this.name = 'DuplicateEntryError';
      this.statusCode = 409; // Conflict
    }
  }
  
module.exports = DuplicateEntryError;
  