import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState('products');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // Simulación de datos de productos, usuarios, categorías, órdenes, cupones
  const products = [
    { id: 1, name: 'Producto 1', description: 'Descripción del producto 1', price: 10.99 },
    { id: 2, name: 'Producto 2', description: 'Descripción del producto 2', price: 15.99 },
    { id: 3, name: 'Producto 3', description: 'Descripción del producto 3', price: 20.99 },
  ];

  const users = [
    { id: 1, name: 'Usuario 1', email: 'usuario1@example.com' },
    { id: 2, name: 'Usuario 2', email: 'usuario2@example.com' },
    { id: 3, name: 'Usuario 3', email: 'usuario3@example.com' },
  ];

  const categories = [
    { id: 1, name: 'Categoría 1' },
    { id: 2, name: 'Categoría 2' },
    { id: 3, name: 'Categoría 3' },
  ];

  const orders = [
    { id: 1, customer: 'Cliente 1', total: 100.99, status: 'Pendiente' },
    { id: 2, customer: 'Cliente 2', total: 75.99, status: 'Enviado' },
    { id: 3, customer: 'Cliente 3', total: 50.99, status: 'Entregado' },
  ];

  const coupons = [
    { id: 1, code: 'DESCUENTO10', discount: 10 },
    { id: 2, code: 'DESCUENTO20', discount: 20 },
    { id: 3, code: 'DESCUENTO30', discount: 30 },
  ];

  const locations = [
    { id: 1, name: 'Tienda Principal', address: '123 Calle Principal', city: 'Ciudad Principal' },
    { id: 2, name: 'Tienda Secundaria', address: '456 Calle Secundaria', city: 'Ciudad Secundaria' },
    { id: 3, name: 'Tienda Online', address: '', city: '' },
  ];

  const handleShowModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType(null);
    setSelectedItem(null);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Administración</h3>
        </div>
        <ul className="sidebar-menu">
          <li
            className={selectedOption === 'products' ? 'active' : ''}
            onClick={() => setSelectedOption('products')}
          >
            <i className="bi bi-box-seam"></i> Productos
          </li>
          <li
            className={selectedOption === 'users' ? 'active' : ''}
            onClick={() => setSelectedOption('users')}
          >
            <i className="bi bi-people"></i> Usuarios
          </li>
          <li
            className={selectedOption === 'categories' ? 'active' : ''}
            onClick={() => setSelectedOption('categories')}
          >
            <i className="bi bi-tags"></i> Categorías
          </li>
          <li
            className={selectedOption === 'orders' ? 'active' : ''}
            onClick={() => setSelectedOption('orders')}
          >
            <i className="bi bi-bag"></i> Órdenes
          </li>
          <li
            className={selectedOption === 'coupons' ? 'active' : ''}
            onClick={() => setSelectedOption('coupons')}
          >
            <i className="bi bi-ticket-perforated"></i> Cupones
          </li>
        </ul>
      </div>
      <div className="main-content">
        {selectedOption === 'products' && (
          <div>
            <div className="content-header">
              <h2>Productos</h2>
              <button className="btn btn-primary" onClick={() => handleShowModal('addProduct')}>
                <i className="bi bi-plus-circle"></i> Agregar Producto
              </button>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleShowModal('editProduct', product)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm btn-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {selectedOption === 'users' && (
          <div>
            <div className="content-header">
              <h2>Usuarios</h2>
              <button className="btn btn-primary" onClick={() => handleShowModal('addUser')}>
                <i className="bi bi-plus-circle"></i> Agregar Usuario
              </button>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo Electrónico</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleShowModal('editUser', user)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm btn-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {selectedOption === 'categories' && (
          <div>
            <div className="content-header">
              <h2>Categorías</h2>
              <button className="btn btn-primary" onClick={() => handleShowModal('addCategory')}>
                <i className="bi bi-plus-circle"></i> Agregar Categoría
              </button>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleShowModal('editCategory', category)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm btn-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {selectedOption === 'orders' && (
          <div>
            <div className="content-header">
              <h2>Órdenes</h2>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.customer}</td>
                    <td>${order.total}</td>
                    <td>{order.status}</td>
                    <td>
                      <button className="btn btn-sm btn-primary me-2">
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-secondary">
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {selectedOption === 'coupons' && (
          <div>
            <div className="content-header">
              <h2>Cupones</h2>
              <button className="btn btn-primary" onClick={() => handleShowModal('addCoupon')}>
                <i className="bi bi-plus-circle"></i> Agregar Cupón
              </button>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Descuento</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.id}>
                    <td>{coupon.code}</td>
                    <td>{coupon.discount}%</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleShowModal('editCoupon', coupon)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm btn-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modales */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {modalType === 'addProduct' && 'Agregar Producto'}
                {modalType === 'editProduct' && 'Editar Producto'}
                {modalType === 'addUser' && 'Agregar Usuario'}
                {modalType === 'editUser' && 'Editar Usuario'}
                {modalType === 'addCategory' && 'Agregar Categoría'}
                {modalType === 'editCategory' && 'Editar Categoría'}
                {modalType === 'addCoupon' && 'Agregar Cupón'}
                {modalType === 'editCoupon' && 'Editar Cupón'}
              </h5>
              <button className="btn-close" onClick={handleCloseModal}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="modal-body">
              {/* Aquí iría el formulario correspondiente */}
              <p>Aquí se mostrarán los campos del formulario según el tipo de modal.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;