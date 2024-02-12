import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [user, setUser] = useState(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        return userId && token ? { id: userId, token } : null;
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = "AIzaSyBQHCy8slb0-a4ryn7-qc8OwJNrco1tpac"; 

    const signup = async (email, password, name) => {
        setIsLoading(true);
        setError(null);
        const signupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
        try {
            const response = await fetch(signupUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, returnSecureToken: true }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error.message);
            }

            const userRecordUrl = `https://newroom-1a460-default-rtdb.firebaseio.com/users/${data.localId}.json?auth=${data.idToken}`;
            await fetch(userRecordUrl, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: name, email }),
            });

            setUser({ id: data.localId, token: data.idToken });
            // handle navigation in your component after calling signup
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, returnSecureToken: true }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error.message);
            }

            localStorage.setItem('userId', data.localId);
            localStorage.setItem('token', data.idToken);
            setUser({ id: data.localId, token: data.idToken });
            // handle navigation in your component after calling login
            alert("You are logged in")
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        setUser(null);
        // handle navigation in your component after calling logout
    };


    const changeTheme = async (newTheme) => {
        setTheme(newTheme);
      
        if (!user) return; // Ensure user is logged in
      
        const themeUrl = `https://newroom-1a460-default-rtdb.firebaseio.com/users/${user.id}/preferences/theme.json`;
        await fetch(themeUrl, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTheme),
        });
      
        // Optional: Update local state or context state if needed
      };
      

    const value = {
        user,
        isLoading,
        error,
        signup,
        login,
        logout,
        theme,
        changeTheme
    };

    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};
