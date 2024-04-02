const XLSX = require('xlsx');
const fs = require('fs');
const { Product } = require('../../db'); // Asegúrate de que esta ruta sea correcta

const postExcel = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No se ha subido ningún archivo');
  }

  try {
    console.log('Leyendo archivo Excel...');
    const workbook = XLSX.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header:1, defval:"" });
    jsonData.shift(); // Remover títulos de columnas

    console.log(`Procesando datos de la hoja: ${sheetName}`);
    for (const [index, row] of jsonData.entries()) {
      console.log(`--- Producto ${index + 1} ---`);
      const [title, description, category, brand, color, subCategory, sizes, gender, price, discount, imageLink, brandId] = row;
      console.log({ title, description, category, brand, color, subCategory, sizes, gender, price, discount, imageLink, brandId });

      // Aquí debes validar que los datos están completos y son correctos antes de intentar guardarlos
      // Por ejemplo, si title no existe, deberías manejar este caso.

      const newProduct = new Product({
        title,
        description,
        category,
        brand,
        color,
        subCategory,
        sizes: sizes.split(",").map(size => size.trim()), // Asumiendo que 'sizes' es una cadena con tallas separadas por comas
        gender,
        price: parseFloat(price),
        discount: parseFloat(discount),
        images: imageLink.split(","),
        brandId: parseInt(brandId)
      });

      // Intenta guardar el producto, maneja errores específicos y generales
      try {
        await newProduct.save();
        console.log(`Producto ${index + 1} guardado correctamente.`);
      } catch (error) {
        console.error(`Error al guardar el producto ${index + 1}:`, error);
      }
    }

    fs.unlinkSync(file.path);
    console.log('Todos los productos han sido procesados y el archivo Excel se ha eliminado.');
    res.send('Productos del archivo Excel guardados en la base de datos');
  } catch (error) {
    console.error('Error al procesar el archivo Excel:', error);
    res.status(500).send('Error al procesar el archivo Excel');
  }
};

module.exports = postExcel;
 