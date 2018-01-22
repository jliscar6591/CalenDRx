'use strict';

module.exports = function(sequelize, DataTypes) {
  var NewUser = sequelize.define('NewUser', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  return NewUser;
};

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    });

    User.associate = function(models) {
        User.hasMany(models.Med, {
          onDelete: "cascade"
        });
      };

    return User;
  };
  