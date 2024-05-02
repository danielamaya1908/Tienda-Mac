const { Product, Stock, Image, Color, Capacities } = require("../../db");

const getProductAdmin = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Capacities, attributes: ["name"], through: { model: Stock } },
        { model: Image, attributes: ["url"], through: { attributes: [] } },
        { model: Color, attributes: ["name"], through: { attributes: [] } },
      ],
    });

    if (products.length === 0) {
      return res.status(404).json({ error: "Productos no encontrados" });
    }
    const modifiedProducts = products.map((product) => {
      // Crear un nuevo objeto para cada producto
      const modifiedProduct = { ...product.toJSON() };
      // Modificar el array de imágenes

      modifiedProduct.Images = modifiedProduct.Images.map((image) => image.url);
      // modifiedProduct.Capacitiess = modifiedProduct.Capacitiess.map((Capacities) => Capacities.name);

      // Verificar si existe la propiedad Color antes de mapear
      if (modifiedProduct.Colors) {
        modifiedProduct.Colors = modifiedProduct.Colors.map(({ name }) => name);
      }

      // Modificar el array de tallas y cantidades (stock)
      modifiedProduct.Stocks = modifiedProduct.Capacitiess.map((size) => ({
        [size.name]: size.Stock.quantity, // Acceder a la cantidad de stock desde la relación con Capacities
      }));

      // Eliminar la propiedad 'Capacities' si no es necesaria en este punto
      delete modifiedProduct.Capacities;

      return modifiedProduct;
    });
    return res.status(200).json({ modifiedProducts });
  } catch (error) {
    console.error("Error in getProductAdmin:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getProductAdmin;
