module.exports = function(sequelize, DataTypes) {
    let Chef = sequelize.define("chef", {
      chefName: {
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
      }
    });
    Chef.associate = function(models) {
      Chef.hasMany(models.meal, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    Chef.associate = function(models) {
      Chef.belongsToMany(models.user, {
        through: 'User_Review'
      });
    };
    return Chef
    }