import logo from "../../assets/images/thefarmhouseclublogo2.png.crdownload.png"
import { Link } from "react-router-dom"
import { useState } from "react"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [inputType, setInputType] = useState("password");
    const [showPassword, setShowPassword] = useState(false);

    const toggleInput = () => {
        setInputType(inputType === "password" ? "text" : "password");
        setShowPassword(!showPassword);
      };

  return (
    <div className="flex items-center justify-center flex-col bg-[#1B2030] w-full h-[100vh] login">
        <form className="sign-in-form flex justify-center items-center bg-[#292E41] flex-col my-[8rem] mx-[auto] py-[2.5rem] px-[1px] w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] rounded-xl">
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
            <input type="submit" value="Login" className="bg-[#83B943] w-[80%] mb-5 py-2 rounded-[6px] text-white cursor-pointer"/>
            <Link to="/forgotpassword" className="text-sm">Forgot Password?</Link>
      </form>
    </div>
  )
}

export default Login