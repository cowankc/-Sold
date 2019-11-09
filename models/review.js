module.exports = function(sequelize, DataTypes) {
    let Review = sequelize.define("Review", {
      rating: {
        type: DataTypes.INTEGER,
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
    });
    Review.associate = function(models) {
        Review.belongsTo(models.User, {
            foreignKey: {
            allowNull: false
          }
        });
      };

      Review.associate = function(models) {
        Review.belongsTo(models.Chef, {
            foreignKey: {
            allowNull: false
          }
        });
      };
    return Review
    }