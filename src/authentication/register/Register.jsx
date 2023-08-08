import logo from "../../assets/images/thefarmhouseclublogo2.png.crdownload.png"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { GoogleLogin } from '@react-oauth/google';
import { useEffect } from "react";

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [first_name, setFirstName] = useState("")
  const [username, setUserName] = useState("")
  const [last_name, setLastName] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [inputType, setInputType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    if(user){
        console.log(true)
        navigate("/")
    }
    if(!user){
        console.log(true)
        navigate("/register")
    }
  },[])

  const toggleInput = () => {
    setInputType(inputType === "password" ? "text" : "password");
    setShowPassword(!showPassword);
  };

  async function handleUserRegister(e){
    e.preventDefault()
    if(!email || !password || !username || !first_name || !last_name || !confirmPassword){
        setError("Please fill out all fields")
          setTimeout(() => {
              setError("")
          },5000)
          return
        }else if(password.length < 8){
          setError("Password must be at least 8 characters")
          setTimeout(() => {
              setError("")
          },5000)
          return
        }else if(password !== confirmPassword){
          setError("Please both password fields must match")
          setTimeout(() => {
              setError("")
          },5000)
          return
        }else {
            setLoading(true)
            console.log( JSON.stringify({email:email, password:password, username:username, first_name:first_name, last_name:last_name}))
            const response = await fetch("https://avda.pythonanywhere.com/api/v1/signup/", {
            method: "POST",
            body: JSON.stringify({email:email, password:password, username:username, first_name:first_name, last_name:last_name}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(response) setLoading(false)
        const data = await response.json()
        console.log(data)

        if(!response.ok){
            setError(data.detail)
            setTimeout(() => {
                setError("")
            },5000)
            return
            }

            if(response.ok) {
              setSuccess("Registeration was successful, a verification message has been sent to your email.")
            }
        }
  }

  function googleResponseMessage(response){
    let jwt = `${response.credential}`
    var tokens = jwt.split(".");
    const userDetails = JSON.parse(atob(tokens[1]))
    if(userDetails){
      handleSignUpFromGoogleResponse(userDetails)
    }
  }

  async function handleSignUpFromGoogleResponse(userDetails){
    console.log(userDetails)
    const {email, family_name, given_name, email_verified} = userDetails
    console.log(email, family_name, given_name, email_verified)
    setLoading(true)
    const response = await fetch("https://avda.pythonanywhere.com/api/v1/google-signup/", {
        method:"POST",
        body: JSON.stringify({email:email, first_name:given_name, last_name:family_name, username:"1", password:"1", provider:"1", email_verified:email_verified }),
        headers:{
            "Content-Type":"application/json"
        }
    })
    const data = await response.json()
    if(response) setLoading(false)
console.log(response)
    if(!response.ok){
      setError(data.detail)
      console.log(data)
      setTimeout(() => {
        setError("")
    },5000)
    }

    if(response.ok) {
      setSuccess("Registeration was successful, please use the button below to continue.")
        // localStorage.setItem("user", JSON.stringify(data))
        // navigate("/dashboard")
    }
  }

  return (
    <div className="flex items-center justify-center flex-col w-full register">
        {/* <p>back</p> */}
        <div className="bg-[#fff] w-[15%] fixed top-[7%] sm:w-[10%] md:w-[8%] lg:w-[6%] rounded-full p-3 cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="" className="w-full"/>
        </div>
        <form onSubmit={handleUserRegister} className="sign-in-form flex justify-center items-center bg-[#83B943] flex-col rounded-xl pb-7 ">
            <div className="header text-center text-white">
            <h1 className="text-[20px]">Welcome Back</h1>
            <p className="text-white my-1 text-sm">
                Already have an account? <Link to="/login" className="underline font-bold">Continue to login</Link>
            </p>
            </div>
            {/* <div className="continue-with-google flex justify-center items-center w-[80%] p-1 rounded cursor-pointer my-[1rem] gap-2">
            <i className="ri-google-fill"></i>
            <p className="text-sm">Continue with Google</p>
            </div> */}
            <GoogleLogin
            onSuccess={googleResponseMessage}
            onError={() => {
                console.log('Login Failed');
            }}
            />
            {/* {error && <p className="login-register-error mt-2">{error}</p>} */}

            {!error &&
              <div className="successModalBg">
                <div className="failureModal">
                  <i className="ri-close-circle-line"></i>
                  <p style={{ color:"black" }}>User not found or user account not active</p>
                  <p style={{ color:"black" }}>{error}</p>
                  {/* <button onClick={()=> navigate("/login")}>Continue to login</button> */}
                </div>
              </div>
              }
            
            <div className="center-line flex justify-center items-center">
            <div className="line1 flex justify-center items-center gap-2">
                <p className="or_line"></p>
                <p>or</p>
                <p className="or_line"></p>
            </div>
            </div>
            <div className="inputs w-[80%]">
            <div className="flex items-center mt-5">
                <label><i className="fa-solid fa-user text-xl text-white"></i></label>
                <input type="text" onChange={(e) => setUserName(e.target.value)} placeholder="Username" 
                className="w-full px-[10px] py-[7px] text-white bg-transparent mt-1 border-0 outline-none"/>
            </div>
            <div className="flex items-center mt-5">
                <label><i className="fa-solid fa-user text-xl text-white"></i></label>
                <input type="text" onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" 
                className="w-full px-[10px] py-[7px] text-white bg-transparent mt-1 border-0 outline-none"/>
            </div>
            <div className="flex items-center mt-5">
                <label><i className="fa-solid fa-user text-xl text-white"></i></label>
                <input type="text" onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" 
                className="w-full px-[10px] py-[7px] text-white bg-transparent mt-1 border-0 outline-none"/>
            </div>
            <div className="flex items-center mt-5">
                <label><i className="fa-solid fa-envelope text-xl text-white"></i></label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" 
                className="w-full px-[10px] py-[7px] text-white bg-transparent mt-1 border-0 outline-none"/>
            </div>
            <div className="flex items-center my-5">
                <label><i className="ri-lock-2-fill text-xl text-white"></i></label>
                <input
                type={inputType}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-[10px] py-[7px] text-white bg-transparent mt-1 border-0 outline-none"
                />
                {!showPassword ? (
                    <i className="fa-regular fa-eye cursor-pointer" onClick={toggleInput}></i>
                    ) : (
                    <i className="fa-regular fa-eye-slash cursor-pointer" onClick={toggleInput}></i>
                    )}
            </div>
            <div className="flex items-center my-5">
                <label><i className="ri-lock-2-fill text-xl text-white"></i></label>
                <input
                type={inputType}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full px-[10px] py-[7px] text-white bg-transparent mt-1 border-0 outline-none"
                />
                {!showPassword ? (
                    <i className="fa-regular fa-eye cursor-pointer" onClick={toggleInput}></i>
                    ) : (
                    <i className="fa-regular fa-eye-slash cursor-pointer" onClick={toggleInput}></i>
                    )}
            </div>
            </div>
            {loading ? <i className="fa-solid fa-gear fa-spin mb-4 text-lg"></i> : <input type="submit" value="Sign Up" className="bg-[#fff] w-[80%] mb-5 py-2 rounded-[6px] text-[#83B943] cursor-pointer"/>}
      </form>
      {success &&
      <div className="successModalBg">
        <div className="successModal">
          <i className="ri-checkbox-circle-line"></i>
           <p >{success}</p>
          <button onClick={()=> navigate("/login")}>Continue to login</button>
        </div>
      </div>
      }
    </div>
  )
}

export default Register