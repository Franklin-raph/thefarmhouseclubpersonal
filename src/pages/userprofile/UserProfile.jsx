import React, { useEffect, useState } from 'react'
import LoggedInNav from '../../components/navbar/LoggedInNav'
import { useParams, useNavigate } from 'react-router-dom'

const UserProfile = ({baseUrl}) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const [showProfile, setShowProfile] = useState(true)
  const [show2Fa, setShow2Fa] = useState(false)
  const [showAccountUpdate, setAccountUpdate] = useState(false)
  const [myProfile, setMyProfile] = useState({})
  const [email, setEmail] = useState("igboekwulusifranklin@gmail.com")
  const [password, setPassword] = useState("1234567890")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loader, setLoader] = useState(false)
  const [changePasswordModal, setChangePasswordModal] = useState(false)
  const [twoFactorCheckBox, setTwoFactorCheckBox] = useState()
  const navigate = useNavigate()

    const {id} = useParams()
    useEffect(()=> {
      console.log(user)
      if(!user) navigate("/login")
      getUserProfile()
  },[])
  console.log(twoFactorCheckBox)


    async function getUserProfile(){
      const response = await fetch(`${baseUrl}/profile-update/${id}`,{
        headers:{
          Authorization: `Bearer ${user.access}`
        }
      })
      console.log(response)
      const data = await response.json()
      setMyProfile(data)
    }

    const checkHandler = () => {
      setTwoFactorCheckBox(!twoFactorCheckBox)
      if(twoFactorCheckBox === true){
        console.log("true from 2fa")
      }
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
      if(!resp.ok){
        setError(data.detail)
        setTimeout(()=> {
          setError("")
        },4000)
      }
      if(resp.ok){
        setSuccess(data.detail)
        setTimeout(()=> {
          setError("")
        },4000)
      }
        console.log(resp, data)
      }
      
    }
    console.log(myProfile)

    async function handlePasswordChange(){

    }

  return (
    <div>
        <LoggedInNav />
        <div className="userProfileDetailsContainer">
          <div className='fixed bg-white w-full py-8'>
            <div className='userProfileNav flex items-center gap-5 py-3 w-[16%] px-5 rounded-full bg-[#F5F6FA]'>
              <div className='cursor-pointer flex items-center gap-2' onClick={()=> {
                setShow2Fa(false)
                setShowProfile(true)
                setAccountUpdate(false)
              }}>
                {/* <i class="ri-user-3-line"></i> */}
                <p>Account</p>
                </div>
              <div className='cursor-pointer flex items-center gap-2' onClick={()=> {
                setShow2Fa(false)
                setShowProfile(false)
                setAccountUpdate(true)
              }}>
                {/* <i class="ri-pencil-fill"></i> */}
                {/* <p>Account Update</p> */}
              </div>
              <div className='cursor-pointer flex items-center gap-2' onClick={()=> {
                setShow2Fa(true)
                setShowProfile(false)
                setAccountUpdate(false)
              }}>
                {/* <i class="ri-key-2-line"></i> */}
                <p>Security</p>
                </div>
            </div>
          </div>

          {showProfile && 
            <div className='userProfileDetails pl-5 mt-20'>
              <h1 className='text-2xl my-[2.5rem] text-[rgba(10,46,101,.3)] font-medium border-b border-gray-200 pb-5'>Personalize</h1>
              <div className='my-3 flex items-center gap-4'>
                <i className="ri-user-3-line text-3xl px-3 py-2 bg-slate-500 rounded-full text-white cursor-pointer"></i>
                <div className='flex items-center gap-2'>
                  <p className='font-[600] text-2xl text-[#006340]'>{myProfile && myProfile.first_name}</p>
                  <p className='font-[600] text-2xl text-[#006340]'>{myProfile && myProfile.last_name}</p>
                </div>
              </div>

              <div className='my-9 inline-flex gap-10 items-end'>
                <div className='w-[50%]'>
                  <h1 className='font-[600] text-xl text-[#006340] mb-2'>First Name</h1>
                  <p className='text-[14px] text-[#46695c]'>Receive money from friends using your username</p>
                </div>
                <div>
                  <label className='block text-[13px] mb-1'>First Name</label>
                  <input className='border border-gray-300 rounded-md px-2 py-2 outline-none' value={myProfile && myProfile.first_name} />
                </div>
              </div>

              <div className='my-9 inline-flex gap-10 items-end'>
                <div className='w-[50%]'>
                  <h1 className='font-[600] text-xl text-[#006340] mb-2'>Last Name</h1>
                  <p className='text-[14px] text-[#46695c]'>Receive money from friends using your username</p>
                </div>
                <div>
                  <label className='block text-[13px] mb-1'>Last Name</label>
                  <input className='border border-gray-300 rounded-md px-2 py-2 outline-none' value={myProfile && myProfile.last_name} />
                </div>
              </div>

              <div className='my-9 inline-flex gap-10 items-end'>
                <div className='w-[50%]'>
                  <h1 className='font-[600] text-xl text-[#006340] mb-2'>User Name</h1>
                  <p className='text-[14px] text-[#46695c]'>Receive money from friends using your username</p>
                </div>
                <div>
                  <label className='block text-[13px] mb-1'>User Name</label>
                  <input className='border border-gray-300 rounded-md px-2 py-2 outline-none' value={myProfile && myProfile.username} />
                </div>
              </div>

              <div className='my-3'>
                <h1 className='font-[600] text-xl text-[#006340] mb-2'>Public Key</h1>
                <p className='border border-gray-300 inline rounded-md px-2 py-1'>{user && user.public_key}</p>
              </div>

              <button className='text-[#fff] bg-[#1AC888] w-auto mt-5 py-3 px-5 rounded-md'>Save Changes</button>

              {/* <div className='my-2'>
                <label>Has 2-Factor Set Up</label>
                {myProfile && 
                  myProfile.has2fa === false ? <p className='border border-gray-300 w-[50%] rounded-md px-2 py-1'>False</p> 
                  : 
                  <p className='border border-gray-300 w-[50%] rounded-md px-2 py-1'>True</p>
                }
              </div> */}
            </div>
              
          }

          {show2Fa && 
            <div className='userProfileDetails pl-5 mt-20'>
              <div>
                <h1 className='text-2xl my-[2.5rem] text-[rgba(10,46,101,.3)] font-medium border-b border-gray-200 pb-5'>Verified Information</h1>
                <div className='my-9 flex gap-10 items-center'>
                    <h1 className='font-[600] text-xl text-[#006340]'>Email Address</h1>
                    <p className='px-2 py-2'>{myProfile && myProfile.email}</p>
                </div>

                <div className='my-9 flex gap-10 items-center'>
                    <h1 className='font-[600] text-xl text-[#006340]'>Phone Number</h1>
                    <p className='px-2 py-2'>+23458987654</p>
                </div>

                <div className='my-9 flex gap-10 items-center'>
                    <h1 className='font-[600] text-xl text-[#006340]'>Bank Verification Number (BVN)</h1>
                    <p className='px-2 py-2'>698709****</p>
                </div>
              </div>
              
              <div className='mt-[5rem]'>
                <h1 className='text-2xl my-[2.5rem] text-[rgba(10,46,101,.3)] font-medium border-b border-gray-200 pb-5'>Account Protection</h1>
                <div className='my-0 flex gap-[9rem] items-end'>
                  <div className='w-[50%]'>
                    <h1 className='font-[600] text-xl text-[#006340] mb-2'>Two-Factor Authentication</h1>
                    <p className='text-[14px] text-[#46695c]'>Protect your farmhouseclub account from unauthorized transactions using a software token.</p>
                  </div>
                  <label class="switch">
                    <input type="checkbox" value={myProfile && myProfile.has2fa} onChange={checkHandler}/>
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
              
              <div className='mt-[5rem]'>
                <h1 className='text-2xl my-[2.5rem] text-[rgba(10,46,101,.3)] font-medium border-b border-gray-200 pb-5'>Password</h1>
                <div className='my-0 flex gap-[9rem] items-end'>
                  <div className='w-[50%]'>
                    <h1 className='font-[600] text-xl text-[#006340] mb-2'>Update Password</h1>
                    <p className='text-[14px] text-[#46695c]'>Change your old password to a new one</p>
                  </div>
                    <p onClick={() => setChangePasswordModal(true)} className='text-[#006340] cursor-pointer'>Change Password</p>
                </div>
              </div>

              {changePasswordModal && 
              <div className='changePasswordModalBg'>
                <div className="changPasswordModal relative" style={{ textAlign:"start" }}>
                  <i className='ri-close-fill absolute top-3 right-5 cursor-pointer' onClick={(e) => setChangePasswordModal(false)}></i>
                  <div className='w-full my-5'>
                    <label className='block text-[16px] mb-1'>Old Password</label>
                    <input type="password" className='w-full outline-none px-2 py-1'/>
                  </div>
                  <div className='w-full my-5'>
                    <label className='block text-[16px] mb-1'>New Password</label>
                    <input type="password" className='w-full outline-none px-2 py-1'/>
                  </div>
                  <div className='w-full my-5'>
                    <label className='block text-[16px] mb-1'>Confirm Password</label>
                    <input type="password" className='w-full outline-none px-2 py-1'/>
                  </div>
                  {
                  loader ? <button className="bg-[#1AC888] w-full py-2 rounded-[6px] text-lg text-center"><i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i></button> 
                  : 
                  <button className='text-[#fff] text-sm bg-[#1AC888] w-full py-2 px-5 rounded-md' onClick={handlePasswordChange}>Change Password</button>
                  }
                </div>
              </div>
              }

            {/* <div className='my-2'>
              <label>Has 2-Factor Set Up</label>
              {myProfile && 
                myProfile.has2fa === false ? <p className='border border-gray-300 w-[50%] rounded-md px-2 py-1'>False</p> 
                : 
                <p className='border border-gray-300 w-[50%] rounded-md px-2 py-1'>True</p>
              }
            </div> */}
          </div>
          }
          
        </div>
    </div>
  )
}

export default UserProfile