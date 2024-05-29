import React, { useReducer, createContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const initialState: any = {
    user: null,
};

const token = localStorage.getItem('token');

if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken?.exp && decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
    } else {
        initialState.user = decodedToken;
    }
}

interface Auth {
    user: User | null;
    login: (user: any) => void;
    logout: () => void;
}

export interface User {
    email: string;
    username: string;
    token: string;
}

interface Action {
    type: 'LOGOUT' | 'LOGIN';
    payload?: User;
}

const authReducer = (state: any, action: Action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

const initialAuthState: Auth = {
    user: null,
    login: () => {},
    logout: () => {}
}

const AuthContext = createContext<Auth>(initialAuthState);

const AuthProvider = (props: any) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (user: User) => {
        console.log('login user', user);
        localStorage.setItem('token', user.token);
        dispatch({
            type: 'LOGIN',
            payload: user,
        });
    };

    const logout = () => {
        console.log('logout');
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
    };

    return <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />;
};

export { AuthContext, AuthProvider };