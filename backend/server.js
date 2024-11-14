require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
const DB_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method, new Date());
    next();
})

app.get('/', (req, res) => {
    res.send('Backend Server is working.')
})

// DB Connection & Server Setup
mongoose.set('debug', false);
mongoose.connect(DB_URL)
    .then(() => {
        console.log('Connected to MongoDB')

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        })
    })
    .catch(err => console.error('MongoDB connection error:', err));
