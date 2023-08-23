import React from 'react'
import { useNavigate } from 'react-router-dom'

const SuccessAlert = ({success, setSuccess, setFromEmailVerify, fromEmailVerify}) => {
    const navigate = useNavigate()
  return (
    <div>
        <div className="successModalBg">
            <div className="successModal flex items-center justify-center flex-col gap-5" style={{ position:"relative" }}>
                <i class="ri-close-fill absolute top-[5px] right-[5px] cursor-pointer" style={{ color:"#333", fontSize:"22px" }} onClick={() => setSuccess(false)}></i>
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
                <p style={{ color:"black" }}>{success}</p>
                {fromEmailVerify && <button onClick={()=> {
                    navigate("/login")
                    setFromEmailVerify(false)
                }}>Continue to login</button>}
            </div>
        </div>
    </div>
  )
}

export default SuccessAlert