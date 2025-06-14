const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Freela extends Model {
    static associate(models) {
      Freela.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  Freela.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    description: DataTypes.STRING,
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Freela',
    tableName: 'freelas',
  });

  return Freela;
};
