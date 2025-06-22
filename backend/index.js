const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const uploadImage = require("./src/utils/uploadImage");
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;


// Middleware setup
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


// import all routes
const authRoutes = require('./src/users/user.routes');
const productRoutes = require('./src/products/products.routes');
const orderRoutes = require('./src/orders/orders.routes');
const reviewRoutes = require('./src/reviews/reviews.routes');
const statsRoutes = require('./src/stats/stats.routes');

// routes setup
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/stats', statsRoutes);


async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  app.get('/', (req, res) => {
    res.send('Glamora E-commerce Server is running!');
  });
};

main()
  .then(() => console.log("MongoDB is connected successfully!"))
  .catch(err => console.log(err));

// Upload image routes
app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then(url => res.send(url))
    .catch(err => res.status(500).send(err));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
