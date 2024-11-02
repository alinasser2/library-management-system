const bookRoute = require('./bookRoutes');
const borrowerRoute = require('./borrowerRoutes');
const borrowRoute = require('./borrowRoutes');

const mountRoutes = (app) => {
    app.use('api/v1/books', bookRoute);
    app.use('api/v1/borrowers', borrowerRoute);
    app.use('api/v1/borrows', borrowRoute);
};

module.exports = mountRoutes;