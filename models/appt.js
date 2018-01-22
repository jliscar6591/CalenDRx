module.exports = function(sequelize, DataTypes) {
    var Appt = sequelize.define("Appt", {
      appttype: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      appttime: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    });
  
    Appt.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Appt.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Appt;
  };