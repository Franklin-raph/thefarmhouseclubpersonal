import React, { useState } from 'react'
import logo from "../../assets/images/Asset-2.-300x47.png"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import stellar from "../../assets/images/Stellar_Symbol.png"

const LoggedInNav = ({fundAccount, setFundAccountModal}) => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    const [userModal, setUserModal] = useState(false)
    const [walletModal, setWalletModal] = useState(false)
    const [walletConnected, setWalletConnected] = useState(false)
    const [showCheckIcon, setShowCheckIcon] = useState(false)
    const [logOutLoader, setLogOutLoader] = useState(false)
    // console.log(user.refresh)
    
    useEffect(() => {
        // console.log(user)
        // if(user === null){
        //     navigate("/login")
        // }
        // if(user) {
        //     navigate("/dashboard")
        // }
        const nav = document.querySelector("nav ul")
        const navOpen = document.querySelector(".fa-bars")
        const navClose = document.querySelector(".fa-xmark")

        navOpen.addEventListener("click", ()=>{
            nav.style.left = 0
            navClose.style.display = "block"
            navOpen.style.display = "none"
        })

        navClose.addEventListener("click", ()=>{
            nav.style.left = "-200%"
            navClose.style.display = "none"
            navOpen.style.display = "block"
        })
    },[])

    async function logoutUser(){
        setLogOutLoader(true)
        console.log(JSON.stringify({refresh:user.refresh}))
        const response = await fetch("https://avda.pythonanywhere.com/api/v1/logout/", {
            method:"POST",
            body: JSON.stringify({refresh:user.refresh}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await response.json()
        if(response.ok){
            localStorage.clear()
            navigate("/")
        }
        console.log(data)
    }

    function copyWalletAddress(){
        navigator.clipboard.writeText(user.public_key)
        setShowCheckIcon(true)
        setTimeout(()=>{setShowCheckIcon(false)},5000)
    }

  return (
    <div>
         <nav className="flex items-center justify-between px-[16px] py-5">
            <a href="/" className="w-[12rem] flex items-center gap-1">
                <img src={logo} alt="" />
            </a>
            <div className="toggler relative z-50">
                <i className="fa-solid fa-bars"></i>
                <i className="fa-solid fa-xmark"></i>
            </div>
            <ul className="flex items-center justify-between gap-[30px]">
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/markets">Market</Link>
                </li>
                <li>
                    <Link to="/governance">Governance</Link>
                </li>
            </ul>
            <div>
                {!fundAccount ? 
                    <button className='py-2 px-4 rounded-[6px] bg-[#83B943] text-white cursor-pointer' onClick={()=> setWalletModal(!walletModal)}>
                        Connect
                    </button>
                : 
                    <button className='py-2 px-4 rounded-[6px] bg-[#83B943] text-white cursor-pointer' onClick={()=> setFundAccountModal(true)}>
                        Fund Account
                    </button>
                }
                
                {/* {user &&
                    <button className='border border-teal-500 py-1 px-2 rounded'>
                        {user.public_key.slice(0, 9)}...${user.public_key.slice(-9)}
                    </button>
                } */}
                <i className="ri-user-3-line text-lg ml-3 p-2 bg-slate-500 rounded-full text-white cursor-pointer" onClick={()=> setUserModal(!userModal)}></i>
            </div>
        </nav>
        {userModal && 
            <div className="userModal bg-slate-200 fixed right-4 rounded-md p-2 z-10">
                <div className='flex items-center gap-2 cursor-pointer'>
                    <i className="ri-user-3-line ml-3 py-1 px-2  bg-slate-500 rounded-full text-white"></i>
                    {user  && <p className='text-sm' onClick={()=> navigate(`/myprofile/${user && user.user.id}`)}>My Profile</p>}
                </div>
                <div className='flex items-center gap-2 my-3 cursor-pointer'>
                    <i className="ri-key-line ml-3 py-1 px-2  bg-slate-500 rounded-full text-white"></i>
                    {user && <p className='text-sm'>{user.public_key.slice(0, 9)}...{user.public_key.slice(-9)}</p>}
                    {
                        !showCheckIcon ? <i className="ri-file-copy-line ml-3 py-1 px-2 text-gray-400 bg-white rounded-full" onClick={copyWalletAddress}></i>
                        :
                        <i class="ri-checkbox-circle-line ml-3 py-1 px-2 text-green-500 bg-white text-lg rounded-full"></i>
                    }
                    
                </div>
                <div className='flex items-center gap-2 cursor-pointer pb-2'>
                    <i className="ri-moon-line ml-3 py-1 px-2  bg-slate-500 rounded-full text-white"></i>
                    <p className='text-sm'>Dark Mode</p>
                </div>
                {logOutLoader ? <i className="fa-solid fa-gear fa-spin mb-4 text-lg"></i> : 
                <div className='flex items-center gap-2 cursor-pointer border-t-[1px] border-slate-300 pt-2' onClick={logoutUser}>
                    <i class="ri-logout-box-line ml-3 py-1 px-2 bg-slate-500 rounded-full text-white"></i>
                    <p className='text-sm'>Logout</p>
                </div>
                }
            </div>
        }

        {walletModal && 
            <div className="walletModal bg-slate-200 fixed right-16 rounded-md p-4 w-[15%]">
                <div className='flex item-center gap-2 mb-3 cursor-pointer' onClick={()=>setWalletConnected(!walletConnected)}>
                    {/* <i class="ri-wallet-line"></i> */}
                    <img src={stellar} alt="" width={"12%"} />
                    <p className='font-bold text-md'>Stellar</p>
                </div>
                <p className='border-t-[1px] border-slate-300 pt-2 cursor-pointer'>Disconnect my wallet</p>
            </div>
        }
    </div>
  )
}

export default LoggedInNav