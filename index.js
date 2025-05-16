const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database.config');
const { syncDatabase } = require('./models/associations');
const path = require('path');
const errorHandler = require('./middlewares/errorHandler');
const dotenv = require('dotenv');

dotenv.config();

const envFile =
  process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
dotenv.config({ path: envFile });

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

syncDatabase();
// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const userAddressRoutes = require('./routes/userAddressRoutes');
const cartRoutes = require('./routes/cartRoutes');
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/addresses', userAddressRoutes);
app.use('/api/v1/cart', cartRoutes);

app.all('/*splat', (req, res, next) => {
  const AppError = require('./utils/AppError');
  return next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Global Error Handler - should be last
app.use(errorHandler);
// Start server
sequelize.sync().then(() => {
  console.log('✅ Database connected and synced');
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
  });
});
