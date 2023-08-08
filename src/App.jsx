import './App.css'
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './landingPage/LandingPage'
import Login from './authentication/login/Login';
import Register from './authentication/register/Register';
import ForgotPassword from './authentication/forgotPassword/ForgotPassword';
import Dashboard from './pages/dashboard/Dashboard';
import VerifyEmail from './authentication/verifyEmail/VerifyEmail';
import LoggedInNav from './components/navbar/LoggedInNav';
import Navbar from './components/navbar/Navbar';

console.log("igboekwulusifranklin@gmail.com")

function App() {

  useEffect(() => {
  },[])
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgotpassword' element={<ForgotPassword />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/verifyemail/:token/:uuid' element={<VerifyEmail />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
