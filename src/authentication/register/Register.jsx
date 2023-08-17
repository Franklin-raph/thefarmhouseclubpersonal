import logo from "../../assets/images/Asset-2.-300x47.png"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { GoogleLogin } from '@react-oauth/google';
import { useEffect } from "react";
import ErrorAlert from "../../components/alert/ErrorAlert";
import welcomeImage from "../../assets/images/c11d05415f5ff082abf5155fa6d98e1f.gif"

const Register = ({baseUrl}) => {
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
  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
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
          },10000)
          return
        }else if(!passwordRegEx.test(password)){
          setError("Password must be at least 8 characters, have at least one uppercase, have at least one lower case a special character and a number")
          setTimeout(() => {
              setError("")
          },10000)
          return
        }else if(password !== confirmPassword){
          setError("Please both password fields must match")
          setTimeout(() => {
              setError("")
          },10000)
          return
        }else {
            setLoading(true)
            console.log( JSON.stringify({email:email, password:password, username:username, first_name:first_name, last_name:last_name}))
            const response = await fetch(`${baseUrl}/signup/`, {
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
            },10000)
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
    const response = await fetch(`${baseUrl}/google-signup/`, {
        method:"POST",
        body: JSON.stringify({email:email, first_name:given_name, last_name:family_name, username:"1", password:"1", provider:"1", email_verified:email_verified }),
        headers:{
            "Content-Type":"application/json"
        }
    })
    const data = await response.json()
    if(response) setLoading(false)
    if(!response.ok){
      setError(data.detail)
      setTimeout(() => {
        setError("")
    },10000)
    }

    if(response.ok) {
      setSuccess("Registeration was successful, please use the button below to continue.")
        // localStorage.setItem("user", JSON.stringify(data))
        // navigate("/dashboard")
    }
  }

  return (
    <div className="px-[1rem] lg:px-[5rem] py-[5rem] register">
      <div className=" mb-[5rem] cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="" className=""/>
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between justify-center">
        <div className="w-[90%] md:w-[55%]">
          <h1 className="font-bold text-[27px] xl:text-[50px] text-[#006340]">Begin your AGRI Defi investment pathway</h1>
        </div>
        <form onSubmit={handleUserRegister} className="w-[95%] md:w-[50%] md:mt-[0] mt-[2rem] px-[1.5rem] py-5 md:px-[2.5rem]">
          <h1 className="text-[20px] text-[#B3B3B3] font-[700]">Create an account</h1>
          <div className="flex items-center mt-5" style={{ borderBottom:"1px solid #333" }}>
                <label><i className="fa-solid fa-envelope text-sm"></i></label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" 
                className="w-full px-[10px] py-[7px] bg-transparent mt-1 border-0 outline-none"/>
          </div>
          <div className="flex flex-col sm:flex-row gap-0 sm:gap-10">
            <div className="flex items-center mt-5" style={{ borderBottom:"1px solid #333" }}>
                <label><i className="fa-solid fa-user text-sm text-white"></i></label>
                <input type="text" onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" 
                className="w-full px-[10px] py-[7px] bg-transparent mt-1 border-0 outline-none"/>
            </div>
            <div className="flex items-center mt-5" style={{ borderBottom:"1px solid #333" }}>
                <label><i className="fa-solid fa-user text-sm text-white"></i></label>
                <input type="text" onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" 
                className="w-full px-[10px] py-[7px] bg-transparent mt-1 border-0 outline-none"/>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-0 sm:gap-10">
            <div className="flex items-center mt-5" style={{ borderBottom:"1px solid #333" }}>
                <label><i className="fa-solid fa-user text-sm"></i></label>
                <input type="text" onChange={(e) => setUserName(e.target.value)} placeholder="Username" 
                className="w-full px-[10px] py-[7px] text-black bg-transparent mt-1 border-0 outline-none"/>
            </div>
            <div className="flex items-center mt-5" style={{ borderBottom:"1px solid #333" }}>
                <label><i className="fa-solid fa-phone text-sm"></i></label>
                <input type="text" placeholder="+23480000000" 
                className="w-full px-[10px] py-[7px] text-black bg-transparent mt-1 border-0 outline-none"/>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-0 sm:gap-10">
            <div className="flex items-center my-5" style={{ borderBottom:"1px solid #333" }}>
                <label><i className="ri-lock-2-fill text-sm"></i></label>
                <input
                type={inputType}
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
            <div className="flex items-center my-5" style={{ borderBottom:"1px solid #333" }}>
                <label><i className="ri-lock-2-fill text-sm"></i></label>
                <input
                type={inputType}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full px-[10px] py-[7px] bg-transparent mt-1 border-0 outline-none"
                />
                {!showPassword ? (
                    <i className="fa-regular fa-eye cursor-pointer" onClick={toggleInput}></i>
                    ) : (
                    <i className="fa-regular fa-eye-slash cursor-pointer" onClick={toggleInput}></i>
                    )}
            </div>
          </div>
          {loading ? <button className="bg-[#83B943] w-full mt-5 py-2 rounded-[6px] text-lg text-center"><i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i></button> : <input type="submit" value="Sign Up" className="bg-[#83B943] w-full mt-5 py-2 rounded-[6px] text-[#fff] cursor-pointer"/>}
          <div className="flex justify-between items-center mt-2 mb-5" style={{ border:"none" }}>
            <p></p>
            <p className="text-sm">Already have an account? <Link to="/login" className="underline text-[#83B943]">Login</Link> </p>
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

      {success &&
      <div className="successModalBg">
        <div className="successModal relative">
          <i className="ri-close-fill absolute top-3 right-5 cursor-pointer" style={{ fontSize:"28px", color:"red" }} onClick={()=> setSuccess(false)}></i>
          <img src={welcomeImage} alt="" />
           <p>Registeration was successful, a verification message has been sent to your email.</p>
           {/* <p>{success}</p> */}
          <button onClick={()=> navigate("/login")} className="bg-[#1AC888]">Continue to login</button>
        </div>
      </div>
      }
    </div>
  )
}

export default Register