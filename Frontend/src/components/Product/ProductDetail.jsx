import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductDetail.css'; // Importa el archivo de estilos CSS

const ProductDetail = ({ product }) => {
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    if (product) {
      setProductImages(product.images || []);
    }
  }, [product]);

  if (!product) {
    return <div className="product-detail-container">No se ha seleccionado ningún producto</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="row">
        <div className="col-md-4">
          <div className="image-container">
            {productImages.map((image, index) => (
              <img key={index} src={image} alt={`Product ${index + 1}`} />
            ))}
          </div>
        </div>
        <div className="col-md-8">
          <div className="details-container">
          <h2>{product.itemId}</h2>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Price (USD): ${product.priceUsd}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Guarantee: {product.guarantee}</p>
            <p>Currency: {product.currency}</p>
            <p>Tax: {product.tax}%</p>
            <p>Barcode: {product.barcode}</p>
            <p>Category ID: {product.categoryId}</p>
            <p>Brand ID: {product.brandId}</p>
            <p>Capacity ID: {product.capacityId}</p>
            <p>Color ID: {product.colorId}</p>
            <p>SubCategory ID: {product.subcategoryId}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
