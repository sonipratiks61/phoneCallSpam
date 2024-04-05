'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Assuming your User model is defined as 'User'
      models.Contact.hasMany(models.SpamReport, { foreignKey: 'id', as: 'spamReport' }); 
      Contact.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      });
    }
  }
  
  Contact.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // 'Users' is the table name
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name must not be empty" },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Phone number must not be empty" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true, // Assuming email is optional
      validate: {
        isEmail: { msg: "Must be a valid email address" },
      },
    },
  }, {
    sequelize,
    modelName: 'Contact',
    tableName: 'contacts',
  });

  return Contact;
};
