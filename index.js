const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/sequelize');
const bookRouter = require('./routes/bookRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/v1/books', bookRouter);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
