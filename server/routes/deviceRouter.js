const Router = require('express');
const router = new Router();
const deviceController = require('../controllers/deviceController');
const checkRole = require('../middlewares/checkRoleMiddleware');

// добавить девайс
router.post('/', checkRole('ADMIN'), deviceController.create);
// получить девайс
router.get('/', deviceController.getAll);
// получить конкретный девайс
router.get('/:id', deviceController.getOne);
// удалить девайс
router.delete('/delete/:id', deviceController.deleteDevice);

module.exports = router;