import './App.css'
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './landingPage/LandingPage'
import Login from './authentication/login/Login';
import Register from './authentication/register/Register';
import ForgotPassword from './authentication/forgotPassword/ForgotPassword';
import Dashboard from './pages/dashboard/Dashboard';
import VerifyEmail from './authentication/verifyEmail/VerifyEmail';
import Markets from './pages/markets/Markets';
import Governance from './pages/governance/Governance';
import UserProfile from './pages/userprofile/UserProfile';
import MarketInfo from './pages/marketInfo/MarketInfo';
import PasswordReset from './authentication/passwordReset/PasswordReset';

console.log("igboekwulusifranklin@gmail.com")

function App() {
useEffect(() => {
  // localStorage.clear()
},[])


  const baseUrl = "https://avda.pythonanywhere.com/api/v1"

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<Login baseUrl={baseUrl}/>} />
      <Route path='/register' element={<Register baseUrl={baseUrl}/>} />
      <Route path='/forgotpassword' element={<ForgotPassword baseUrl={baseUrl}/>} />
      <Route path='/dashboard' element={<Dashboard baseUrl={baseUrl}/>} />
      <Route path='/governance' element={<Governance baseUrl={baseUrl}/>} />
      <Route path='/verifyemail/:token/:uuid' element={<VerifyEmail baseUrl={baseUrl}/>} />
      <Route path='/myprofile/:id' element={<UserProfile baseUrl={baseUrl}/>} />
      <Route path='/markets' element={<Markets baseUrl={baseUrl}/>} />
      <Route path='/marketinfo/:id' element={<MarketInfo baseUrl={baseUrl}/>} />
      <Route path='/resetpassword/:uuid/:token' element={<PasswordReset baseUrl={baseUrl}/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
