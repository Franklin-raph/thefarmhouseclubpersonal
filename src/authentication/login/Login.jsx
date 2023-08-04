import logo from "../../assets/images/thefarmhouseclublogo2.png.crdownload.png"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

const Login = () => {
    const [email, setEmail] = useState("nwaforglory680@gmail.com")
    const [password, setPassword] = useState("12345")
    const [inputType, setInputType] = useState("password");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const toggleInput = () => {
        setInputType(inputType === "password" ? "text" : "password");
        setShowPassword(!showPassword);
      };

      async function handleLogin(e){
        console.log(JSON.stringify({email:email, password:password}))
        e.preventDefault()
        if(!email || !password){
            setError("Please fill out all fields")
            setTimeout(() => {
                setError("")
            },5000)
            return
        }else {
            setLoading(true)
            const response = await fetch("https://avda.pythonanywhere.com/api/v1/login/", {
            method: "POST",
            body: JSON.stringify({email:email, password:password}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(response) setLoading(false)
        const data = await response.json()

        if(!response.ok){
            setError(data.detail)
            setTimeout(() => {
                setError("")
            },5000)
            return
            }

            if(response.ok) {
                navigate("/dashboard")
            }
        }
        
      }

  return (
    <div className="flex items-center justify-center flex-col w-full h-[100vh] login">
        {/* <p>back</p> */}
        <div className="bg-[#fff] w-[5%] fixed top-2 rounded-full p-3 cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="" className="w-full"/>
        </div>
        <form onSubmit={handleLogin} className="sign-in-form flex justify-center items-center bg-[#83B943] flex-col mt-[8rem] mb-[8rem] mx-[auto] py-[2.5rem] px-[1px] w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] rounded-xl">
            <div className="header text-center text-white">
            <h1 className="text-[28px]">Welcome Back</h1>
            <p className="text-white mt-3 text-sm">
                Don't have an account? <Link to="/register">Start for free</Link>
            </p>
            </div>
            <div className="continue-with-google flex justify-center items-center w-[80%] p-1 rounded cursor-pointer my-[1rem] gap-2">
            <i className="ri-google-fill"></i>
            <p className="text-sm">Continue with Google</p>
            </div>
            {error && <p className="login-register-error">{error}</p>}
            <div className="center-line flex justify-center items-center">
            <div className="line1 flex justify-center items-center gap-2">
                <p className="or_line"></p>
                <p>or</p>
                <p className="or_line"></p>
            </div>
            </div>
            <div className="inputs w-[80%]">
            <div className="flex items-center mt-5">
                <label><i class="fa-solid fa-envelope text-xl text-white"></i></label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" 
                className="w-full px-[10px] py-[7px] text-white bg-transparent mt-1 border-0 outline-none"/>
            </div>
            <div className="flex items-center my-[2.5rem]">
                <label><i class="ri-lock-2-fill text-xl text-white"></i></label>
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
            </div>
            {loading ? <i class="fa-solid fa-gear fa-spin mb-4 text-lg"></i> : <input type="submit" value="Login" className="bg-[#fff] w-[80%] mb-5 py-2 rounded-[6px] text-[#83B943] cursor-pointer"/>}
            
            <Link to="/forgotpassword" className="text-sm text-white">Forgot Password?</Link>
      </form>
    </div>
  )
}

export default Login