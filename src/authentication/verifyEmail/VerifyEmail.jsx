import {useEffect, useState} from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate, useParams } from 'react-router-dom'

const VerifyEmail = () => {
    const navigate = useNavigate()
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const {token, uuid} = useParams()
    console.log(token, uuid)

    useEffect(() => {
        verifyEmail()
    },[])

    async function verifyEmail(){
        const response = await fetch(`https://avda.pythonanywhere.com/api/v1/verify-email/${token}/${uuid}`, {
            method:"GET"
        })
        console.log(response)
        const data = await response.json()
        if(response.ok){
            setSuccess(data.detail)
        }
        if(!response.ok){
            setError(data.detail)
        }
        console.log(data)
    }

  return (
    <div>
        {/* <Navbar /> */}
        <div className="successModalBg">
            {success && 
                <div className="successModal">
                    <i className="ri-checkbox-circle-line"></i>
                    <h3 className='text-center text-2xl'>{success}</h3>
                    <button onClick={()=> navigate("/login")}>Continue to login</button>
                </div>
            }

            {error && 
            <div className="failureModal">
                <i className="ri-close-circle-line"></i>
                <h3 className='text-center text-2xl mb-2'>{error}</h3>
                <button onClick={()=> navigate("/login")}>Continue to login</button>
            </div>
            }
            
      </div>
    </div>
  )
}

export default VerifyEmail