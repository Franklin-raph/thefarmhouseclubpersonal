import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import logo from "../../assets/images/Asset-2.-300x47.png"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Dashboard = () => {

    const navigate = useNavigate()
    
    useEffect(() => {
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

  return (
    <div>
        <nav className="flex items-center justify-between px-[16px] py-5">
            <a href="/" className="w-[12rem] flex items-center gap-1">
                <img src={logo} alt="" />
            </a>
            <div className="toggler relative z-50">
                <i class="fa-solid fa-bars"></i>
                <i class="fa-solid fa-xmark"></i>
            </div>
            <ul className="flex items-center justify-between gap-[30px]">
                <li>
                    <a href="#">Dashboard</a>
                </li>
                <li>
                    <a href="#">Market</a>
                </li>
                <li>
                    <a href="#">Governance</a>
                </li>
            </ul>
            <div>
                <button className='border border-teal-500 py-1 px-2 rounded'>Connect Wallet</button>
                <i class="ri-user-3-line text-xl ml-3 p-3 bg-slate-500 rounded-full"></i>
            </div>
        </nav>
        <div className="balance">
            <p>Balance</p>
        </div>
    </div>
  )
}

export default Dashboard