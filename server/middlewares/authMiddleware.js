// декодируем токен и проверяем его на валидность
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
   if (req.method === "OPTIONS") {
      next();
   }

   try {
      const token = req.headers.authorization.split(' ')[1]; // bearer token
      if (!token) {
         return res.status(401).json({message: 'Не авторизован'});
      }

      // проверка токена на валидность
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      next(); // вызов следующего в цепочке мидлвара
   } catch(e) {
      res.status(401).json({message: 'Не авторизован'});
   }
}