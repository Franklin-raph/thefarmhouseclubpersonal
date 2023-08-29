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

console.log("igboekwulusifranklin@gmail.com")

function App() {

  const [mode, setMode] = useState("lightMode")
  const user = JSON.parse(localStorage.getItem("user"))

  function changemode(){
    console.log(mode)
    if(mode === 'lightMode'){
      setMode('darkMode')
    }else{
      setMode('lightMode')
    }
    return mode
  }
  
  const [showTwoFactorNotification, setShowTwoFactorNotification] = useState(false)

  useEffect(() => {
    setShowTwoFactorNotification(true)
    console.log(user)
    // localStorage.clear()
  },[])



  const baseUrl = "https://app1.thefarmhouseclub.io/api/v1"

  return (
    <HashRouter>
    <div className={mode}>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login baseUrl={baseUrl}/>} />
        <Route path='/register' element={<Register baseUrl={baseUrl}/>} />
        <Route path='/forgotpassword' element={<ForgotPassword baseUrl={baseUrl}/>} />
        <Route path='/verifyemail/:token/:uuid' element={<VerifyEmail baseUrl={baseUrl}/>} />
        <Route path='/resetpassword/:uuid/:token' element={<PasswordReset baseUrl={baseUrl}/>} />

        <Route path='/dashboard' element={<Dashboard baseUrl={baseUrl} changemode={changemode} mode={mode}/>} />
        <Route path='/governance' element={<Governance baseUrl={baseUrl} changemode={changemode} mode={mode}/>} />
        <Route path='/myprofile/:id' element={<UserProfile baseUrl={baseUrl} changemode={changemode} mode={mode}/>} />
        <Route path='/markets' element={<Markets baseUrl={baseUrl} changemode={changemode} mode={mode}/>} />
        <Route path='/marketinfo/:id' element={<MarketInfo baseUrl={baseUrl} changemode={changemode} mode={mode}/>} />
        <Route path='/swap' element={<Swap baseUrl={baseUrl} changemode={changemode} mode={mode}/>} />
      </Routes>

      {user && 
        <>
          {showTwoFactorNotification && 
            <div className='py-1 px-2 fixed showTwoFactorNotification'>
              <p>For Maximum security, please turn on 2 Factor Authentication</p>
              <i className='ri-close-fill cursor-pointer' onClick={(e) => setShowTwoFactorNotification(false)}></i>
            </div>
          }
        </>
      }
    </div>
    </HashRouter>
  )
}

export default App
