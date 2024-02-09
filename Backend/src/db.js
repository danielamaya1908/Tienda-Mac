const { DB_URL } = require("../config");

const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(`${DB_URL}`, {
  dialectModule: require("pg"),
  logging: false,
  native: false,
});

const modelDefiners = [];
// leemos la carpeta models y hacemos push al array anterior solo los archivos con extensión '.js'
fs.readdirSync(path.join(__dirname, "/models"))
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// instanciamos cada modelo del array, pasándole sequelize como parámetro ya que no lo importamos en los modelos.
modelDefiners.forEach((model) => model(sequelize));
// convertimos en mayúscula la inicial de cada modelo
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const {
  User,
  Brand,
  Product,
  Order,
  Transaction,
  Image,
  Size,
  Stock,
  ShoppingCart,
  Purchase,
  Cart_Product,
  Reviews,
  Favorite,
  Storage
} = sequelize.models;

// RELACIÓN DE LAS TABLAS:

// creará una columna 'order_id' en la tabla Transaction con el id de una orden.
Order.hasMany(Transaction, {
  foreignKey: "order_id",
  sourceKey: "id",
});
Transaction.belongsTo(Order, {
  foreignKey: "order_id",
  targetKey: "id",
});

//relaciono la tabla size con la tabla stock
Size.belongsToMany(Product, { through: Stock });
Product.belongsToMany(Size, { through: Stock });

//relaciono la tabla Storage con la tabla stock
Storage.belongsToMany(Product, { through: Stock });
Product.belongsToMany(Storage, { through: Stock });

// tabla intermedia de las imágenes de cada producto.
Product.belongsToMany(Image, {
  through: "product_images",
  onDelete: "CASCADE",
});
Image.belongsToMany(Product, {
  through: "product_images",
  onDelete: "CASCADE",
});

// tabla intermedia de los productos favoritos de cada usuario.
User.belongsToMany(Product, { through: "user_like" });
Product.belongsToMany(User, { through: "user_like" });

// tabla intermedia de los comentarios que tiene cada producto.
User.belongsToMany(Product, {
  through: "Comment",
});
Product.belongsToMany(User, {
  through: "Comment",
  onDelete: "CASCADE", // si un producto es eliminado, los comentarios y puntuación asociada a ese producto también serán eliminados.
});

// tabla intermedia de los órdenes de cada usuario.
User.belongsToMany(Product, { through: "Order" });
Product.belongsToMany(User, { through: "Order" });

// tabla intermedia de las compras recibidas por cada usuario.
/* User.belongsToMany(Product, { through: "Purchase" });
Product.belongsToMany(User, { through: "Purchase" }); */

// tabla de relación entre el carrito de compras y el usuario (uno a uno)
User.hasOne(ShoppingCart, { foreignKey: "UserId", scope: { available: true, type: "member" } });
ShoppingCart.belongsTo(User, { foreignKey: "UserId" });

// tabla de relación entre el carrito de compras y el producto (muchos a muchos)
ShoppingCart.belongsToMany(Product, { through: Cart_Product });
Product.belongsToMany(ShoppingCart, { through: Cart_Product });

// tabla intermedia de las compras recibidas por cada usuario.
Stock.belongsTo(Product, { foreignKey: "ProductId" });
Stock.belongsTo(Size, { foreignKey: "SizeId" });

Stock.belongsTo(Product, { foreignKey: "ProductId" });
Stock.belongsTo(Storage, { foreignKey: "StorageId" });

const { Color, Gender } = sequelize.models;

// RELACIONES CON  Color y Gender:

// Relación entre Product y Color (muchos a muchos)
Product.belongsToMany(Color, { through: "ProductColor" });
Color.belongsToMany(Product, { through: "ProductColor" });

// Relación entre Product y Gender (muchos a muchos)
Product.belongsToMany(Gender, { through: "ProductGender" });
Gender.belongsToMany(Product, { through: "ProductGender" });

// Relación entre Purchase y User, crea una tabla intermedia que funciona como carrito (UserPurchaseCart_product)
User.belongsToMany(Purchase, { through: "User_purchaseCart" });
Purchase.belongsToMany(User, { through: "User_purchaseCart" });

Brand.hasMany(Product, {
  foreignKey: "brand_id",
  sourceKey: "id",
});
Product.belongsTo(Brand, {
  foreignKey: "brand_id",
  targetKey: "id",
});



// relación de reviews con users y products
Reviews.belongsTo(User);
User.hasMany(Reviews);
Reviews.belongsTo(Product);
Product.hasMany(Reviews);

module.exports = {
  sequelize,
  ...sequelize.models,
};
