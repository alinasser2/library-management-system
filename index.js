const express = require('express');
const app = express();
const { errorHandler } = require('./middlewares/errorHandler');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mountRoutes = require('./routes/index');
const CustomException = require('./exceptions/CustomException');

app.use(express.json());
app.use(cors());
app.options('*', cors());

// Define the rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 2 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Apply the rate limiter only to the specific routes before mounting them
app.use('/api/v1/books', limiter); // Apply to book-related endpoints
app.use('/api/v1/borrows', limiter); // Apply to borrow-related endpoints

// Mount other routes
mountRoutes(app);


app.all('*', (req, res, next) => {
  next(new CustomException('Route not found', 404));
});


// Global error handler
app.use(errorHandler);





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
