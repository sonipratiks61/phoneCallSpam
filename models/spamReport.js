"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class SpamReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.SpamReport.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user"
      });
    }
  }

  SpamReport.init(
    {
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Phone number must not be empty" }
        }
      },
      reportsCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          isInt: { msg: "Reports count must be an integer" },
          min: 1
        }
      }
    },
    {
      sequelize,
      modelName: "SpamReport",
      tableName: "spamReports"
      // timestamps: false, // Assuming you don't need createdAt or updatedAt for this model
    }
  );

  return SpamReport;
};
