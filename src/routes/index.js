const { Router } = require('express');
const todoRouter = require('./todo.routes');
const authRouter = require('./auth.routes');

const router = Router();

router.use('/todos', todoRouter);
router.use('/auth', authRouter);

module.exports = router;
