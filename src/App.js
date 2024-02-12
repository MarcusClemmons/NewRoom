import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './NavBar/Navbar';
import LeadingNews from './LeadStories/LeadingNews';
import Homepage from './Homepage';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import MyNewsStories from './Search/MyNewsStories';

import { GlobalProvider, useGlobalContext } from './contexts/GlobalContext'; // Make sure this path is correct

function AppWrapper() {
  return (
    <GlobalProvider>
      <App /> 
    </GlobalProvider>
  );
}

function App() {
  const { theme } = useGlobalContext();

  return (
    <div className={`App ${theme}-theme`}>
      <BrowserRouter>
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
  );
}

export default AppWrapper; // Export AppWrapper instead of App
