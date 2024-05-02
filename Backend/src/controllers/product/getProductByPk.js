const { Product, Category, Brand } = require("../../db");

const getProductByPk = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
        },
        {
          model: Brand,
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const formattedProduct = {
      id: product.id,
      itemId: product.itemId,
      name: product.name,
      description: product.description,
      price: product.price,
      priceUsd: product.priceUsd,
      quantity: product.quantity,
      image: product.image,
      guarantee: product.guarantee,
      currency: product.currency,
      tax: product.tax,
      barcode: product.barcode,
      categoryId: product.Category.id,
      categoryName: product.Category.name, // Aquí puedes eliminar categoryName si no lo necesitas
      brandId: product.Brand.id,
      brandName: product.Brand.name,
    };

    res.status(200).json(formattedProduct);
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ message: "Error getting product" });
  }
};

module.exports = getProductByPk;
