module.export = function(sequelize, DataTypes) {
    let Review = sequelize. define("review", {
      rating: {
        rating: DataTypes.INTEGER,
        allowNull: false,
        isNumeric: true,
        validate: {
          isIn: [[1, 2, 3, 4, 5]],
        }
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 1000]
        }
      },
      freezeTableName: true
    });
    Review.associate = function(models) {
        Review.belongsTo(models.chef.id, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    Review.associate = function(models) {
        Review.belongsTo(models.user, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Review
    }