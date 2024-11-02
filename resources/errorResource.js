const createErrorResponse = (errors, statusCode = 400) => {
    return {
      status: 'error',
      statusCode: statusCode, // Include the status code in the response
      errors: Array.isArray(errors) ? errors : [errors],
    };
  };
  
module.exports = createErrorResponse;
  