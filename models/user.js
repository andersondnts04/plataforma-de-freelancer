const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  class User extends Model {
    validPassword(plainPassword) {
      return bcrypt.compareSync(plainPassword, this.password);
    }

    static associate(models) {
      User.hasMany(models.Freela, { foreignKey: 'userId', as: 'freelas' });
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
          tableName: 'users', 
    }
  );

  return User;
};
