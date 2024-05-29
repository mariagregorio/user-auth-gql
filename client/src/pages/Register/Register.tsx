import React, { useEffect, useState } from 'react';
import styles from './Register.module.scss';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { REGISTER_USER_MUTATION } from '../../apollo/auth/mutations';
import { useAuth } from '../../hooks/useAuth';

const Register = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [error, setError] = useState<string | undefined>(undefined);
    const [gqlErrors, setGqlErrors] = useState<any[]>([]);

    const {user, login} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, []);

    const [registerUser, { loading }] = useMutation(REGISTER_USER_MUTATION, {
        update(cache, { data: { registerUser: user } }) {
            login(user);
            navigate('/');
        },
        onError({ graphQLErrors }) {
            setGqlErrors(graphQLErrors as any);
        },
        variables: {
            registerInput: {
                username,
                email,
                password,
            },
        },
    });

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setError('Password confirm does not match');
            return;
        }
        if (!password || !passwordConfirm || !username || !email) {
            setError('All fields are required');
            return;
        }
        if (error) setError(undefined);

        registerUser();
    };

    return (
        <div className="container">
            <h1>Register</h1>
            <form className={styles.registerForm}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
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
                <div className="form-group">
                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input
                        type="password"
                        name="passwordConfirm"
                        id="passwordConfirm"
                        onChange={(e) => setPasswordConfirm(e.target.value)}
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
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
