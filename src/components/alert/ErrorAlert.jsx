import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorAlert = ({error, setError, fromEmailVerify, setFromEmailVerify}) => {
    console.log(error)
    const navigate = useNavigate()
  return (
    <div>
        <div className="successModalBg">
            <div className="failureModal flex items-center justify-center flex-col gap-10" style={{ position:"relative" }}>
                <i class="ri-close-fill absolute top-[5px] right-[5px] cursor-pointer" style={{ color:"#333", fontSize:"22px" }} onClick={() => setError(false)}></i>
                <svg class="cancel" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <path class="check__cancel" fill="none" d="M14.1 14.1l23.8 23.8 m0,-23.8 l-23.8,23.8" />
                </svg>
                <p style={{ color:"black" }}>{error}</p>
                {fromEmailVerify && <button onClick={()=> {
                    navigate("/login")
                    setFromEmailVerify(false)
                }}>Continue to login</button>}
            </div>
        </div>
    </div>
  )
}

export default ErrorAlert