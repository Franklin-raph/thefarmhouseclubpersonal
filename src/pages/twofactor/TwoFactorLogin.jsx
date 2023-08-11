import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

const TwoFactorLogin = ({baseUrl}) => {
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [token, setToken] = useState("")
    const twofadetails = JSON.parse(localStorage.getItem("_2fa"))
    const navigate = useNavigate()
    console.log(twofadetails)

    async function handleTwoFactorLogin(e){
        e.preventDefault()
        if(!token){
            setError("Please provide the token sent to your email")
            return
        }else{
            setLoader(true)
            const resp = await fetch(`${baseUrl}/loginwith2fa/`, {
                method:"POST",
                body: JSON.stringify({email:twofadetails.email, password:twofadetails.password, token}),
                headers: {
                    "Content-Type":"application/json"
                }
            })
            const data = await resp.json()
            console.log(resp, data)
            if(resp) setLoader(false)
            if(!resp.ok){
                setError(data.detail)
            }

            if(resp.ok){
                localStorage.setItem("user", JSON.stringify(data))
                navigate("/dashboard")
            }
        }
        
    }

  return (
    <div className='flex justify-center items-center forgotPassword w-full'>
      <form onSubmit={handleTwoFactorLogin} className='flex justify-center items-center flex-col bg-[#84b943f7] p-5 text-white xl:w-[35%] lg:w-[45%] md:w-[55%] sm:w-[65%] w-[80%]'>
        <h1 className='text-xl mb-5'>2-Factor Authentication</h1>
        <div className="w-full">
          <label htmlFor="email" className='block my-2'>Enter 8-digit code sent to your email</label>
          <input type="text" placeholder='00000000' value={token} onChange={(e) => setToken(e.target.value)} className='outline-none py-1 p-3 w-full bg-[#84b943f7] rounded-md border-2 border-white-500 mb-5'/>
        </div>
        {loader ? <i className="fa-solid fa-gear fa-spin mb-4 text-lg"></i> : <button type='submit' className="my-3 bg-white text-[#84b943f7] py-1 px-3 rounded-md">Submit</button> }
          
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

export default TwoFactorLogin