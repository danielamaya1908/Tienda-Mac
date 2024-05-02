import React, { useState } from 'react';
import axios from 'axios';

const ExcelUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitProducts = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post('http://localhost:3005/postExcelProducts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Response from server (Products):', response.data);
      } catch (error) {
        console.error('Error uploading Excel file (Products):', error);
      }
    }
  };

  const handleSubmitImages = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post('http://localhost:3005/postExcelImages', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Response from server (Images):', response.data);
      } catch (error) {
        console.error('Error uploading Excel file (Images):', error);
      }
    }
  };

  return (
    <div>
      <h2>Agregar Grupo de Productos por Excel</h2>
      <form onSubmit={handleSubmitProducts}>
        <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
        <button type="submit">Cargar Archivo Excel (Productos)</button>
      </form>
      <br />
      <h2>Agregar Imágenes por Excel</h2>
      <form onSubmit={handleSubmitImages}>
        <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
        <button type="submit">Cargar Archivo Excel (Imágenes)</button>
      </form>
    </div>
  );
};

export default ExcelUpload;
