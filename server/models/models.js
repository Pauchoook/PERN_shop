const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   email: {type: DataTypes.STRING, unique: true},
   password: {type: DataTypes.STRING},
   role: {type: DataTypes.STRING, defaultValue: "USER"}
});

const Basket = sequelize.define('basket', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const BasketDevice = sequelize.define('basket_devices', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   count: { type: DataTypes.INTEGER }
});

const Device = sequelize.define('device', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   name: {type: DataTypes.STRING, unique: true, allowNull: false},
   price: {type: DataTypes.INTEGER, allowNull: false},
   rating: {type: DataTypes.INTEGER, defaultValue: 0},
   img: {type: DataTypes.STRING, allowNull: false}
});

const Type = sequelize.define('type', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const Brand = sequelize.define('brand', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const DeviceInfo = sequelize.define('device_info', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   title: {type: DataTypes.STRING, allowNull: false},
   description: {type: DataTypes.STRING, allowNull: false}
});

const TypeBrand = sequelize.define('type_brand', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

// описываем, как модели связаны друг с другом

User.hasOne(Basket); // один к одному
Basket.belongsTo(User); // принадлежит User

Basket.hasMany(BasketDevice); // один ко многим
BasketDevice.belongsTo(Basket); 

Type.hasMany(Device); // один ко многим
Device.belongsTo(Type); 

Brand.hasMany(Device); // один ко многим
Device.belongsTo(Brand); 

Device.hasMany(BasketDevice); // один ко многим
BasketDevice.belongsTo(Device); 

Device.hasMany(DeviceInfo, {as: 'info'}); // один ко многим
DeviceInfo.belongsTo(Device); 

Type.belongsToMany(Brand, {through: TypeBrand}); // многие ко многим
Brand.belongsToMany(Type, {through: TypeBrand}); // многие ко многим

module.exports = {
   User,
   Basket,
   BasketDevice,
   Device,
   Type,
   Brand,
   TypeBrand,
   DeviceInfo
}