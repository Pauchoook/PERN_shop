const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const checkRole = require('../middlewares/checkRoleMiddleware');

// добавить тип
router.post('/', checkRole('ADMIN'), typeController.create);
// получить типы
router.get('/', typeController.getAll);
// удалить тип
router.delete('/delete', typeController.deleteType);

module.exports = router;