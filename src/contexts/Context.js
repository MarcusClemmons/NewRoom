import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export default function ThemeContextProvider({children}){
    const [currentTheme, toggleTheme] = useState('light');

    function changeTheme(){
        if (currentTheme === 'light'){
            toggleTheme('dark');
        }else{
            toggleTheme('light');
        }
    }

    return (
        <ThemeContext.Provider value={{currentTheme, changeTheme}}>
        {children}
        </ThemeContext.Provider>
    )
}