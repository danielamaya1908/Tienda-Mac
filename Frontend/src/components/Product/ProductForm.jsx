// ProductForm.jsx
import React, { useState } from 'react';
import ExcelUpload from './ExcelUpload';

const ProductForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    brand: '',
    color: '',
    subCategory: '',
    sizes: '',
    gender: '',
    price: '',
    discount: '',
    images: '',
    brand_id: '',
  });
  const [showExcelUpload, setShowExcelUpload] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      category: '',
      brand: '',
      color: '',
      subCategory: '',
      sizes: '',
      gender: '',
      price: '',
      discount: '',
      images: '',
      brand_id: '',
    });
  };

  const handleShowExcelUpload = () => {
    setShowExcelUpload(true);
  };

  const handleUploadExcel = (fileData) => {
    // Lógica para procesar archivo Excel
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Agregar Producto</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título:</label>
            <input type="text" id="title" name="title" className="form-control" value={formData.title} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descripción:</label>
            <textarea id="description" name="description" className="form-control" value={formData.description} onChange={handleChange}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Categoría:</label>
            <input type="text" id="category" name="category" className="form-control" value={formData.category} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="brand" className="form-label">Marca:</label>
            <input type="text" id="brand" name="brand" className="form-control" value={formData.brand} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="color" className="form-label">Color:</label>
            <input type="text" id="color" name="color" className="form-control" value={formData.color} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="subCategory" className="form-label">Subcategoría:</label>
            <input type="text" id="subCategory" name="subCategory" className="form-control" value={formData.subCategory} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="sizes" className="form-label">Tallas:</label>
            <input type="text" id="sizes" name="sizes" className="form-control" value={formData.sizes} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">Género:</label>
            <input type="text" id="gender" name="gender" className="form-control" value={formData.gender} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Precio:</label>
            <input type="number" id="price" name="price" className="form-control" value={formData.price} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="discount" className="form-label">Descuento:</label>
            <input type="number" id="discount" name="discount" className="form-control" value={formData.discount} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="images" className="form-label">Imágenes:</label>
            <input type="text" id="images" name="images" className="form-control" value={formData.images} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="brand_id" className="form-label">ID de Marca:</label>
            <input type="number" id="brand_id" name="brand_id" className="form-control" value={formData.brand_id} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Agregar Producto</button>
        </form>
        <button className="btn btn-secondary" onClick={handleShowExcelUpload}>Agregar Grupo de Productos por Excel</button>
        {showExcelUpload && <ExcelUpload onUpload={handleUploadExcel} />}
      </div>
    </div>
  );
};

export default ProductForm;
