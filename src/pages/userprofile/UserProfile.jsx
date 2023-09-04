import React, { useEffect, useState } from 'react'
import LoggedInNav from '../../components/navbar/LoggedInNav'
import { useParams, useNavigate } from 'react-router-dom'
import ErrorAlert from '../../components/alert/ErrorAlert'
import SuccessAlert from '../../components/alert/SuccessAlert'

const UserProfile = ({baseUrl, changemode, mode}) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const [showProfile, setShowProfile] = useState(true)
  const [show2Fa, setShow2Fa] = useState(false)
  const [myProfile, setMyProfile] = useState({})
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loader, setLoader] = useState(false)
  const [changePasswordModal, setChangePasswordModal] = useState(false)
  const [twoFactorModal, setTwoFactorModal] = useState(false)
  const [twoFactorSuccessMessage, setTwoFactorSuccessMessage] = useState(false)
  const [confirmTwoFactorTurnOff, setConfirmTwoFactorTurnOff] = useState(false)
  const [old_password, setOldPassword] = useState("")
  const [new_password1, setNewPassword1] = useState("")
  const [new_password2, setNewPassword2] = useState("")
  const [updatePasswordModalForGoogleSignUps, setUpdatePasswordModalForGoogleSignUps] = useState(false)
  const [btns, setbtns] = useState()
  const navigate = useNavigate()
  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [username, setUserName] = useState("")
  const [phone_num, setPhoneNum] = useState("")

    const {id} = useParams()
    useEffect(()=> {
      console.log(user)
      if(!user) navigate("/login")
      getUserProfile()
  },[btns])


    async function getUserProfile(){
      const response = await fetch(`${baseUrl}/profile-update/${id}`,{
        headers:{
          Authorization: `Bearer ${user.access}`
        }
      })
      const data = await response.json()
      console.log(response, data)
      setMyProfile(data)
      setFirstName(data.first_name)
      setLastName(data.last_name)
      setUserName(data.username)
      setPhoneNum(data.phone_num)
      setbtns(data.has2fa)
    }

    async function activateTwoFactorAuth(){
      if(!password || !email){
        setError("Please fill in the fields")
        setTimeout(()=> {
          setError("")
        },4000)
      }else{
        setLoader(true)
        const resp = await fetch(`${baseUrl}/set-on-or-off-2fa/`, {
          method:"POST",
          headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${user.access}`
          },
          body: JSON.stringify({email:email, password:password})
        })
        if(resp) setLoader(false)
        const data = await resp.json()
      console.log(data)
      if(!resp.ok){
        setError(data.detail)
        setTimeout(()=> {
          setError("")
        },4000)
      }
      if(resp.ok){
        setSuccess(data.detail)
        setbtns(data.has2fa)
        setTwoFactorSuccessMessage(data.detail)
        setTwoFactorModal(false)
        setConfirmTwoFactorTurnOff(false)
        getUserProfile()

        setTimeout(()=> {
          setError("")
        },4000)
      }
      setTwoFactorModal(false)
      }
      
    }
    console.log(myProfile.has_changed_password)

    async function handlePasswordChange(){
      console.log({old_password:old_password, new_password1:new_password1, new_password2:new_password2})
      if(!new_password1 || !new_password2){
        setError("Please fill out all fields")
      }else if (!passwordRegEx.test(new_password1)){
        setError("Password must be at least 8 characters, have at least one uppercase, have at least one lower case a special character and a number")
      }else if(new_password1 !== new_password2){
        setError("Password fields do not match")
      }else{
      setLoader(true)
      const response = await fetch(`${baseUrl}/reset-password-from-dashboard/`, {
        method:"POST",
        headers: {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${user.access}`
        },
        body: JSON.stringify({old_password:old_password, new_password1:new_password1, new_password2:new_password2})
      })
      if(response) {
        setLoader(false)
        setChangePasswordModal(false)
      }
      const data = await response.json()
      if(response.ok){
        setSuccess(data.detail)
        getUserProfile()
      }
      if(!response.ok){
        setError(data.detail)
      }
      console.log(response, data)
    }
  }

  function openTwoFactorModal(){
    if(myProfile.provider === "google" && myProfile.has_changed_password === false){
      setUpdatePasswordModalForGoogleSignUps(true)
    }else{
      setTwoFactorModal(true)
    }
  }

  async function updateMyAccount(){
    setLoader(true)
    const response = await fetch(`${baseUrl}/profile-update/${id}/`, {
      method:"PATCH",
      body: JSON.stringify({phone_num:phone_num, first_name:first_name, last_name:last_name}),
      headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${user.access}`
      }
    })
    const data = await response.json()
    console.log(data, response)
    if(response) setLoader(false)
    if(response.ok) setSuccess("Account successfully updated")
    if(!response.ok) setError("An error occured, please try agian later")
  }

  return (
    <div>
      {error && <ErrorAlert error={error} setError={setError}/>}
      {success && <SuccessAlert success={success} setSuccess={setSuccess}/>}
      {updatePasswordModalForGoogleSignUps && 
        <div className='changePasswordModalBg'>
          <div className="changPasswordModal relative" style={{ textAlign:"start" }}>
            <i className='ri-close-fill absolute top-2 right-3 cursor-pointer text-2xl' onClick={(e) => setUpdatePasswordModalForGoogleSignUps(false)}></i>
            <p className='text-center text-[16px]'>
              we are excited to introduce an additional layer of protection: 2-Factor Authentication (2FA). However, 
              before you can enable 2FA for your account, we kindly ask you to update your password.
            </p>
          </div>
        </div>
      }
        <LoggedInNav changemode={changemode} mode={mode}/>
        <div className="userProfileDetailsContainer relative top-[10%]">
          <div className='fixed bg-white w-full py-8 top-[12.5%] left-[16%] z-10' id='userProfileNavContainer'>
            <div className='userProfileNav inline-flex items-center gap-5 py-2 px-4 rounded-full bg-[#F5F6FA]'>
              <div className='cursor-pointer flex items-center gap-2' onClick={()=> {
                setShow2Fa(false)
                setShowProfile(true)
                }}>
                {showProfile ? <p className='text-[#1AC888] text-[14px] p-2 rounded-full bg-white'>ACCOUNT</p>:<p className='text-[14px]'>ACCOUNT</p>}
              </div>
              <div className='cursor-pointer flex items-center gap-2' onClick={()=> {
                setShow2Fa(true)
                setShowProfile(false)
                }}>
                {setShow2Fa ? <p className='text-[#1AC888] p-2 rounded-full bg-white text-[14px]'>SECURITY</p>:<p className='text-[14px]'>SECURITY</p>}
              </div>
            </div>
          </div>

          {showProfile && 
            <div className='userProfileDetails pl-[10rem] mt-[7rem]'>
              <h1 className='text-2xl my-[2.5rem] text-[rgba(10,46,101,.3)] font-medium border-b border-gray-200 pb-5'>Personalize</h1>
              <div className='my-3 flex items-center gap-4'>
                <i className="ri-user-3-line text-3xl px-3 py-2 bg-slate-500 rounded-full text-white cursor-pointer"></i>
                <div className='flex items-center gap-2'>
                  <p className='font-[600] text-2xl text-[#006340]'>{myProfile && myProfile.first_name}</p>
                  <p className='font-[600] text-2xl text-[#006340]'>{myProfile && myProfile.last_name}</p>
                </div>
              </div>

              <div className="flex gap-10">
                <div className='my-9 flex flex-col items-start md:flex-row gap-10 md:items-end'>
                  <div>
                    <label className='block text-[13px] font-[600] text-lg text-[#006340] mb-2'>First Name</label>
                    <input className='border border-gray-300 rounded-md px-2 py-2 outline-none' onChange={e => setFirstName(e.target.value)} value={first_name} />
                  </div>
                </div>

                <div className='my-9 flex flex-col items-start md:flex-row gap-10 md:items-end'>
                  <div>
                    <label className='block font-[600] text-lg text-[#006340] mb-2'>Last Name</label>
                    <input className='border border-gray-300 rounded-md px-2 py-2 outline-none' onChange={e => setLastName(e.target.value)} value={last_name} />
                  </div>
                </div>
              </div>

              <div className="flex gap-10">
                <div className='my-9 flex flex-col items-start md:flex-row gap-10 md:items-end'>
                  <div>
                    <label className='block font-[600] text-lg text-[#006340] mb-2'>User Name</label>
                    <input className='border border-gray-300 rounded-md px-2 py-2 outline-none' onChange={e => setUserName(e.target.value)} value={username} />
                  </div>
                </div>

                <div className='my-9 flex flex-col items-start md:flex-row gap-10 md:items-end'>
                  <div>
                    <label className='block font-[600] text-lg text-[#006340] mb-2'>Phone Number</label>
                    <input className='border border-gray-300 rounded-md px-2 py-2 outline-none' onChange={e => setPhoneNum(e.target.value)} value={phone_num} />
                  </div>
                </div>
              </div>
              {loader ? 
                <button className='text-[#fff] bg-[#1AC888] w-auto mt-5 py-3 px-5 rounded-md block'>
                  <i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i>
                </button>
                :
                <button className='text-[#fff] bg-[#1AC888] w-auto mt-5 py-3 px-5 rounded-md block' onClick={updateMyAccount}>Update My Profile</button>
              }
            </div>
              
          }

          {show2Fa && 
            <div className='userProfileDetails pl-[10rem] mt-[7rem]'>
              <div>
                <h1 className='text-2xl my-[2.5rem] text-[rgba(10,46,101,.3)] font-medium border-b border-gray-200 pb-5'>Verified Information</h1>
                <div className='my-9 flex gap-10 md:flex-row md:items-center flex-col items-start'>
                    <h1 className='font-[600] text-xl text-[#006340]'>Email Address</h1>
                    <p className='px-2 py-2'>{myProfile && myProfile.email}</p>
                </div>

                {/* <div className='my-9 flex gap-10 md:flex-row md:items-center flex-col items-start'>
                    <h1 className='font-[600] text-xl text-[#006340]'>Phone Number</h1>
                    {myProfile && myProfile.phone_num ? <p className='px-2 py-2'>{myProfile.phone_num}</p> : <p className='px-2 py-2'>+234000000000</p> }
                </div> */}

                <div className='my-9 flex gap-10 md:flex-row md:items-center flex-col items-start'>
                    <h1 className='font-[600] text-xl text-[#006340]'>Bank Verification Number (BVN)</h1>
                    <p className='px-2 py-2'>******</p>
                </div>
              </div>
              
              <div className='mt-[5rem]'>
                <h1 className='text-2xl my-[2.5rem] text-[rgba(10,46,101,.3)] font-medium border-b border-gray-200 pb-5'>Account Protection</h1>
                <div className='my-0 flex flex-col items-start gap-10 md:flex-row md:gap-[9rem] md:items-end'>
                  <div className='w-full md:w-[50%]'>
                    <h1 className='font-[600] text-xl text-[#006340] mb-2'>Two-Factor Authentication</h1>
                    <p className='text-[14px] text-[#46695c]'>Protect your farmhouseclub account from unauthorized transactions using a software token.</p>
                  </div>
                  <label class="switch flex items-center">
                    {myProfile && myProfile.has2fa ? <button className='bg-gray-300 text-white py-1 px-2 cursor-not-allowed'>ON</button> : <button className='bg-green-500 text-white py-1 px-2' onClick={openTwoFactorModal}>ON</button>}
                    {myProfile && myProfile.has2fa ? <button className='bg-red-500 text-white py-1 px-2' onClick={() => setConfirmTwoFactorTurnOff(true)}>OFF</button> : <button className='bg-gray-300 cursor-not-allowed text-white py-1 px-2' cursor-not-allowed>OFF</button>}
                  </label>
                </div>
              </div>
              
              <div className='mt-[5rem]'>
                <h1 className='text-2xl my-[2.5rem] text-[rgba(10,46,101,.3)] font-medium border-b border-gray-200 pb-5'>Password</h1>
                <div className='my-0 flex flex-col items-start gap-10 md:flex-row md:gap-[9rem] md:items-end'>
                  <div className='w-full md:w-[50%]'>
                    <h1 className='font-[600] text-xl text-[#006340] mb-2'>Update Password</h1>
                    <p className='text-[14px] text-[#46695c]'>Change your old password to a new one</p>
                  </div>
                  <p onClick={() => setChangePasswordModal(true)} className='text-[#006340] cursor-pointer'>Change Password</p>
                </div>
              </div>

              {user && myProfile.provider === "google" && myProfile.has_changed_password === false ?
                <>
                  {changePasswordModal &&
                  <div className='changePasswordModalBg'>
                    <div className="changPasswordModal relative" style={{ textAlign:"start" }}>
                      <i className='ri-close-fill absolute top-3 right-5 cursor-pointer' onClick={(e) => setChangePasswordModal(false)}></i>
                      <div className='w-full my-5'>
                        <label className='block text-[16px] mb-1'>New Password</label>
                        <input onChange={(e) => setNewPassword1(e.target.value)} value={new_password1} type="password"  className='border border-gray-400 rounded-md px-2 py-2 outline-none w-full text-[17px]'/>
                      </div>
                      <div className='w-full my-5'>
                        <label className='block text-[16px] mb-1'>Confirm Password</label>
                        <input onChange={(e) => setNewPassword2(e.target.value)} value={new_password2} type="password" className='border border-gray-400 rounded-md px-2 py-2 outline-none w-full text-[17px]'/>
                      </div>
                      {loader ?
                      <button className="bg-[#1AC888] w-full py-2 rounded-[6px] text-lg text-center"><i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i></button> 
                      : 
                      <button className='text-[#fff] text-sm bg-[#1AC888] w-full py-2 px-5 rounded-md' onClick={() => handlePasswordChange()}>Change Password</button>
                      }
                    </div>
                  </div>
                  }
                </>
              : 
                <>
                    {changePasswordModal && 
                      <div className='changePasswordModalBg'>
                        <div className="changPasswordModal relative" style={{ textAlign:"start" }}>
                          <i className='ri-close-fill absolute top-3 right-5 cursor-pointer' onClick={(e) => setChangePasswordModal(false)}></i>
                          <div className='w-full my-5'>
                            <label className='block text-[16px] mb-1'>Old Password</label>
                            <input onChange={(e) => setOldPassword(e.target.value)} value={old_password} type="password" className='border border-gray-400 rounded-md px-2 py-2 outline-none w-full text-[17px]'/>
                          </div>
                          <div className='w-full my-5'>
                            <label className='block text-[16px] mb-1'>New Password</label>
                            <input onChange={(e) => setNewPassword1(e.target.value)} value={new_password1} type="password" className='border border-gray-400 rounded-md px-2 py-2 outline-none w-full text-[17px]'/>
                          </div>
                          <div className='w-full my-5'>
                            <label className='block text-[16px] mb-1'>Confirm Password</label>
                            <input onChange={(e) => setNewPassword2(e.target.value)} value={new_password2} type="password" className='border border-gray-400 rounded-md px-2 py-2 outline-none w-full text-[17px]'/>
                          </div>
                          {loader ?
                          <button className="bg-[#1AC888] w-full py-2 rounded-[6px] text-lg text-center"><i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i></button> 
                          :
                          <button className='text-[#fff] text-sm bg-[#1AC888] w-full py-2 px-5 rounded-md' onClick={() => handlePasswordChange()}>Change Password</button>
                          }
                        </div>
                      </div>
                    }
                </>
              }
              
          </div>
          }

          {confirmTwoFactorTurnOff &&
          <div className="twoFactorModalBg">
            <div className="twoFactorModal relative">
              <i className='ri-close-fill absolute top-3 right-5 cursor-pointer' onClick={(e) => setConfirmTwoFactorTurnOff(false)}></i>
              <p className='mb-5 font-medium text-lg'>Are you sure you want to turn off two-factor authentication on this account?</p>
              {loader ?
              <button className="bg-[#1AC888] w-full py-2 rounded-[6px] text-lg text-center"><i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i></button> 
              : 
              <button className='text-[#fff] text-sm bg-[#1AC888] w-full py-2 px-5 rounded-md' onClick={activateTwoFactorAuth}>Yes, Continue</button>
              }
            </div>
          </div>
          }
        </div>

        {twoFactorModal && 
          <div className="twoFactorModalBg">
            <div className="twoFactorModal relative">
            <i className='ri-close-fill absolute top-3 right-5 cursor-pointer' onClick={(e) => setTwoFactorModal(false)}></i>
              <h1 className='font-[500] mb-1'>Two-Factor Authentication</h1>
              <p className='text-sm text-center'>2FA adds an extra layer of security to your account by generating a secure code on your device for approving transactions and sign in.</p>
              <div className='text-start my-5'>
                <label className='block text-[17px] mb-2'>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className='border border-gray-400 rounded-md px-2 py-2 outline-none w-full text-[17px]' />
              </div>
              <div className='text-start my-5'>
                <label className='block text-[17px] mb-2'>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className='border border-gray-400 rounded-md px-2 py-2 outline-none w-full text-[17px]' />
              </div>
              {loader ?
              <button className="bg-[#1AC888] w-full py-2 rounded-[6px] text-lg text-center"><i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i></button> 
              : 
              <button className='text-[#fff] text-sm bg-[#1AC888] w-full py-2 px-5 rounded-md' onClick={activateTwoFactorAuth}>Submit</button>
              }
            </div>
          </div>
        }
        {twoFactorSuccessMessage && 
        <div className="twoFactorModalBg">
          <div className="twoFactorModal relative">
            <i className='ri-close-fill absolute top-3 right-5 cursor-pointer' onClick={(e) => setTwoFactorSuccessMessage(false)}></i>
            <p>{twoFactorSuccessMessage}</p> 
          </div>
        </div>
        }
    </div>
  )
}

export default UserProfile