import React  from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './NavBar/Navbar';
import LeadingNews from './LeadStories/LeadingNews'
import Homepage from './Homepage';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import MyNewsStories from './Search/MyNewsStories';
import ThemeContextProvider from './contexts/Context';

import { GlobalProvider } from './contexts/GlobalContext'; // Import GlobalProvider
import AuthRedirect from './AuthRedirect';


function App() {
  

  return (
    <>
    <ThemeContextProvider>
    <GlobalProvider> {/* Wrap your components with GlobalProvider */}
      
    <div className="App" >
        <BrowserRouter>
        <AuthRedirect />
        
        <Navbar />
       
        <Routes>
          
            <Route path='/' element={<Homepage title="World Wide News Front" message="Welcome To Your Only Needed Gobal News Source" Anchor="With News Anchor Marcus Clemmons"/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/Dashboard' element={<Dashboard/>} />
            <Route path='/news' element={<LeadingNews/>} />
            <Route path='/Search' element={<MyNewsStories/>} />

          
            </Routes>
           
        </BrowserRouter>
      </div>
      
    </GlobalProvider>
    </ThemeContextProvider>
    </>
  );
}

export default App;
