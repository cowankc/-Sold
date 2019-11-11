module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    Photo: {
      type: DataTypes.STRING,
      allowNull: true,
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
    chef: {
      type: DataTypes.BOOLEAN,
      default: 0,
      allowNull: false,
    },
    chefRating: {
      type: DataTypes.INTEGER,
      default: 0 
    }
  });
    User.associate = function(models) {
      User.hasMany(models.User_Review, {
        onDelete: "cascade"
      });
    };
    User.associate = function(models) {
      User.hasMany(models.Meal, {
        onDelete: "cascade"
      });
    };
    return User
    }