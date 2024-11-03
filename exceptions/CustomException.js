class CustomException extends Error {
    constructor(message) {
        super(message);
        this.name = 'Bad Request';
        this.statusCode = 400; // Conflict
      }
}

module.exports = CustomException;