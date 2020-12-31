'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helper/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post)
    }
  };
  User.init({
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isEmail: {args: true, msg: "Invalid format email"},
        notEmpty: {args: true, msg: "Email is required"},
        notNull: {args: true, msg: "Email is required"}
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {args: true, msg: "Password is required"},
        notNull: {args: true, msg: "Password is required"},
        len: {
          args: [4, 10],
          msg: "Password length minimum 4 character and maximum 10 character"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, option) => {
    instance.password = hashPassword(instance.password)
  })
  return User;
};