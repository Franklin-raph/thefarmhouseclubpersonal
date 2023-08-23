import {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../assets/images/Asset-2.-300x47.png"
import ErrorAlert from '../../components/alert/ErrorAlert'
import SuccessAlert from '../../components/alert/SuccessAlert'

const ForgotPassword = ({baseUrl}) => {
  const [email, setEmail] = useState("igboekwulusifranklin@gmail.com")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loader, setLoader] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()

  useEffect(() => {
    if(user){
      console.log(true)
      navigate("/")
  }
  if(!user){
      console.log(true)
      navigate("/forgotpassword")
  }
  },[])

  async function handleForgotPassword(e){
    e.preventDefault()
    console.log(`${baseUrl}/reset-password/`)
    if(!email){
      setError("Please fill in the field")
      setTimeout(() => {
        setError("")
      },4000)
      return
    }else{
      setLoader(true)
      const resp = await fetch(`${baseUrl}/reset-password/`,{
        method:"POST",
        body: JSON.stringify({email:email}),
        headers: {
          "Content-Type":"application/json"
        }
      })
      const data = await resp.json()
      console.log(resp, data)
      if(resp) setLoader(false)
      if(!resp.ok){
        setError(data.detail)
        setTimeout(() => {
          setError("")
        },4000)
      }
      if(resp.ok){
        setSuccess(data.detail)
      }
    }
  }

  return (
    <div className="px-[1rem] lg:px-[5rem] py-[5rem] register">
    <div className=" mb-[5rem] cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="" className=""/>
    </div>
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between justify-center">
      <div className="w-[90%] md:w-[55%]">
        <h1 className="font-bold text-[27px] xl:text-[50px] text-[#006340]">Reset Password</h1>
      </div>
      <form onSubmit={handleForgotPassword} className="w-[95%] md:w-[50%] md:mt-[0] mt-[2rem] px-[1.5rem] py-5 md:px-[2.5rem]">
        <h1 className="text-[18px] text-[#B3B3B3] font-[600]">Put in your email to get a password reset link</h1>
        <div className="flex items-center mt-5" style={{ borderBottom:"1px solid #333" }}>
              <label><i className="fa-solid fa-envelope text-sm"></i></label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" 
              className="w-full px-[10px] py-[7px] bg-transparent mt-1 border-0 outline-none"/>
        </div>
        {loader ? <button className="bg-[#1AC888] w-full mt-9 py-2 rounded-[6px] text-lg text-center"><i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i></button> : <input type="submit" value="Send Reset Password Link" className="bg-[#1AC888] w-full mt-9 py-2 rounded-[6px] text-[#fff] cursor-pointer"/>}
        
        <div className="flex mt-3 mb-8 items-center justify-between" style={{ borderBottom:"none" }}>
          <a href='https://mailto:thefarmhouseclub@gmail.com' className="text-sm">Having trouble logging in? <Link to="/register" className="text-sm text-[#1AC888]">Contact support</Link> </a>
        </div>
      </form>
      <a href="https://wa.me/+2347056514643" target="_blank" className="whatsapp fixed bottom-2 right-2 bg-green-500 py-2 px-3 rounded-full text-white text-sm">
        <div className="flex items-center gap-4">
          <i class="ri-whatsapp-line text-2xl"></i>
        </div>
      </a>
    </div>

    {error && <ErrorAlert error={error} setError={setError}/>}
    {success && <SuccessAlert success={success} setSuccess={setSuccess}/>}
    
  </div>
  )
}

export default ForgotPassword