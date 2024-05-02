const { Product, Category, Brand } = require("../../db");

const getProduct = async (req, res) => {
  try {
    const products = await Product.findAll({
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

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    const formattedProducts = products.map((product) => {
      const { id, itemId, name, description, price, priceUsd, quantity, image, guarantee, currency, tax, barcode, Category, Brand } = product;
      const { id: categoryId, name: categoryName } = Category;
      const { id: brandId, name: brandName } = Brand;

      return {
        id,
        itemId,
        name,
        description,
        price,
        priceUsd,
        quantity,
        image,
        guarantee,
        currency,
        tax,
        barcode,
        categoryId,
        categoryName,
        brandId,
        brandName,
      };
    });

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ message: "Error getting products" });
  }
};

module.exports = getProduct;