import logo from "../../assets/images/Asset-2.-300x47.png"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { GoogleLogin } from '@react-oauth/google';
import { useEffect } from "react";
import ErrorAlert from "../../components/alert/ErrorAlert";
import SuccessAlert from "../../components/alert/SuccessAlert";
import VerificationModal from "../../components/verificationModal/VerificationModal";

const Login = ({baseUrl}) => {
    const [email, setEmail] = useState("igboekwulusifranklin@gmail.com")
    const [password, setPassword] = useState("1234567890")
    const [inputType, setInputType] = useState("password");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)

    useEffect(() => {
        



        











        if(user){
            console.log(true)
            navigate("/")
        }
        if(!user){
            console.log(true)
            navigate("/login")
        }
    },[])

    const toggleInput = () => {
        setInputType(inputType === "password" ? "text" : "password");
        setShowPassword(!showPassword);
      };

      async function handleLogin(e){
        e.preventDefault()
        if(!email || !password){
            setError("Please fill out all fields")
            setTimeout(() => {
                setError("")
            },10000)
            return
        }else {
            setLoading(true)
            const response = await fetch(`${baseUrl}/login/`, {
            method: "POST",
            body: JSON.stringify({email:email, password:password}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(response) setLoading(false)
        const data = await response.json()
        console.log(response, data)

        if(!response.ok){
            setError(data.detail)
            setTimeout(() => {
                setError("")
            },10000)
            return
            }

            if(response.status === 200) {
                console.log(data)
                localStorage.setItem("user", JSON.stringify(data))
                navigate("/dashboard")
            }
            
            if(response.status === 202){
                console.log(data)
                setSuccess(data.detail)
                localStorage.setItem("_2fa", JSON.stringify({email, password}))
            }
        }
      }

      function googleResponseMessage(response){
        let jwt = `${response.credential}`
        var tokens = jwt.split(".");
        const userDetails = JSON.parse(atob(tokens[1]))
        console.log(userDetails)
        if(userDetails){
            handleLoginFromGoogleResponse(userDetails.email)
        }
      }

      async function handleLoginFromGoogleResponse(email){
        setLoading(true)
        const response = await fetch(`${baseUrl}/google-login/`, {
            method:"POST",
            body: JSON.stringify({email:email}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await response.json()
        console.log(response)
        if(response) setLoading(false)

        if(response.status === 200) {
            console.log(data)
            localStorage.setItem("user", JSON.stringify(data))
            navigate("/dashboard")
        }
        
        if(response.status === 202){
            console.log(data)
            setSuccess(true)
            localStorage.setItem("_2fa", JSON.stringify({email, password}))
        }

        if(!response.ok){
            setError(data.detail)
        }
      }

      function errorMessage(){}

  return (
    <div className="px-[1rem] lg:px-[5rem] py-[5rem] register">
      <div className=" mb-[5rem] cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="" className=""/>
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between justify-center">
        <div className="w-[90%] md:w-[55%]">
          <h1 className="font-bold text-[27px] xl:text-[50px] text-[#006340]">Jump right back in</h1>
          <p  className="font-bold text-[19px] xl:text-[25px] text-[#B3B3B3]">Sign in to continue</p>
        </div>
        <form onSubmit={handleLogin} className="w-[95%] md:w-[50%] md:mt-[0] mt-[2rem] px-[1.5rem] py-5 md:px-[2.5rem]">
          <h1 className="text-[20px] text-[#B3B3B3] font-[700]">Sign in to continue</h1>
          <div className="flex items-center mt-5" style={{ borderBottom:"1px solid #333" }}>
                <label><i className="fa-solid fa-envelope text-sm"></i></label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" 
                className="w-full px-[10px] py-[7px] bg-transparent mt-1 border-0 outline-none"/>
          </div>
            <div className="flex items-center my-5" style={{ borderBottom:"1px solid #000" }}>
                <label><i className="ri-lock-2-fill text-sm"></i></label>
                <input
                type={inputType}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-[10px] py-[7px] bg-transparent mt-1 border-0 outline-none"
                />
                {!showPassword ? (
                    <i className="fa-regular fa-eye cursor-pointer" onClick={toggleInput}></i>
                    ) : (
                    <i className="fa-regular fa-eye-slash cursor-pointer" onClick={toggleInput}></i>
                    )}
          </div>
          {loading ? <button className="bg-[#83B943] w-full mt-5 py-2 rounded-[6px] text-lg text-center"><i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i></button> : <input type="submit" value="Sign In" className="bg-[#83B943] w-full mt-5 py-2 rounded-[6px] text-[#fff] cursor-pointer"/>}
          
          <div className="flex mt-2 mb-8 items-center justify-between" style={{ borderBottom:"none" }}>
            <Link to="/forgotpassword" className="text-sm text-[#83B943]">Forgot Password?</Link>
            <p className="text-sm">Need an account? <Link to="/register" className="text-sm text-[#83B943]">Sign Up</Link> </p>
            
          </div>
          <div className="flex justify-center">
            <GoogleLogin
                onSuccess={googleResponseMessage}
                onError={() => {
                    console.log('Login Failed');
                }}
                />
            </div>
        </form>
        <a href="https://wa.me/+2347056514643" target="_blank" className="whatsapp fixed bottom-2 right-2 bg-green-500 py-2 px-3 rounded-full text-white text-sm">
          <div className="flex items-center gap-4">
            <i class="ri-whatsapp-line text-2xl"></i>
          </div>
        </a>
      </div>

      {error && <ErrorAlert error={error} setError={setError}/>}
      {/* {success && <SuccessAlert success={success} setSuccess={setSuccess}/>} */}

      {success && <VerificationModal email={email} password={password} setSuccess={setSuccess} baseUrl={baseUrl} setError={setError}/>}

      
      
    </div>
  )
}

export default Login