const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const checkRole = require('../middlewares/checkRoleMiddleware');

// создать корзину
router.post('/add',checkRole('ADMIN'), basketController.create);
// добавить в корзину
router.put('/update',checkRole('ADMIN'), basketController.update);
// получить товары
router.get('/devices', checkRole('ADMIN'), basketController.getAll);
// // удалить товар из корзины
router.delete('/delete', checkRole('ADMIN'), basketController.delete);

module.exports = router;