import React, { useEffect, useState } from 'react'
import LoggedInNav from '../../components/navbar/LoggedInNav'
import { useParams } from 'react-router-dom'

const UserProfile = ({baseUrl}) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const [showProfile, setShowProfile] = useState(true)
  const [show2Fa, setShow2Fa] = useState(false)

    const {id} = useParams()
    useEffect(()=> {
      getUserProfile()
    },[])


    async function getUserProfile(){
      const response = await fetch(`${baseUrl}/profile-update/${id}`,{
        headers:{
          Authorization: `Bearer ${user.access}`
        }
      })
      const data = await response.json()
      console.log(data)
    }
  return (
    <div>
        <LoggedInNav />
        <div className="userProfileDetailsContainer">
          <div className='userProfileNav border-r-2 border-gray-500'>
            <p className='my-5 cursor-pointer' onClick={()=> {
              setShowProfile(true)
              setShow2Fa(false)
            }}>My Profile</p>
            <p className='my-5 cursor-pointer' onClick={()=> {
              setShowProfile(false)
              setShow2Fa(true)
            }}>Two-Factor Authentication</p>
          </div>
          {showProfile && 
            <div className='userProfileDetails pl-5'>
              <div className='my-3'>
                <label>First Name</label>
                <p className='border border-gray-300 w-[50%] rounded-md px-2 py-1'>{user && user.user.first_name}</p>
              </div>
              <div className='my-3'>
                <label>Last Name</label>
                <p className='border border-gray-300 w-[50%] rounded-md px-2 py-1'>{user && user.user.last_name}</p>
              </div>
              <div className='my-3'>
                <label>Username</label>
                <p className='border border-gray-300 w-[50%] rounded-md px-2 py-1'>{user && user.user.username}</p>
              </div>
              <div className='my-3'>
                <label>Email</label>
                <p className='border border-gray-300 w-[50%] rounded-md px-2 py-1'>{user && user.user.email}</p>
              </div>
              <div className='my-3'>
                <label>Public Key</label>
                <p className='border border-gray-300 w-[62%] rounded-md px-2 py-1'>{user && user.public_key}</p>
              </div>
            </div>
          }

          {show2Fa && 
            <div className='pl-5 py-5'>
              <h3 className='mb-3'>Set Up your two factor Authentication</h3>
              <div>
                <div>
                  <label htmlFor="Email" className='block'>Email</label>
                  <input type="email" placeholder='email' className='border border-gray-500 outline-none p-1' />
                </div>
                <div className='mt-5'>
                  <label htmlFor="Email" className='block'>Password</label>
                  <input type="password" placeholder='******' className='border border-gray-500 outline-none p-1' />
                </div>
                <button className='mt-3 bg-[#84b943f7] text-white py-1 px-4 rounded-sm'>Submit</button>
              </div>
            </div>
          }
          
        </div>
    </div>
  )
}

export default UserProfile