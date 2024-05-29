import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { useAuth } from '../../hooks/useAuth';

const NavBar = () => {
    const {user, logout} = useAuth();

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <Link to="/">Expenses app</Link>
            </div>
            <div className={styles.buttons}>
                {user ? (
                    <>
                        <Link to="/expenses">Expenses</Link>
                        <span onClick={() => logout()}>Logout</span>
                    </>
                ) : (
                    <>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default NavBar;
