import {useEffect} from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate, useParams } from 'react-router-dom'

const VerifyEmail = () => {
    const navigate = useNavigate()
    const {token, uuid} = useParams()
    console.log(token, uuid)

    useEffect(() => {
        verifyEmail()
    },[])

    async function verifyEmail(){
        const response = await fetch("https://avda.pythonanywhere.com/api/v1/verify-email/", {
            method:"POST",
            body: JSON.stringify({token:token, uidb64:uuid}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await response.json()
        console.log(data)
    }

  return (
    <div>
        <Navbar />
        <div className="successModalBg">
        <div className="successModal">
          <i class="ri-checkbox-circle-line"></i>
            <h3 className='text-center text-2xl'>Email Verified Successfully</h3>
          <button onClick={()=> navigate("/login")}>Continue to login</button>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail