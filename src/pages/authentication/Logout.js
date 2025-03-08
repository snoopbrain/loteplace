import React, { useState, useContext } from 'react';
import './Logout.css';
import { login } from '../../services/authenticationService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';


const Logout = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('user'); 
        setUser(null);                   
        navigate('/');                   
    };



    return (
        <div className="logout-container">
            <h2>¿Estás seguro de que deseas cerrar sesión?</h2>
            <button className="logout-button" onClick={handleLogout}>
                Cerrar Sesión
            </button>
        </div>
    );
}

export default Logout;