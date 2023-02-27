const Todo = require('../models/Todo');
const TodoController = {
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const result =  await Todo.findById(id);
            if (!result) throw new Error('Todo not found!');

            res.status(200).json(result);
        } catch (error) {
            const { message } = error;
            let status = 0;
            if (message.error.includes('not found')) {
                status = 404;
            } else {
                status = 500;
            }

            res.status(status).json(message);
        }
    },

    async getAll(req, res) {
        try {
            const { username } = req.user;
            const result =  await Todo.find({ username });

            res.status(200).json(result);
        } catch (error) {
            const { message } = error;
            res.status(500).json(message);
        }
    },

    async create(req, res) {
        try {
            const { username } = req.user;
            const { name, isDone } = req.body;
            if (!name) throw new Error('Validation error')

            const result = await Todo.create({ name, isDone, username });
            await result.save();

            res.status(201).json(result);
        } catch (error) {
            const { message } = error;
            let status = 0;

            if (message.includes('Validation')) {
                status = 400;
            } else {
                status = 500;
            }

            res.status(status).json({ message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;

            const { isDone } = req.body;
            const target = await Todo.findOne({ _id: id })
            if (!target) throw new Error('Todo not found');
            const result = await Todo.findOneAndUpdate(
                { _id: id },
                { isDone},
                { returnOriginal: false }
            );

            res.status(200).json(result);
        } catch (error) {
            const { message } = error;
            let status;
            if (message.includes('not found')) {
                status = 404;
            } else {
                status = 500;
            }

            res.status(status).json({ message });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await Todo.findOneAndDelete({ _id: id });
            if (!result) throw new Error('Todo not found!');

            res.status(200).json({ message: 'Todo deleted succesful' });
        } catch (error) {
            const { message } = error;
            let status;
            if (message.includes('Not found')) {
                status = 404;
            } else {
                status = 500;
            }

            res.status(status).json({ message });
        }
    }
}

module.exports = TodoController;
