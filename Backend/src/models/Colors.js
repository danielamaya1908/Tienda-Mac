const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Colors = sequelize.define(
    "Colors",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',  // Asegúrate de que el nombre del modelo es el correcto
          key: 'id'
        }
      }
    });  
  return Colors;
};