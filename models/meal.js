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
          min: 1 
        }
      },
      Price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        isNumeric: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 1 
        }
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 1 
        }
      },
      freezeTableName: true
    });

    Meal.associate = function(models) {
        Meal.belongsTo(models.chef.id, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Meal
    }