import {useEffect, useState} from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import SuccessAlert from '../../components/alert/SuccessAlert'
import ErrorAlert from '../../components/alert/ErrorAlert'

const VerifyEmail = ({baseUrl}) => {
    const navigate = useNavigate()
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [fromEmailVerify, setFromEmailVerify] = useState(false)
    const {token, uuid} = useParams()
    console.log(token, uuid)

    useEffect(() => {
        verifyEmail()
    },[])

    async function verifyEmail(){
        const response = await fetch(`${baseUrl}/verify-email/${token}/${uuid}`, {
            method:"GET"
        })
        console.log(response)
        const data = await response.json()
        if(response) setFromEmailVerify(true)
        if(response.ok){
            setError("")
            setSuccess(data.detail)
        }
        if(!response.ok){
            setSuccess("")
            setError(data.detail)
        }
        console.log(data)
    }

  return (
    <div>
        {/* <Navbar /> */}
        <div className="successModalBg">
            {success && 
                <SuccessAlert success={success} setFromEmailVerify={setFromEmailVerify} fromEmailVerify={fromEmailVerify}/>
                // <div className="successModal">
                //     <i className="ri-checkbox-circle-line"></i>
                //     <p className='text-center text-2xl'></p>
                //     <button onClick={()=> navigate("/login")}>Continue to login</button>
                // </div>
            }

            {error && 
                <ErrorAlert error={error} setFromEmailVerify={setFromEmailVerify} fromEmailVerify={fromEmailVerify}/>
            // <div className="failureModal">
            //     <i className="ri-close-circle-line"></i>
            //     <p className='text-center text-2xl mb-2'></p>
            //     <button onClick={()=> navigate("/login")}>Continue to login</button>
            // </div>
            }
            
      </div>
    </div>
  )
}

export default VerifyEmail