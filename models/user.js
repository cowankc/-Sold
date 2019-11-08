module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define("user", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1 
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 6 
      }
    },
  });
      User.associate = function(models) {
        User.belongsToMany(models.chef, {
            through: 'User_Review'
        });
      };
    return User
    }