import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import NavBar from './components/NavBar/NavBar';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Expenses from './pages/Expenses/Expenses';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Homepage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/expenses"
                    element={
                        <ProtectedRoute>
                            <Expenses />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
