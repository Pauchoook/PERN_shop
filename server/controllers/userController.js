const ApiError = require("../error/ApiError");
const { User, Basket } = require("../models/models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email, role) => {
   return jwt.sign(
      {id, email, role},
      process.env.SECRET_KEY,
      {expiresIn: '24h'}
   )
}

class UserController {
   async registration(req, res, next) {
      const {email, password, role} = req.body;
      if (!email || !password) {
         return next(ApiError.badRequest('Неккоректный email или пароль'));
      }

      // проверка, есть ли такой email в системе
      const candidate = await User.findOne({where: {email}});
      if (candidate) {
         return next(ApiError.badRequest('Пользователь с таким email уже существует'));
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({email, role, password: hashPassword});

      // при создании юзера сразу создаем для него корзину
      const basket = await Basket.create({userId: user.id});

      const token = generateJwt(user.id, user.email, user.role);

      return res.json({token});
   }

   async login(req, res, next) {
      const {email, password} = req.body;
      const candidate = await User.findOne({where: {email}});

      if (!candidate) {
         return next(ApiError.internal('Пользователь с таким email не найден'));
      }

      // сравнение пароля из запроса и зашифрованного пароля
      let comparePassword = bcrypt.compareSync(password, candidate.password);
      if (!comparePassword) {
         return next(ApiError.internal('Пароль неверный'));
      }

      const token = generateJwt(candidate.id, candidate.email, candidate.role);
      return res.json({token});
   }

   async check(req, res, next) {
      const token = generateJwt(req.user.id, req.user.email, req.user.role);
      return res.json({token});
   }
}

module.exports = new UserController();