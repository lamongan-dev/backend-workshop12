const { Router } = require('express');
const TodoController = require('../controllers/todo.controller');
const AuthMiddleware = require('../middlewares/auth.middlewares');

const router = Router();

router.get('/', AuthMiddleware.isLoggedIn, TodoController.getAll);
router.get('/:id', TodoController.getOne);
router.post('/', AuthMiddleware.isLoggedIn, TodoController.create);
router.put('/:id', TodoController.update);
router.delete('/:id', TodoController.delete);

module.exports = router;
