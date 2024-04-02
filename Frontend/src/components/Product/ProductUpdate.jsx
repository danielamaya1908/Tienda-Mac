import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductUpdate = ({ productId, onClose }) => {
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    brand: '',
    color: '',
    category: '',
    subCategory: '',
    sizes: '',
    gender: '',
    price: '',
    discount: '',
    images: '',
    available: true,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/detail/${productId}`);
        if (response.data) {
          setProductData({
            title: response.data.title || '',
            description: response.data.description || '',
            brand: response.data.brand || '',
            color: Array.isArray(response.data.color) ? response.data.color.join(', ') : '',
            category: response.data.category || '',
            subCategory: response.data.subCategory || '',
            sizes: Array.isArray(response.data.sizes) ? response.data.sizes.join(', ') : '',
            gender: response.data.gender || '',
            price: response.data.price || '',
            discount: response.data.discount || '',
            images: Array.isArray(response.data.images) ? response.data.images.join(', ') : '',
            available: response.data.available !== undefined ? response.data.available : true,
          });
          console.log('Datos del producto cargados:', response.data); // Datos después de cargar
        } else {
          console.error('Error fetching product: No data');
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [productId]); // No necesitamos agregar productData aquí para evitar efectos secundarios

  const handleUpdateProduct = async () => {
    //e.preventDefault(); // Prevents the default form submit action
    const updatedProductData = {
      ...productData,
      sizes: productData.sizes.split(',').filter(size => size.trim() !== '').map(size => size.trim()),
      images: productData.images.split(',').filter(image => image.trim() !== '').map(image => image.trim()),
      available: productData.available, // Añadimos el campo 'available' con valor del estado actual
    };

    console.log('Datos del producto antes de actualizar:', updatedProductData); // Datos antes de actualizar

    try {
      const response = await axios.put(`http://localhost:3005/product/${productId}`, updatedProductData);
      console.log('Product updated successfully:', response.data);
      onClose();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input cambiado - name: ${name}, value: ${value}`); // Valor de input cuando cambia
    setProductData({ ...productData, [name]: value });
  };

  // Render the form with inputs for all productData fields
return (
    <div className="container">
      <h2>Editar Producto</h2>
      <form onSubmit={handleUpdateProduct}>
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Marca:
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
          />
        </label>
        <label>
          Color:
          <input
            type="text"
            name="color"
            value={productData.color}
            onChange={handleChange}
          />
        </label>
        <label>
          Categoría:
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
          />
        </label>
        <label>
          Subcategoría:
          <input
            type="text"
            name="subCategory"
            value={productData.subCategory}
            onChange={handleChange}
          />
        </label>
        <label>
          Tamaños:
          <input
            type="text"
            name="sizes"
            value={productData.sizes}
            onChange={handleChange}
          />
        </label>
        <label>
          Género:
          <input
            type="text"
            name="gender"
            value={productData.gender}
            onChange={handleChange}
          />
        </label>
        <label>
          Precio:
          <input
            type="text"
            name="price"
            value={productData.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Descuento:
          <input
            type="text"
            name="discount"
            value={productData.discount}
            onChange={handleChange}
          />
        </label>
        <label>
          Imágenes:
          <input
            type="text"
            name="images"
            value={productData.images}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Actualizar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default ProductUpdate;
