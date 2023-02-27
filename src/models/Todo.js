const { Schema, model } = require('../helpers/connection.js');

const schema = new Schema({
    name: { type: String, required: true },
    isDone: { type: Boolean, required: true, default: false },
    username: { type: String, required: true },
});

schema.set('timestamps', true);
const Todo = model('todo', schema);

module.exports = Todo;
