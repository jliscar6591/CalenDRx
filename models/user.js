module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
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
        }),
        User.hasMany(models.Appt, {
          onDelete: "cascade"
        });
      };

    return User;
  };
  