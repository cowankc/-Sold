module.export = function(sequelize, DataTypes) {
    let Review = sequelize. define("review", {
      name: {
        rating: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1, 5]
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
        Review.belongsTo(models.user.id, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Review
    }