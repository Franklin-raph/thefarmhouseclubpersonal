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
  const navigate = useNavigate()

    const {id} = useParams()
    useEffect(()=> {
      console.log(user)
      if(!user) navigate("/login")
      getUserProfile()
    },[])


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

  return (
    <div>
        <LoggedInNav />
        <div className="userProfileDetailsContainer">
          <div className='userProfileNav border-r-2 border-gray-500'>
            <p className='my-5 cursor-pointer' onClick={()=> {
              setShow2Fa(false)
              setShowProfile(true)
              setAccountUpdate(false)
            }}>My Profile</p>
            <p className='my-5 cursor-pointer' onClick={()=> {
              setShow2Fa(false)
              setShowProfile(false)
              setAccountUpdate(true)
            }}>Account Update</p>
            <p className='my-5 cursor-pointer' onClick={()=> {
              setShow2Fa(true)
              setShowProfile(false)
              setAccountUpdate(false)
            }}>Two-Factor Authentication</p>
          </div>
          {showProfile && 
            <div className='userProfileDetails pl-5'>
              <div className='my-3'>
                <label>First Name</label>
                <p className='border border-gray-300 w-[50%] rounded-md px-2 py-1'>{myProfile && myProfile.first_name}</p>
              </div>
              <div className='my-3'>
                <label>Last Name</label>
                <p className='border border-gray-300 w-[50%] rounded-md px-2 py-1'>{myProfile && myProfile.last_name}</p>
              </div>
              <div className='my-3'>
                <label>Username</label>
                <p className='border border-gray-300 w-[50%] rounded-md px-2 py-1'>{myProfile && myProfile.username}</p>
              </div>
              <div className='my-3'>
                <label>Email</label>
                <p className='border border-gray-300 w-[50%] rounded-md px-2 py-1'>{myProfile && myProfile.email}</p>
              </div>
              <div className='my-2'>
                <label>Has 2-Factor Set Up</label>
                {myProfile && 
                  myProfile.has2fa === false ? <p className='border border-gray-300 w-[50%] rounded-md px-2 py-1'>False</p> 
                  : 
                  <p className='border border-gray-300 w-[50%] rounded-md px-2 py-1'>True</p>
                }
              </div>
              <div className='my-3'>
                <label>Public Key</label>
                <p className='border border-gray-300 w-[62%] rounded-md px-2 py-1'>{user && user.public_key}</p>
              </div>
            </div>
          }

          {showAccountUpdate && 
            <div className='userProfileDetails pl-5'>
              <div className='my-3'>
                <label className='block'>First Name</label>
                <input type="text" className='border border-gray-300 w-[62%] rounded-md px-2 py-1 outline-none'/>
              </div>
              <div className='my-3'>
                <label className='block'>Last Name</label>
                <input type="text" className='border border-gray-300 w-[62%] rounded-md px-2 py-1 outline-none'/>
              </div>
              <div className='my-3'>
                <label className='block'>State of Residence</label>
                <input type="text" className='border border-gray-300 w-[62%] rounded-md px-2 py-1 outline-none'/>
              </div>
              <div className='my-3'>
                <label className='block'>Local Government Area Of Origin</label>
                <input type="text" className='border border-gray-300 w-[62%] rounded-md px-2 py-1 outline-none'/>
              </div>
              <div className='my-3'>
                <label className='block'>Marital Status</label>
                <input type="text" className='border border-gray-300 w-[62%] rounded-md px-2 py-1 outline-none'/>
              </div>
              <div className='my-3'>
                <label className='block'>Local Government Area Of Residence</label>
                <input type="text" className='border border-gray-300 w-[62%] rounded-md px-2 py-1 outline-none'/>
              </div>
              <button className='mt-3 bg-[#84b943f7] text-white py-1 px-4 rounded-sm'>Update</button>
            </div>
          }

          {show2Fa && 
            <div className='pl-5 py-5'>
              <h3 className='mb-5'>Set Up your two factor Authentication</h3>
              {error && <p className='text-white bg-red-400 p-2 inline'>{error}</p>}
              {success && <p className='text-white bg-green-400 p-2 inline'>{success}</p>}
              <div className='mt-5'>
                <div>
                  <label htmlFor="Email" className='block'>Email</label>
                  <input type="email" placeholder='email' value={email} onChange={(e)=> setEmail(e.target.value)} className='border border-gray-300 w-[62%] rounded-md px-2 py-1 outline-none' />
                </div>
                <div className='mt-5'>
                  <label htmlFor="Email" className='block'>Password</label>
                  <input type="text" placeholder='******'  value={password} onChange={(e)=> setPassword(e.target.value)} className='border border-gray-300 w-[62%] rounded-md px-2 py-1 outline-none' />
                </div>
                {loader ? <button className='my-4 bg-[#84b943f7] text-white py-1 px-4 rounded-sm text-lg cursor-disabled'> <i className="fa-solid fa-gear fa-spin"></i> </button> : <button className='mt-3 bg-[#84b943f7] text-white py-1 px-4 rounded-sm' onClick={activateTwoFactorAuth}>Submit</button>}
                
              </div>
            </div>
          }
          
        </div>
    </div>
  )
}

export default UserProfile