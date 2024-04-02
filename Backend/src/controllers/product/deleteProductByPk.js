const deleteProductHandler = require("../../handlers/Product/deleteProductByPk");

const deleteProductController = async (req, res) => {
  try {
    await deleteProductHandler(req.params.id);
    return res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return res.status(500).json({ error: "Ocurrió un error en el servidor" });
  }
};

module.exports = deleteProductController;
