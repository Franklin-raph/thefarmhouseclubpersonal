import {useState} from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = ({baseUrl}) => {
  console.log(baseUrl)
  const [email, setEmail] = useState("igboekwulusifranklin@gmail.com")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loader, setLoader] = useState(false)

  async function handleForgotPassword(e){
    e.preventDefault()
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
    <div className='flex justify-center items-center forgotPassword w-full'>
      <form onSubmit={handleForgotPassword} className='flex justify-center items-center flex-col bg-[#84b943f7] p-5 text-white xl:w-[35%] lg:w-[45%] md:w-[55%] sm:w-[65%] w-[80%]'>
        <h1 className='text-xl mb-5'>Password Reset Link</h1>
        <div className="w-full">
          <label htmlFor="email" className='block my-2'>Password Request Link</label>
          <input type="text" placeholder='info@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} className='outline-none py-1 p-3 w-full bg-[#84b943f7] rounded-md border-2 border-white-500 mb-5'/>
        </div>
        {loader ? <i className="fa-solid fa-gear fa-spin mb-4 text-lg"></i> : <button type='submit' className="my-3 bg-white text-[#84b943f7] py-1 px-3 rounded-md">Submit</button> }
          
          <Link to="/"><i class="fa-solid fa-house"></i> Go back home</Link>
      </form>

      {error &&
        <div className="successModalBg">
          <div className="failureModal">
            <i className="ri-close-circle-line"></i>
            <p style={{ color:"black" }}>{error}</p>
            {/* <button onClick={()=> navigate("/login")}>Continue to login</button> */}
          </div>
        </div>
      }
      {success &&
      <div className="successModalBg">
        <div className="successModal">
          <i className="ri-checkbox-circle-line"></i>
           <p >{success}</p>
          <button onClick={()=> setSuccess(false)}>Ok</button>
        </div>
      </div>
      }
    </div>
  )
}

export default ForgotPassword