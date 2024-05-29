import React, { useState, useEffect } from 'react';
import styles from './Login.module.scss';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGIN_USER_MUTATION } from '../../apollo/auth/mutations';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | undefined>(undefined);
    const [gqlErrors, setGqlErrors] = useState<any[]>([]);

    const {user, login} = useAuth()

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, []);

    const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
        update(cache, { data: { loginUser: user } }) {
            login(user);
            navigate('/');
        },
        onError({ graphQLErrors }) {
            setGqlErrors(graphQLErrors as any);
        },
        variables: {
            loginInput: {
                email,
                password,
            },
        },
    });

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!password) {
            setError('Password is required');
            return;
        }
        if (!email) {
            setError('Email is required');
            return;
        }

        if (error) setError(undefined);
        loginUser();
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form className={styles.loginForm}>
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="form-error">{error}</div>}
                {gqlErrors && gqlErrors.length > 0 && (
                    <div className="form-error">
                        {gqlErrors.map((e, i) => (
                            <p key={i}>{e.message}</p>
                        ))}
                    </div>
                )}
                <button
                    type="submit"
                    value="Submit"
                    className="button-primary"
                    onClick={(e) => handleSubmit(e)}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
