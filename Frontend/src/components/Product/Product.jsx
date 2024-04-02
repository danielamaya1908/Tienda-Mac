import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from '../Dashboard/Dashboard'; // Asegúrate de importar el componente Dashboard
import ProductForm from '../Product/ProductForm';
import ProductUpdate from '../Product/ProductUpdate';

const Product = () => {
    const [showProductForm, setShowProductForm] = useState(false);
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        title: '',
        description: '',
        price: 0,
        discount: 0,
    });
    const [editProductId, setEditProductId] = useState(null); // Nuevo estado para almacenar el ID del producto a editar

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3005/product');
            if (response.data && Array.isArray(response.data.data)) {
                setProducts(response.data.data);
            } else {
                console.error('Error fetching products: response data is not an array');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddProduct = async (productData) => {
        try {
            await axios.post('http://localhost:3005/product', productData);
            fetchProducts(); // Refetch products after adding a new one
            setShowProductForm(false);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleEditProduct = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:3005/detail/${productId}`);
            const productData = response.data; // Suponiendo que los datos del producto están en la propiedad 'data' de la respuesta
            setNewProduct(productData); // Establecer los datos del producto en el estado para el formulario de edición
            setEditProductId(productId); // Establecer el ID del producto a editar
        } catch (error) {
            console.error('Error al editar el producto:', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:3005/product/${productId}`);
            fetchProducts(); // Refetch products after deletion
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <>
            <Dashboard />
            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar">
                        <div className="position-sticky">
                            <ul className="nav flex-column">
                                {/* Este botón no debería estar aquí */}
                            </ul>
                        </div>
                    </nav>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2 mt-0">Productos</h1>

                            {/* Botón para agregar producto */}
                            <button className="btn btn-primary" onClick={() => setShowProductForm(!showProductForm)}>
                                {showProductForm ? 'Cerrar Formulario' : 'Agregar Producto'}
                            </button>
                        </div>
                        {showProductForm && <ProductForm onSubmit={handleAddProduct} onClose={() => setShowProductForm(false)} />}
                        {editProductId && <ProductUpdate productId={editProductId} onClose={() => setEditProductId(null)} />} {/* Mostrar ProductUpdate si hay un ID de producto para editar */}
                        <h2>Lista de Productos</h2>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Descripción</th>
                                        <th>Marca</th>
                                        <th>Color</th>
                                        <th>Categoría</th>
                                        <th>Subcategoría</th>
                                        <th>Tallas</th>
                                        <th>Género</th>
                                        <th>Imágenes</th>
                                        <th>Precio</th>
                                        <th>Descuento</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(products) && products.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.title}</td>
                                            <td>{product.description}</td>
                                            <td>{product.brand}</td>
                                            <td>{product.color}</td>
                                            <td>{product.category}</td>
                                            <td>{product.subCategory}</td>
                                            <td>{product.sizes}</td>
                                            <td>{product.gender}</td>
                                            <td>{product.images}</td>
                                            <td>{product.price}</td>
                                            <td>{product.discount}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={() => handleEditProduct(product.id)}>Editar</button>
                                                <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Product;
