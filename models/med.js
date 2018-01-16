module.exports = function(sequelize, DataTypes) {
    var Med = sequelize.define("Med", {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      usage: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      dosage: {
          type: DataTypes.STRING,
          allowNull: false,
          len: [1]
      }
    });
  
    Med.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Med.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Med;
  };