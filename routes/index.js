const bookRoute = require('./bookRoutes');
const userRoute = require('./userRoutes');
const borrowRoute = require('./borrowRoutes');

const mountRoutes = (app) => {
    app.use('api/v1/books', bookRoute);
    app.use('api/v1/users', userRoute);
    app.use('api/v1/borrows', borrowRoute);
};

module.exports = mountRoutes;