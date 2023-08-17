import './App.css'
import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
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
import Swap from './pages/swap/Swap';
import VerifyFundAccount from './pages/verifyFundAccount/VerifyFundAccount';

console.log("igboekwulusifranklin@gmail.com")

function App() {

  const [mode, setMode] = useState("lightMode")

  function changemode(){
    console.log(mode)
    if(mode === 'lightMode'){
      setMode('darkMode')
    }else{
      setMode('lightMode')
    }
    return mode
  }

useEffect(() => {
  // localStorage.clear()
},[])


  const baseUrl = "https://avda.pythonanywhere.com/api/v1"

  return (
    <HashRouter>
    <div className={mode}>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login baseUrl={baseUrl}/>} />
        <Route path='/register' element={<Register baseUrl={baseUrl}/>} />
        <Route path='/forgotpassword' element={<ForgotPassword baseUrl={baseUrl}/>} />
        <Route path='/dashboard' element={<Dashboard baseUrl={baseUrl} changemode={changemode} mode={mode}/>} />
        <Route path='/governance' element={<Governance baseUrl={baseUrl}/>} />
        <Route path='/verifyemail/:token/:uuid' element={<VerifyEmail baseUrl={baseUrl}/>} />
        <Route path='/myprofile/:id' element={<UserProfile baseUrl={baseUrl} changemode={changemode} mode={mode}/>} />
        <Route path='/markets' element={<Markets baseUrl={baseUrl}/>} />
        <Route path='/marketinfo/:id' element={<MarketInfo baseUrl={baseUrl}/>} />
        <Route path='/swap' element={<Swap baseUrl={baseUrl} changemode={changemode} mode={mode}/>} />
        <Route path='/resetpassword/:uuid/:token' element={<PasswordReset baseUrl={baseUrl}/>} />
        <Route path='/verifyfundaccount/:ref' element={<VerifyFundAccount baseUrl={baseUrl} changemode={changemode} mode={mode}/>} />
      </Routes>
    </div>
    </HashRouter>
  )
}

export default App
