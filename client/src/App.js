import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './login/Login.jsx';
import Register from './register/Register.jsx';
import Home from './Home.jsx';
import User from './User.jsx';
import Email from './Email.jsx';  // Import the Email component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/user' element={<User />} />
        <Route path='/email' element={<Email />} />  // Add the route for Email component
      </Routes>
    </BrowserRouter>
  );
}

export default App;
