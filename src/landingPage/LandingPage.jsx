import { useEffect } from "react"
import coin1 from "../assets/images/Coin1.png"
import coin2 from "../assets/images/Coin2.png"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/navbar/Navbar"

const LandingPage = () => {
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
    <div className='landingPage'>
        <Navbar />

        <main className="flex justify-between items-center px-[100px]">
            <div className="md:w-[100%] w-full text-white text-div">
                <h1 className="text-[37px] font-bold">Earn <span className="text-[#83B943]">AVDA <br /> tokens</span> from real <br /> world argricultural Projects</h1>
                <p className="mt-5 mb-8">The farmhouse club's AVDA token makes it easy to let your money work for you.</p>
                <button onClick={() => navigate("/register")} className="hover:bg-[#83B943] text-white py-2 px-7 border border-[#83B943] rounded-lg transition ease-in-out duration-700">Get Started</button>
            </div>
            <div className="w-full relative top-[-42px] coins-div">
                <img src={coin1} alt="" className="w-[50%] mx-auto coin1 relative z-20"/>
                <img src={coin2} alt="" className="w-[40%] ml-auto absolute top-[100px] right-0 coin2 z-10"/>
            </div>
        </main>
        <footer className="flex justify-between items-center px-[16px] py-4">
            <ul className="flex justify-between items-center gap-5">
                <li>
                    <a href="#">Terms</a>
                </li>
                <li>
                    <a href="#">Privacy</a>
                </li>
                <li>
                    <a href="#">Docs</a>
                </li>
                <li>
                    <a href="#">FAQS</a>
                </li>
                <li>
                    <a href="#">Feedback</a>
                </li>
            </ul>
            <ul className="flex justify-between items-center gap-5">
                <li>
                    <a href="#"><i class="ri-twitter-fill"></i></a>
                </li>
                <li>
                    <a href="#"><i class="ri-discord-fill"></i></a>
                </li>
                <li>
                    <a href="#"><i class="ri-instagram-fill"></i></a>
                </li>
                <li>
                    <a href="#"><i class="ri-linkedin-box-fill"></i></a>
                </li>
            </ul>
        </footer>
    </div>
  )
}

export default LandingPage