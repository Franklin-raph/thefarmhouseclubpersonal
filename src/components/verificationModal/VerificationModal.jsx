import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '../alert/ErrorAlert';

const VerificationModal = ({ email, password, baseUrl }) => {
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [token, setToken] = useState("")
    const navigate = useNavigate()
    // console.log(email, password)
  
  useEffect(() => {
    // let otp_inputs = document.querySelectorAll(".otp__digit")
    // let mykey = "0123456789".split("")
    // otp_inputs.forEach((_)=>{
    // _.addEventListener("keyup", handle_next_input)
    // })
    // function handle_next_input(event){
    // let current = event.target
    // let index = parseInt(current.classList[1].split("__")[2])
    // current.value = event.key
    
    // if(event.keyCode == 8 && index > 1){
    //     current.previousElementSibling.focus()
    // }
    // if(index < 6 && mykey.indexOf(""+event.key+"") != -1){
    //     let next = current.nextElementSibling;
    //     next.focus()
    // }
    // let _finalKey = ""
    // for(let {value} of otp_inputs){
    //     _finalKey += value
    // }
    // if(_finalKey.length == 6){
    //     document.querySelector("#_otp").classList.replace("_notok", "_ok")
    //     document.querySelector("#_otp").innerText = _finalKey
    // }else{
    //     document.querySelector("#_otp").classList.replace("_ok", "_notok")
    //     document.querySelector("#_otp").innerText = _finalKey
    // }
// }

  }, []);

  async function handleTwoFactorLogin(e){
    e.preventDefault()
    if(!token){
        setError("Please provide the token sent to your email")
        return
    }else{
        setLoader(true)
        const resp = await fetch(`${baseUrl}/loginwith2fa/`, {
            method:"POST",
            body: JSON.stringify({email:email, password:password, token}),
            headers: {
                "Content-Type":"application/json"
            }
        })
        console.log(JSON.stringify({email:email.email, password:password, token}))
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
    <div class="otp-input-field-bg">
        <div className="otp-input">
            <i class="ri-shield-check-fill text-[#fff] bg-[#1AC888] p-3 rounded-full text-4xl"></i>
            <h1 className='mt-5 text-lg'>Enter the 8 digit OTP Code sent to your mail at {email} </h1>
            <input type="number" onChange={e => setToken(e.target.value)} className='outline-none w-full px-3 py-1 my-5' placeholder='********'/>
            {
            loader ? <button className="bg-[#1AC888] w-full py-2 rounded-[6px] text-lg text-center"><i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i></button> 
            : 
            <button className='text-[#fff] bg-[#1AC888] w-full py-1 px-5 rounded-md' onClick={handleTwoFactorLogin}>Verify OTP</button>
            }
            
        </div>
        {error && <ErrorAlert error={error} setError={setError}/>}
        {/* <input type="number" class="otp__digit otp__field__1" />
        <input type="number" class="otp__digit otp__field__2" />
        <input type="number" class="otp__digit otp__field__3" />
        <input type="number" class="otp__digit otp__field__4" />
        <input type="number" class="otp__digit otp__field__5" />
        <input type="number" class="otp__digit otp__field__6" /> */}
    </div>
  );
};

export default VerificationModal;
