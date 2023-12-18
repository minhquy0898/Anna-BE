const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require("morgan");
const cors = require("cors")
const connectDB = require('./config/db');
const authRouter = require('./routes/authRouter')

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
