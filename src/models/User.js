const { Schema, model } = require('../helpers/connection.js');

const schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

schema.set('timestamps', true);

const User = model('user', schema);

module.exports = User;
