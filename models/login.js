module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [7]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [7]
      }
    });

    User.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Author.hasMany(models.Med, {
          onDelete: "cascade"
        });
      };

    return User;
  };
  