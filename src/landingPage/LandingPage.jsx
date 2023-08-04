import logo from "../assets/images/Asset-2.-300x47.png"
import coin from "../assets/images/WhatsApp-Image-2023-08-03-at-11.47.37-AM-300x225.jpeg"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {
    const navigate = useNavigate()
  return (
    <div className='landingPage'>
        <nav className="flex items-center justify-between px-[90px] py-5">
            <a href="/" className="w-[12rem] flex items-center gap-1">
                <img src={logo} alt="" />
            </a>
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
            <button onClick={() => navigate("/login")} className="hover:bg-[#83B943] text-white py-2 px-7 border border-[#83B943] rounded-lg transition ease-in-out duration-700">Login</button>
        </nav>
        <main className="flex justify-between items-center px-[150px]">
            <div className="sm:w-full md:w-[55%] text-white">
                <h1 className="text-[40px] font-bold">Stake <span className="text-[#83B943]">AVDA tokens</span> in real world argricultural Projects</h1>
                <p className="mt-5 mb-8">The farmhouse club's AVDA token makes it easy to let your money work for you.</p>
                <button onClick={() => navigate("/register")} className="hover:bg-[#83B943] text-white py-2 px-7 border border-[#83B943] rounded-lg transition ease-in-out duration-700">Get Started</button>
            </div>
            <img src={coin} alt="" className="w-[30%]"/>
        </main>
        <footer className="flex justify-between items-center px-[90px] py-4">
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