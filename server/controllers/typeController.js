const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
   async create(req, res) {
      const {name} = req.body;
      const type = await Type.create({name});

      return res.json(type);
   }

   async getAll(req, res) {
      const types = await Type.findAll();

      return res.json(types);
   }

   async deleteType(req, res, next) {
      try {
         const {name} = req.query;

         await Type.destroy({
            where: {name}
         });
   
         return res.json('type deleted');
      } catch (e) {
         next(ApiError.badRequest(e.message));
      }  
   }
}

module.exports = new TypeController();