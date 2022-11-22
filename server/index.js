require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middlewares/ErrorHandlingMiddleware');
const fileUpload = require('express-fileupload');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

app.use(errorHandler);

const start = async () => {
   try {
      await sequelize.authenticate(); // подключение к БД
      await sequelize.sync(); // сравниваем состояние схемы данных с БД

      app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
   } catch(e) {
      console.log(e);
   }
}

start();