const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes');
const { errorHandler } = require('./middlewares/errorHandler');
const userRoutes = require('./routes/userRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mountRoutes = require('./routes/index');
const reportRoutes = require('./routes/reportRoutes'); // Adjust the import path as needed

app.use(express.json());

app.use(cors());
app.options('*', cors());



app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/borrows', borrowRoutes);
app.use(reportRoutes);

app.use(errorHandler);


// Enable other domains to access your application
app.use(cors());
app.options('*', cors());


// Global error handler


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message:
    'Too many accounts created from this IP, please try again after an hour',
});

app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
