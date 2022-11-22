const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController');
const checkRole = require('../middlewares/checkRoleMiddleware');

// добавить бренд
router.post('/', checkRole('ADMIN'),brandController.create);
// получить бренды
router.get('/', brandController.getAll);
// удалить бренд
router.delete('/delete/:id', brandController.deleteBrand);

module.exports = router;