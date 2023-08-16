import React, { useState } from 'react'
import { useEffect } from "react"
import { Link, useNavigate, useParams, useLocation } from "react-router-dom"
import logo1 from "../../assets/images/Asset-2.-300x47.png"
import logo2 from "../../assets/images/thefarmhouseclublogo2.png.crdownload.png"

const LoggedInNav = ({walletAddress, fundAccount, setFundAccountModal, setWalletModal, changemode, mode}) => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    const [userModal, setUserModal] = useState(false)
    const [walletConnected, setWalletConnected] = useState(false)
    const [showCheckIcon, setShowCheckIcon] = useState(false)
    const [logOutLoader, setLogOutLoader] = useState(false)
    const checkIfWalletAddressIsFunded = localStorage.getItem("isWalletAddressFunded")
    const [locationName, setLocationName] = useState()
    const location = useLocation();
    // const {}
    
    useEffect(() => {
        console.log(location.pathname)
        if(location.pathname === "/dashboard"){
            setLocationName("Dashboard")
        }else if(location.pathname === "/markets"){
            setLocationName("Markets")
        }else if(location.pathname === "/governance"){
            setLocationName("Governance")
        }else if(location.pathname === "/swap"){
            setLocationName("Swap")
        }

        // document.querySelector(".navToggle").addEventListener("click", ()=>{
        //     document.querySelector(".togglingNav").classList.toggle("show-nav")
        // })
        // console.log(user)
        // if(user === null){
        //     navigate("/login")
        // }
        // if(user) {
        //     navigate("/dashboard")
        // }
        const nav = document.querySelector(".togglingNav")
        const navOpen = document.querySelector(".ri-menu-line")
        const navClose = document.querySelector(".ri-close-fill")

        console.log(nav, navOpen, navClose)

        navOpen.addEventListener("click", ()=>{
            nav.style.bottom = "8%"
            navClose.style.display = "block"
            navOpen.style.display = "none"
        })

        navClose.addEventListener("click", ()=>{
            nav.style.bottom = "-30%"
            navClose.style.display = "none"
            navOpen.style.display = "block"
        })
        checkTokenStatus()
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
    }

    async function checkTokenStatus(){
        console.log("Checking Token Status")
        const response = await fetch(`https://avda.pythonanywhere.com/api/v1/token-status/${user.access}`)
        const data = await response.json()
        if(!response.ok){
            localStorage.clear()
            navigate("/")
        }
    }

    function copyWalletAddress(){
        navigator.clipboard.writeText(user.public_key)
        setShowCheckIcon(true)
        setTimeout(()=>{setShowCheckIcon(false)},5000)
    }
// active color = 1AC888
  return (
    <div className="topnav">
         <nav className="flex items-center justify-between px-[16px] py-5 bg-[#F4F7FA] fixed w-full z-[2]">
            <a href="/" className="w-[12rem] flex items-center gap-1 logo-container">
                <img src={logo1} alt="" className='logo1' />
                <img src={logo2} alt="" className='logo2' />
            </a>
            <ul className="desktopLoggedInNav flex items-start gap-[30px] pl-5 fixed flex-col top-[11%] bg-[#F4F7FA] left-0 h-screen w-[15%] pt-[3rem]">
                <p className='mb-5 text-xl font-bold text-[#888]'>Hi, <span>{user && user.user.first_name}</span> </p>
                <li className='flex items-center  gap-2 text-[#46695c]'>
                    <i class="ri-dashboard-3-line text-xl"></i>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className='flex items-center gap-2 text-[#46695c]'>
                    <i class="ri-store-2-fill text-xl"></i>
                    <Link to="/markets">Market</Link>
                </li>
                <li className='flex items-center gap-2 text-[#46695c]'>
                    <i class="ri-government-line text-xl"></i>
                    <Link to="/governance">Governance</Link>
                </li>
                <li className='flex items-center gap-2 text-[#46695c]'>
                    <i class="ri-exchange-funds-line text-xl"></i>
                    <Link to="/swap">Swap</Link>
                </li>
                <div className='fixed bottom-0 pb-3'>
                    {mode === "lightMode" ? 
                    <li className='flex items-center gap-2 text-[#46695c] mb-3 cursor-pointer' onClick={changemode}>
                        <i className="ri-moon-line text-xl"></i>
                        <p className='text-sm'>Dark Mode</p>
                    </li>
                    : 
                    <li className='flex items-center gap-2 text-[#46695c] mb-3 cursor-pointer' onClick={changemode}>
                        <i class="ri-sun-line  text-xl"></i>
                        <p className='text-sm'>Light Mode</p>
                    </li>
                    }
                    {logOutLoader ? <i className="fa-solid fa-gear fa-spin mb-4 text-lg"></i> : 
                    <li className='flex items-center gap-2 text-[#46695c] cursor-pointer' onClick={logoutUser}>
                        <i class="ri-logout-box-line text-xl"></i>
                        <p className='text-sm'>Logout</p>
                    </li>
                    }
                </div>
            </ul>

            <ul className="mobileNavLoggedInNav">
                {/* <p className='mb-5'>Hi, <span>{user && user.user.first_name}</span> </p> */}
                <li className='text-center flex items-center flex-col gap-2 text-[#46695c]'>
                    <Link to="/dashboard">
                        <i class="ri-dashboard-3-line text-xl"></i>
                    </Link>
                    <p>Dashboard</p>
                </li>
                <li className='text-center flex items-center flex-col gap-2 text-[#46695c]'>
                    <Link to="/markets">
                        <i class="ri-store-2-fill text-xl"></i>
                    </Link>
                    <p>Market</p>
                </li>
                <li className='text-center flex items-center flex-col gap-2 text-[#46695c]'>
                    <Link to="/swap">
                        <i class="ri-exchange-funds-line text-xl"></i>
                    </Link>
                    <p>Swap</p>
                </li>
                <li className='text-center flex items-center flex-col gap-2 text-[#46695c]'>
                    <Link to="/governance">
                        <i class="ri-government-line text-xl"></i>
                    </Link>
                    <p>Governance</p>
                </li>
                
                <div className='flex gap-2 togglingNav' >
                    {mode === "lightMode" ? 
                    <li className='flex items-center flex-col gap-2 text-[#46695c] cursor-pointer' onClick={changemode}>
                        <i className="ri-moon-line text-xl"></i>
                        <p className='text-sm'>Dark Mode</p>
                    </li>
                    : 
                    <li className='flex items-center flex-col gap-2 text-[#46695c] cursor-pointer' onClick={changemode}>
                        <i class="ri-sun-line  text-xl"></i>
                        <p className='text-sm'>Light Mode</p>
                    </li>
                    }
                    {logOutLoader ? <i className="fa-solid fa-gear fa-spin mb-4 text-lg"></i> : 
                    <li className='flex items-center flex-col gap-2 text-[#46695c] cursor-pointer' onClick={logoutUser}>
                        <i class="ri-logout-box-line text-xl"></i>
                        <p className='text-sm'>Logout</p>
                    </li>
                    }
                </div>

                {/* <i class="ri-phone-line text-xl "></i> */}
                <div className="togglers">
                    <i class="ri-menu-line"></i>
                    <i class="ri-close-fill"></i>
                </div>
                
                
            </ul>
            <p className='font-bold text-[#888] text-[18px]'> {locationName} </p>
            <div>
                {/* {!checkIfWalletAddressIsFunded ? 
                    <button className='py-2 px-4 rounded-[6px] bg-[#83B943] text-white cursor-pointer' onClick={()=> setWalletModal(true)}>
                        Connect
                    </button>
                : 
                    <button className='py-2 px-4 rounded-[6px] bg-[#83B943] text-white cursor-pointer' onClick={()=> setFundAccountModal(true)}>
                        {user && user.public_key.slice(0, 4)}...${user.public_key.slice(-4)}
                    </button>
                } */}
                <i className="ri-user-3-line text-lg ml-3 p-2 bg-slate-500 rounded-full text-white cursor-pointer" onClick={()=> setUserModal(!userModal)}></i>
            </div>
        </nav>
        {userModal && 
            <div className="userModal bg-slate-200 fixed right-4 rounded-md p-2 z-10 mt-[5rem]">
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
            </div>
        }
    </div>
  )
}

export default LoggedInNav