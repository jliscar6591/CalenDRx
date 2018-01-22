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
      Appt.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Appt;
  };