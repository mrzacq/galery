'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User)
    }
  };
  Post.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    photographer: DataTypes.STRING,
    categories: DataTypes.STRING,
    photo_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};