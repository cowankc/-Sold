module.export = function(sequelize, DataTypes) {
    let Meal = sequelize. define("meal", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 1
        }
      },
      ingredients: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 10 
        }
      },
      Price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      freezeTableName: true
    });

    Meal.associate = function(models) {
        Meal.belongsTo(models.chef, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Meal
    }