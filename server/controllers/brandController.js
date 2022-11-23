const ApiError = require('../error/ApiError');
const {Brand} = require('../models/models');

class BrandController {
   async create(req, res) {
      const {name} = req.body;
      const brand = await Brand.create({name});

      return res.json(brand);
   }

   async getAll(req, res) {
      const brands = await Brand.findAll();

      return res.json(brands);
   }

   async deleteBrand(req, res, next) {
      try {
         const {name} = req.query;

         await Brand.destroy({
            where: {name}
         });

         return res.json('brand deleted');
      } catch (e) {
         next(ApiError.badRequest(e.message));
      }
   }
}

module.exports = new BrandController();