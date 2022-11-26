const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo, Rating } = require('../models/models');
const ApiError = require('../error/ApiError');

class DeviceController {
   async create(req, res, next) {
      try {
         let {name, price, brandId, typeId, info} = req.body;
         const {img} = req.files;
         let fileName = uuid.v4() + '.jpg';
   
         // помещаем полученную фотографию в папку static
         img.mv(path.resolve(__dirname, '..', 'static', fileName));

         const device = await Device.create({name, price, brandId, typeId, img: fileName});

         if (info) {
            info = JSON.parse(info);
            info.forEach(i => 
               DeviceInfo.create({
                  title: i.title,
                  description: i.description,
                  deviceId: device.id
               })
            );
         }

         const rating = await Rating.create({rate: 0, deviceId: device.id});

         return res.json(device);
      } catch(e) {
         next(ApiError.badRequest(e.message));
      }
   }

   async getAll(req, res, next) {
      let {brandId, typeId, limit, page} = req.query;
      let devices;

      page = page || 1;
      limit = limit || 8;

      let offset = page * limit - limit;

      if (!brandId && !typeId) {
         devices = await Device.findAndCountAll({limit, offset});
      } else if (brandId && !typeId) {
         devices = await Device.findAndCountAll({where:{brandId}, limit, offset});
      } else if (!brandId && typeId) {
         devices = await Device.findAndCountAll({where:{typeId}, limit, offset});
      } else if (brandId && typeId) {
         devices = await Device.findAndCountAll({where:{brandId, typeId}, limit, offset});
      }

      return res.json(devices);
   }

   async getOne(req, res, next) {
      try {
         const {id} = req.params;
         const device = await Device.findOne(
            {
               where: {id},
               include: [{model: DeviceInfo, as: 'info'}]
            }
         );
   
         return res.json(device);
      } catch(e) {
         next(ApiError.badRequest(e.message));
      }
   }

   async deleteDevice(req,res, next) {
      try {
         const {id} = req.params;
         console.log(id)
         const device = await Device.destroy({
            where: {id}
         });
   
         return res.json(device);
      } catch (e) {
         next(ApiError.badRequest(e.message));
      }
   }

   async rating(req,res, next) {
      try {
         const {id, rate} = req.body;

         if (rate <= 10) {
            const device = await Device.update({rating: rate}, {where: {id}});
   
            return res.json(device);
         }

         return res.json('Максимальный рейтинг');
      } catch(e) {
         next(ApiError.badRequest(e.message));
      }
   }
}

module.exports = new DeviceController();