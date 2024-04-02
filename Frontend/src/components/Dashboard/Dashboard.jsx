import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faShoppingBasket, faTicketAlt, faTrademark } from "@fortawesome/free-solid-svg-icons";


const Dashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar">
                    <div className="position-sticky">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <NavLink to="/product" className="nav-link text-white">
                                    <FontAwesomeIcon icon={faShoppingBasket} className="me-2" />
                                    Productos
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/categories" className="nav-link text-white">
                                    <FontAwesomeIcon icon={faTicketAlt} className="me-2" />
                                    Categorías
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/brands" className="nav-link text-white">
                                    <FontAwesomeIcon icon={faTrademark} className="me-2" />
                                    Marcas
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/users" className="nav-link text-white">
                                    <FontAwesomeIcon icon={faUsers} className="me-2" />
                                    Usuarios
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/orders" className="nav-link text-white">
                                    <FontAwesomeIcon icon={faShoppingBasket} className="me-2" />
                                    Órdenes
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/coupons" className="nav-link text-white">
                                    <FontAwesomeIcon icon={faTicketAlt} className="me-2" />
                                    Cupones
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                {/* Contenido del dashboard */}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
export default Dashboard;
