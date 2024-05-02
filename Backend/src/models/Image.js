const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Image = sequelize.define("Image", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Products",
        key: "id",
      },
    },
  });

  console.log("Image model defined");
  return Image;
};