module.exports = function(sequelize, DataTypes) {
    let User_Review = sequelize.define("User_Review", {
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
    return User_Review
    }