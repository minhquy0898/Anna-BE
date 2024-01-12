const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require("morgan");
const cors = require("cors")
const connectDB = require('./config/db');
const authRouter = require('./routes/authRouter')
const categoryRouter = require('./routes/categoryRouter')
const productRouter = require("./routes/productRouter")
const storeRouter = require('./routes/storeRouter')
const orderRouter = require('./routes/orderRouter')

// Configure env
dotenv.config()

//database config
connectDB();

// Đối tượng REST
const app = express();

//cors
app.use(cors());

//middleware
app.use(express.json())
app.use(morgan('dev'))

//router
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/store', storeRouter);
app.use('/api/v1/order', orderRouter)

// API REST
app.get("/", (req, res) => {
    res.send({
        message: "Chào mừng đến với hệ thống Anna"
    });
});

// Cổng
const PORT = process.env.PORT || 8080;

// Lắng nghe
app.listen(PORT, () => {
    console.log(`Server đang chạy ở cổng ${PORT}`.bgCyan.white);
});
