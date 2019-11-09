module.exports = function(sequelize, DataTypes) {
    let Chef = sequelize.define("Chef", {
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
      Chef.hasMany(models.Meal, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    Chef.associate = function(models) {
      Chef.hasMany(models.Review, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    return Chef
    }