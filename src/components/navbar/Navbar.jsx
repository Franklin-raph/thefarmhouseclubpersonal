import logo1 from "../../assets/images/Asset-2.-300x47.png"
import logo2 from "../../assets/images/thefarmhouseclublogo2.png.crdownload.png"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Navbar = () => {

    const navigate = useNavigate()
    
    useEffect(() => {
        // const nav = document.querySelector("nav ul")
        // const navOpen = document.querySelector(".fa-bars")
        // const navClose = document.querySelector(".fa-xmark")

        // navOpen.addEventListener("click", ()=>{
        //     nav.style.left = 0
        //     navClose.style.display = "block"
        //     navOpen.style.display = "none"
        // })

        // navClose.addEventListener("click", ()=>{
        //     nav.style.left = "-200%"
        //     navClose.style.display = "none"
        //     navOpen.style.display = "block"
        // })
    },[])

  return (
    <div>
        <nav className="flex items-center justify-between px-[16px] py-5">
            <a href="/" className="w-[12rem] flex items-center gap-1">
                <img src={logo1} alt="" className='logo1' />
                <img src={logo2} alt="" className='logo2' />
            </a>
            {/* <div className="toggler relative z-50">
                <i className="fa-solid fa-bars"></i>
                <i className="fa-solid fa-xmark"></i>
            </div> */}
            {/* <ul className="flex items-center justify-between gap-[30px]">
                <li>
                    <a href="/dashboard">Dashboard</a>
                </li>
                <li>
                    <a href="/markets">Market</a>
                </li>
                <li>
                    <a href="/governance">Governance</a>
                </li>
            </ul> */}
            {/* <li className="login-btn">
                <button onClick={() => navigate("/login")} className="hover:bg-[#83B943] text-white py-2 px-7 border border-[#83B943] rounded-lg transition ease-in-out duration-700">Login</button>
            </li> */}
            <button onClick={() => navigate("/login")} className="hover:bg-[#83B943] text-white py-2 px-7 border border-[#83B943] rounded-lg transition ease-in-out duration-700 relative z-40">Login</button>
        </nav>
    </div>
  )
}

export default Navbar