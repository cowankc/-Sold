module.exports = function(sequelize, DataTypes) {
    let Review = sequelize.define("review", {
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
        Review.belongsTo(models.user, {
            foreignKey: {
            allowNull: false
          }
        });
      };

      Review.associate = function(models) {
        Review.belongsTo(models.chef, {
            foreignKey: {
            allowNull: false
          }
        });
      };
    return Review
    }