const ApiError = require('../error/ApiError');
const {Basket, BasketDevice, Device} = require('../models/models');

class BasketController {
   async create(req, res, next) {
      try {
         const {deviceId, basketId} = req.body;

         const basketDevice = await BasketDevice.create({basketId, deviceId, count: 1});
   
         return res.json(basketDevice);
      } catch(e) {
         next(ApiError.badRequest(e.message));
      }
   }

   async update(req, res, next) {
      try {
         // обновляем по id корзины и девайсу
         const {deviceId, basketId, count} = req.body;

         const device = await BasketDevice.findOne({where: {basketId, deviceId}});
   
         if (device) {
            const updateDevice = await BasketDevice.update({count: count}, {where: {basketId, deviceId}});
            return res.json({message: 'successfully'});
         } else {
            return next(ApiError.badRequest('Device not found'));
         }
      } catch (e) {
         next(ApiError.badRequest(e.message));
      }
   }

   async getAll(req, res, next) {
      try {
         const {basketId} = req.query;
         const basketDevices = await BasketDevice.findAll({where: {basketId}});

         return res.json(basketDevices);
      } catch (e) {
         next(ApiError.badRequest(e.message));
      }
   }

   async delete(req, res, next) {
      try {
         const {deviceId, basketId} = req.query;
         const basketDevices = await BasketDevice.destroy({where: {deviceId, basketId}});

         return res.json(basketDevices);
      } catch (e) {
         next(ApiError.badRequest(e.message));
      }
   }
}

module.exports = new BasketController();