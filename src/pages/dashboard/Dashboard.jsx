import {useEffect, useState} from 'react'
import LoggedInNav from '../../components/navbar/LoggedInNav'
import AVDACoin from "../../assets/images/advatoken.png"
import avda from "../../assets/images/WhatsApp-Image-2023-08-03-at-11.47.37-AM-300x225.jpeg"
import Navbar from '../../components/navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import TextTransition, { presets } from 'react-text-transition';
import PaystackPop from "@paystack/inline-js"
import SuccessAlert from '../../components/alert/SuccessAlert'
import logo from "../../assets/images/thefarmhouseclublogo2.png.crdownload.png"
import cardImage1 from '../../assets/images/cover.jpeg'
import LoaderComponent from '../../components/loaderComponent/LoaderComponent'
import FundAccountModal from '../../components/fundAccountModal/FundAccountModal'

const Dashboard = ({changemode, mode, baseUrl}) => {

  const user = JSON.parse(localStorage.getItem("user"))
  const [fundAccountModal, setFundAccountModal] = useState(false)
  const [loadDashboardContent, setLoadDashboardContent] = useState(false)
  const [loadFundButton, setLoadFundButton] = useState(false)
  const [amount, setAmount] = useState("")
  const TEXTS = [
                  'Top Up Your Wallet for Exciting Ventures!', 
                  'Ignite Your Investments: Top Up Your Wallet and Grow!',
                  'Dive into Exclusive Agribusiness Investment Opportunities',
                  'Uncover Top-tier Agribusiness Ventures for Your Portfolio'
                ];

  const BOLDTEXTS = [
                  'Your Journey Starts Here',
                  'Low-Risk, High-Yield Agri Investments'
                ];

  const [error, setError] = useState("")
  const [index, setIndex] = useState(0);
  const [verifyPaymentModal, setVerifyPaymentModal] = useState(false)
  const [success, setSuccess] = useState(false)
  const [displayDashboardInfo, setDisplayDashboardInfo] = useState(false)
  const [accountBalanceInfo, setAccountBalanceInfo] = useState()
  const [stakedProjectsArray, setStakedProjectsArray] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if(!user) navigate("/")

    if(user){
      getAccountSummary()
      getMyStackedProject()
    }
    
    // Function for the changing text
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      5000, // every 5 seconds
    );
    return () => clearTimeout(intervalId);
  },[])

  async function getAccountSummary(){
    setLoadDashboardContent(true)
    const response = await fetch(`${baseUrl}/myaccount-balance/`,{
      method:"POST",
      body: JSON.stringify({public_key:user.public_key}),
      headers:{
        Authorization: `Bearer ${user.access}`,
        "Content-Type":"application/json"
      }
    })
    if(response) {
      setLoadDashboardContent(false)
    }

    const data = await response.json()
    if(response.ok){
      setDisplayDashboardInfo(data)
      setAccountBalanceInfo(data)
    }
  }

  async function handleVerifyAccountFund(reference, amount){
    setLoadFundButton(true)
    const response = await fetch(`${baseUrl}/create-funded-account/`,{
      method:"POST",
      body: JSON.stringify({reference:reference, amount:amount, public_key:user.public_key}),
      headers:{
        Authorization: `Bearer ${user.access}`,
        "Content-Type":"application/json"
      }
    })
    if(response){
      setVerifyPaymentModal(false)
      setLoadFundButton(false)
    }
    if(response.ok) {
      setSuccess(true)
      getAccountSummary()
    }
    const data = await response.json()
  }

  function payWithPayStack(){
    const payStack = new PaystackPop()
    console.log(payStack)
    payStack.newTransaction({
      key:"pk_test_12420d20e0b354e9670266456195a13f3a03ec68",
      amount:amount * 100,
      email:user.user.email,
      onSuccess(transaction){
        setFundAccountModal(false)
        setVerifyPaymentModal(true)
        handleVerifyAccountFund(transaction.reference, amount)
        console.log(transaction)
      },
      oncancel(){
        console.log("Failed Transaction")
      }
    })
  }

  async function getMyStackedProject(){
    const response = await fetch("https://app1.thefarmhouseclub.io/api/v1/my-investments/",{
      headers:{
        Authorization: `Bearer ${user.access}`
      }
    })
    const data = await response.json()
    setStakedProjectsArray(data)
    console.log(response, data)
  }

  return (
    <div className='h-full pb-[3rem]'>
      <div className="balanceContainer">
        <div className="balances"></div>
        <div className="balances"></div>
        <div className="balances"></div>
      </div>
        <LoggedInNav setFundAccountModal={setFundAccountModal} changemode={changemode} mode={mode}/>
        {loadDashboardContent && 
          <div className='dashboardContentLoaderBg'>
              <LoaderComponent />
          </div>
          }
          
        {accountBalanceInfo &&
            <div className='px-[9rem] pt-[100px] relative left-[7%] top-[50%]' id='dashboard'>
                <h3 className='text-2xl font-[600] text-[#888] mb-5 pl-1' style={{ borderLeft:"4px solid #888" }}>ACCOUNTS</h3>
                <div className='gap-10 grid grid-cols-1 lg:grid-cols-3'>
                    {accountBalanceInfo.map(accountInfo => (
                      <div className='relative border border-slate-600 flex items-center justify-between gap-10 p-5 rounded-lg pb-9 dashboardInfo' style={{ boxShadow:"0 0 20px #ccc" }}>
                        {/* {accountInfo.asset_code === "AVDA" && } */}
                        {accountInfo.asset_code === "" ? <img src="https://cdn.lumenswap.io/obm/xlm.png" className='rounded-full' alt="" /> : <img src={avda} className='w-[75px] rounded-full' alt="" />}
                        <div>
                        {accountInfo.asset_code === "" ?<p className='text-lg'>XLM</p> : <p className='text-lg'>{accountInfo.asset_code}</p> }
                        {accountInfo.asset_code === "" ? <h3 className='font-bold text-xl'>{(accountInfo.balance)}</h3> : <h3 className='font-bold text-xl'>{(+accountInfo.balance).toFixed(2)}</h3>}
                          <p className='absolute right-2 bottom-3'>{user.public_key.slice(0, 4)}...{user.public_key.slice(-4)}</p>
                        </div>
                      </div>
                    ))}
                    <div onClick={()=>navigate("/swap")} className='border border-slate-600 flex items-center justify-center border-dashed cursor-pointer p-5 rounded-lg text-center dashboardInfo' style={{ boxShadow:"0 0 20px #ccc" }}>
                      <div className='flex items-center justify-center gap-3'>
                        <i class="ri-add-circle-fill text-[#64748B] text-[50px]"></i>
                        <p>Account Top Up</p>
                      </div>
                    </div>
                </div>
                <h3 className='text-2xl font-[600] text-[#888] mb-5 mt-[90px] pl-1' style={{ borderLeft:"4px solid #888" }}>MY STAKED PROJECTS</h3>
                  {stakedProjectsArray && stakedProjectsArray.length <= 0 &&
                  <div className='text-center my-[6em] flex-col'>
                    <h4 className='text-center text-3xl text-gray-500'>Stake some AVDA</h4>
                    <button className='mt-2 py-1 px-3 bg-[#1AC888] rounded-md text-white' onClick={()=> navigate("/markets")}>Stake Now</button>
                  </div>
                  }
                <div className="marketCardContainer relative w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center content-center">
                  {stakedProjectsArray && stakedProjectsArray.map((project, index) => (
                    <div key={index} className="marketCard w-full cursor-pointer mt-6" onClick={()=> navigate(`/marketinfo/${project.id}`)}>
                        <div className="body">
                          <div className="author flex justify-between items-center px-4">
                            <img src={logo} alt="" width={"18%"} className='mt-[-1.8rem] bg-[#262626] rounded-full p-2'/>
                            {/* <p className='text-sm mt-3 mr-2 font-[500]'>{project.author}</p> */}
                          </div>
                           <h2 className='font-bold text-lg pl-3 mt-2 mb-5'>{project.project_name}</h2>
                          <div className='footer flex items-center justify-between mt-9 px-4 pb-4 gap-3'>
                            <div className='py-3 w-full p-2 rounded-[5px]'>
                              <p className='font-bold'>TVS</p>
                              <h2 className='font-bold text-xl'>{project.tvl}</h2>
                            </div>
                            <div className='py-3 w-full p-2 rounded-[5px]'>
                              <p className='font-bold'>APY</p>
                              <h2 className='font-bold text-xl'>{project.apy}</h2>
                            </div>
                          </div>
                        </div>
                    </div>
                  ))}
                </div>
            </div>
        }
        
        {!displayDashboardInfo &&
          <div className='h-[100vh]'>
            <div className='py-2 px-5 relative left-[7%] top-[10%] flex justify-center items-center flex-col' id='dashboard'>
              <div className='flex flex-col justify-center items-center text-center w-[80%] mx-auto mt-[6rem]'>
                <div className="connectWalletBox bg-[#eee] w-full rounded-[10px] py-5 mt-9" style={{ boxShadow:"0 0 25px #ccc" }}>
                    <img src={AVDACoin} alt="" style={{ width:"20%", margin:"-7rem 0 0 auto" }}/>
                    <div className='text-start px-9'>
                      <h3 className='font-bold text-[25px] text-[#888]' style={{ textTransform:"uppercase" }}>
                        <TextTransition springConfig={presets.wobbly}>{BOLDTEXTS[index % BOLDTEXTS.length]}</TextTransition>
                      </h3>
                      <p className='mt-5 text-xl changing-text'>
                        <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
                      </p>
                      <button className='bg-[#39A971] text-white px-4 py-2 rounded-md flex justify-center items-center mt-4' onClick={()=> navigate("/swap")}>
                        <i class="ri-add-fill mr-3 text-2xl"></i>
                        <p className='text-xl'>Fund Wallet</p>
                      </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        }

        {error &&
            <div className="errorModalBg">
                <div className="failureModal" style={{ position:"relative" }}>
                    <i className="ri-close-circle-line cursor-pointer" style={{ fontSize:"20px", position:"fixed", top:"40%", right:"31%" }} onClick={()=> setError(false)}></i>
                    <i className="ri-close-circle-line text-red-600"></i>
                    <p>{error}</p>
                </div>
            </div>
        }

        {fundAccountModal && <FundAccountModal loadFundButton={loadFundButton} setAmount={setAmount} user={user} payWithPayStack={payWithPayStack} setFundAccountModal={setFundAccountModal}/>}

        {verifyPaymentModal && 
          <div className='verifyPaymentModdalBg'>
            <div className="verifyPaymentModal">
              <i className="fa-solid fa-gear fa-spin" style={{ color:"#1AC888", fontSize:"2rem", marginBottom:"20px" }}></i>
              <p>Verifying Payment please wait</p>
            </div>
          </div>
        }

        {success && 
          <SuccessAlert success={"Payment has been successfully verified"} setSuccess={setSuccess}/>
        }
    </div>
  )
}

export default Dashboard