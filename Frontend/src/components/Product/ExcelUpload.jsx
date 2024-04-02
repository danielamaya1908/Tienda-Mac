import React, { useState } from 'react';
import axios from 'axios';

const ExcelUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('excelFile', file);

      try {
        const response = await axios.post('http://localhost:3005/postExcel', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Response from server:', response.data);
      } catch (error) {
        console.error('Error uploading Excel file:', error);
      }
    }
  };

  return (
    <div>
      <h2>Agregar Grupo de Productos por Excel</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
        <button type="submit">Cargar Archivo Excel</button>
      </form>
    </div>
  );
};

export default ExcelUpload;
