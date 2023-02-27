require('dotenv').config();
const mongoose = require('mongoose');

const { DATABASE_URL } = process.env;

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection
.on('open', () => console.log('DATABASE CONNECTED'))
.on('close', () => console.log('DATABASE CLOSE'))
.on('error', (error) => console.log('DATABASE ERROR', error));

module.exports = mongoose;