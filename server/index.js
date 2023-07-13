const path = require('path');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParse = require('cookie-parser');
const mongoose = require('mongoose');

const tourRoutes = require('./routes/tour');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ib4yh9l.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: false })); // x-www-form-urlencoded parser
app.use(cookieParse());

// middleware cors
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: 'OPTIONS, GET, POST, PUT, PATCH, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // hỗ trợ sử dụng cookie
  })
);

// routes
app.use('/api/tours', tourRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/cookies', (req, res) => res.json(req.cookies));

// middleware handler error
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// connect
mongoose
  .connect(MONGODB_URI)
  .then(result => {
    console.log('connected');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch(err => console.log(err));
