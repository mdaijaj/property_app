import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "../App.css";

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ color: "white", backgroundColor: "black", fontSize: "18px" }}>
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        <img 
                            src="https://t4.ftcdn.net/jpg/08/67/19/83/240_F_867198363_1NAlTJWvlysaJDYQBnaV6wtZlRmhhHYU.jpg" 
                            style={{ borderRadius: "50%" }} 
                            width="75px" 
                            height="75px" 
                            className="d-inline-block align-top" 
                            alt="logo" 
                        />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            {user?.userInfo?.role === "admin" && (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/add_property">Add Property</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/all_users">User List</NavLink>
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/property_listing">Property List</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{ margin: 'auto' }}>
                            {!user ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="btn btn-dark mx-2" to="/signup" role="button">Signup</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="btn btn-dark mx-2" to="/login" role="button">Login</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item" style={{ marginLeft: "600px", marginRight: "20px" }}>
                                        <span className="navbar-text text-white me-3">
                                            Welcome : {user.userInfo?.first_name}
                                        </span>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={handleLogout} className="btn btn-dark">Logout</button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
