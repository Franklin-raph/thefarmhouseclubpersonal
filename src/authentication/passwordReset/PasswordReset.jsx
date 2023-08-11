import {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const PasswordReset = ({baseUrl}) => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loader, setLoader] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const {token, uuid} = useParams()
    const navigate = useNavigate()
    console.log(token, uuid, `/${baseUrl}/confirm-reset-password/${token}/${uuid}/`)

    useEffect(() => {
        verifyPaswordResetLink()
    },[])

    async function verifyPaswordResetLink(){
        const resp = await fetch(`${baseUrl}/confirm-reset-password/${token}/${uuid}/`)
        const data = await resp.json()
        if(!resp.ok){
            setError(data.detail)
            setTimeout(() => {
                setError("")
            },4000)
        }
        console.log(resp)
    }

    async function handlePasswordReset(e){
        e.preventDefault()
        if(!password || !confirmPassword){
            setError("Please fill in all fields")
            setTimeout(() => {
                setError("")
            },4000)
            return
        }else if(password !== confirmPassword){
            setError("Passwrd fields must match")
            setTimeout(() => {
                setError("")
            },4000)
            return
        }else{
            setLoader(true)
            const resp = await fetch(`${baseUrl}/confirm-reset-password/${token}/${uuid}/`,{
                method: "POST",
                body: JSON.stringify({new_password:password}),
                headers : {
                    "Content-Type": "application/json"
                }
            })
            const data = await resp.json()
            if(resp) setLoader(false)
            if(resp.ok){
                setSuccess(data.detail)
                setTimeout(() => {
                    setSuccess("")
                },4000)
            } 
            if(!resp.ok){
                setError(data.detail)
                setTimeout(() => {
                    setError("")
                },4000)
            }
        }
    }

  return (
    <div className='flex justify-center items-center forgotPassword w-full'>
      <form onSubmit={handlePasswordReset} className='flex justify-center items-center flex-col bg-[#84b943f7] p-5 text-white xl:w-[35%] lg:w-[45%] md:w-[55%] sm:w-[65%] w-[80%]'>
        <h1 className='text-xl mb-5'>Reset Password</h1>
        <div className="w-full">
          <label htmlFor="email" className='block my-2'>Password</label>
          <input type="password" placeholder='*****' value={password} onChange={(e) => setPassword(e.target.value)} className='outline-none py-1 p-3 w-full bg-[#84b943f7] rounded-md border-2 border-white-500 mb-5'/>
        </div>
        <div className="w-full">
          <label htmlFor="email" className='block my-2'>Confirm Password</label>
          <input type="password" placeholder='*****' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='outline-none py-1 p-3 w-full bg-[#84b943f7] rounded-md border-2 border-white-500 mb-5'/>
        </div>
        {loader ? <i className="fa-solid fa-gear fa-spin mb-4 text-lg"></i> : <button type='submit' className="my-3 bg-white text-[#84b943f7] py-1 px-3 rounded-md">Reset Password</button> }
          
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
           <p>{success}</p>
          <button onClick={()=> navigate("/login")}>Continue to login</button>
        </div>
      </div>
      }
    </div>
  )
}

export default PasswordReset