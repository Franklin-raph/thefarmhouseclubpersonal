import React, { useEffect } from 'react'
import LoggedInNav from '../../components/navbar/LoggedInNav'
import { useParams } from 'react-router-dom'

const UserProfile = ({baseUrl}) => {
  const user = JSON.parse(localStorage.getItem("user"))
  console.log(user.access)
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
          <div className='userProfileNav border-r-4 border-indigo-500'>
            <p>My Profile</p>
            <p>Two-Factor Authentication</p>
          </div>
          <div className='userProfileDetails pl-5'>
            <div>
              <label>First Name</label>
              <p>{user && user.user.first_name}</p>
            </div>
            <div>
              <label>Last Name</label>
              <p>{user && user.user.last_name}</p>
            </div>
            <div>
              <label>Username</label>
              <p>{user && user.user.username}</p>
            </div>
            <div>
              <label>Email</label>
              <p>{user && user.user.email}</p>
            </div>
            <div>
              <label>Public Key</label>
              <p>{user && user.public_key}</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default UserProfile