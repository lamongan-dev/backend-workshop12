require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const secret = process.env.SECRET;

const AuthController = {
    async signup(req, res) {
        try {
            const { username, password } = req.body;
            if (!username || !password) throw new Error('Validation Error');
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({ username, password: hashedPassword });
            await user.save();

            res.status(201).json({ user });

        } catch (error) {
            let { message } = error;
            let status;

            if (message.includes('validation')) {
                status = 400;
            } else if (message.includes('E11000')){
                message = 'User already exist';
                status = 400;
            } else {
                status = 500;
            }

            res.status(status).json({ message });
        }
    },

    async login(req, res) {
        try {
            const { username, password } = req.body;

            const target = await User.findOne({ username });
            if (!target) throw new Error('User not found');

            let token;
            const isMatch = await bcrypt.compare(password, target.password);
            if (isMatch ) {
                token = await jwt.sign({ username }, secret);
            } else {
                throw new Error('password not match');
            }

            res.status(200).json({ token });
        } catch (error) {
            let { message } = error;
            let status;

            if (message.includes('not found')) {
                status = 404
            } else if (message.includes('password not match')) {
                status = 400;
            } else {
                message = 'Internal server error'
                status = 500;
            }

            res.status(status).json({ message });
        }
    },
}

module.exports = AuthController;
