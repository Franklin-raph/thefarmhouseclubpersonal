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

const Dashboard = ({changemode, mode, baseUrl}) => {

  const user = JSON.parse(localStorage.getItem("user"))

  const [walletModal, setWalletModal] = useState(false)
  const [fundAccountModal, setFundAccountModal] = useState(false)
  const [loadDashboardContent, setLoadDashboardContent] = useState(false)
  const [fundAccount, setFundAccount] = useState(false)
  const [openBankTransfer, setOpenBankTransfer] = useState(false)
  const [openCryptoTransfer, setOpenCryptoTransfer] = useState(false)
  const [openBankInstrumentsTransfer, setOpenInstrumentsTransfer] = useState(false)
  const [isWalletAddressFunded, setIsWalletAddressFunded] = useState(false)
  const [amount, setAmount] = useState("")
  const [public_key, setPublicKey] = useState(user.public_key)
  const [loadFundButton, setLoadFundButton] = useState(false)
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

  const navigate = useNavigate()

  useEffect(() => {
    if(!user) navigate("/")

    if(user){
      getAccountSummary()
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
    const response = await fetch(`${baseUrl}/create-funded-account/`,{
      method:"POST",
      body: JSON.stringify({reference:reference, amount:amount, public_key:user.public_key}),
      headers:{
        Authorization: `Bearer ${user.access}`,
        "Content-Type":"application/json"
      }
    })
    if(response)setVerifyPaymentModal(false)
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

  const stakedProjectsArray = [
    {
      projectName:"Farm House Club",
      author:"Glory",
      tvl:"$1.03M",
      apy:"3.2%"
    },
    {
      projectName:"Farm House Club",
      author:"Frank",
      tvl:"$999T",
      apy:"99.9%"
    },
    {
      projectName:"Farm House Club",
      author:"Emma",
      tvl:"$1.03M",
      apy:"3.2%"
    },
    {
      projectName:"Farm House Club",
      author:"John",
      tvl:"$1.03M",
      apy:"3.2%"
    }
  ]

  return (
    <div className='h-full pb-[3rem]'>
      <div className="balanceContainer">
        <div className="balances"></div>
        <div className="balances"></div>
        <div className="balances"></div>
      </div>
        <LoggedInNav fundAccount={fundAccount} setFundAccountModal={setFundAccountModal} setWalletModal={setWalletModal} changemode={changemode} mode={mode}/>
        {loadDashboardContent && 
          <div className='dashboardContentLoaderBg'>
            <div className='bg-white p-3'>
              <p>Loading...</p>
            </div>
          </div>
          }
          
        {accountBalanceInfo &&
            <div className='px-[9rem] pt-[100px] relative left-[7%] top-[50%]' id='dashboard'>
                <h3 className='text-2xl font-[600] text-[#888] mb-5 pl-1' style={{ borderLeft:"4px solid #888" }}>ACCOUNTS</h3>
                <div className='gap-10 grid grid-cols-1 lg:grid-cols-3'>
                    {accountBalanceInfo.map(accountInfo => (
                      <div className='relative border border-slate-600 flex items-center justify-between gap-10 p-5 rounded-lg relative pb-9 dashboardInfo' style={{ boxShadow:"0 0 20px #ccc" }}>
                        {accountInfo.asset_code === "AVDA" && <i onClick={()=>setFundAccountModal(true)} class="ri-add-circle-fill absolute text-[#64748B] cursor-pointer top-[-10%] right-[-5%] text-3xl"></i>}
                        {accountInfo.asset_code === "" ? <img src="https://cdn.lumenswap.io/obm/xlm.png" className='rounded-full' alt="" /> : <img src={avda} className='w-[75px] rounded-full' alt="" />}
                        <div>
                        {accountInfo.asset_code === "" ?<p className='text-lg'>XLM</p> : <p className='text-lg'>{accountInfo.asset_code}</p> }
                          <h3 className='font-bold text-xl'>{accountInfo.balance}</h3>
                          <p className='absolute right-2 bottom-3'>{user.public_key.slice(0, 4)}...{user.public_key.slice(-4)}</p>
                        </div>
                      </div>
                    ))}
                    {/* <div className='border border-slate-600 flex items-center justify-between gap-10 p-5 rounded-lg pb-9 relative dashboardInfo' style={{ boxShadow:"0 0 20px #ccc" }}>
                      
                      <div>
                        <p className='text-lg'>AVDA</p>
                        <h3 className='font-bold text-xl'>900</h3>
                        <p className='absolute right-2 bottom-3'>{user.public_key.slice(0, 4)}...{user.public_key.slice(-4)}</p>
                      </div>
                    </div> */}
                </div>

                <h3 className='text-2xl font-[600] text-[#888] mb-5 mt-[90px] pl-1' style={{ borderLeft:"4px solid #888" }}>MY STAKED PROJECTS</h3>
                <div className="marketCardContainer relative w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center content-center">
                  {stakedProjectsArray && stakedProjectsArray.map((project, index) => (
                    <div key={index} className="marketCard w-full cursor-pointer mt-6" onClick={()=> navigate("/marketinfo/123")}>
                        <div className="body">
                          <div className="author flex justify-between items-center px-4">
                            <img src={logo} alt="" width={"18%"} className='mt-[-1.8rem] bg-[#262626] rounded-full p-2'/>
                            <p className='text-sm mt-3 mr-2 font-[500]'>{project.author}</p>
                          </div>
                           <h2 className='font-bold text-lg pl-3 mt-2 mb-5'>{project.projectName}</h2>
                          <div className='footer flex items-center justify-between mt-9 px-4 pb-4 gap-3'>
                            <div className='py-3 w-full p-2 rounded-[5px]'>
                              <p className='font-bold'>TVL</p>
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
                      <button className='bg-[#39A971] text-white px-4 py-2 rounded-md flex justify-center items-center mt-4' onClick={()=>setFundAccountModal(true)}>
                        <i class="ri-add-fill mr-3 text-2xl"></i>
                        <p className='text-xl'>Fund Wallet</p>
                      </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        }

        {/* {walletModal && 
            <div className="walletsModalBg">
                <div className="walletsModal">
                    <div className='flex justify-between pb-1 mb-4' style={{ borderBottom:"1px solid #ccc" }}>
                        <p>Connect to account</p>
                        <i class="ri-close-fill text-xl cursor-pointer" onClick={()=> setWalletModal(false)}></i>
                    </div>
                    <div className='flex items-center gap-3 cursor-pointer' onClick={connectAccount}>
                        <img src={stellar} alt="" width={"7%"} />
                        <p className='font-bold text-md'>Stellar</p>
                    </div>
                </div>
            </div>
        } */}
        {/* {loadingAccount && 
            <div className="connectAccountLoader fixed top-[50%] left-[50%] text-[#84b943f7]">
                <i className="fa-solid fa-gear fa-spin mb-4 text-3xl"></i>
            </div>
        } */}
        {error &&
            <div className="errorModalBg">
                <div className="failureModal" style={{ position:"relative" }}>
                    <i className="ri-close-circle-line cursor-pointer" style={{ fontSize:"20px", position:"fixed", top:"40%", right:"31%" }} onClick={()=> setError(false)}></i>
                    <i className="ri-close-circle-line text-red-600"></i>
                    <p>{error}</p>
                </div>
            </div>
        }
        {fundAccountModal &&
          <div className='modalBg fixed top-0 left-0 w-full h-[100vh]'>
            <div className="fundModal bg-white px-5 pb-10 rounded-md relative">
            <i className="ri-close-circle-line text-red-600 text-2xl absolute top-5 right-5 cursor-pointer" onClick={()=> setFundAccountModal(false)}></i>
              <div className="header my-8">
                <h1 className='font-bold text-2xl mb-3'>Fund your Account</h1>
                <p>Use any of the options below to add funds to your wallet to buy commodities.</p>
              </div>
              <div className="body flex items-center justify-between text-center mt-9">
                <div className='text-[#1AC888] shadow-xl p-3 cursor-pointer' onClick={()=> {
                  setOpenBankTransfer(!openBankTransfer)
                  setOpenCryptoTransfer(false)
                  setOpenInstrumentsTransfer(false)
                }}>
                  <i class="fa-solid fa-building-columns text-6xl mb-3"></i>
                  <p>Bank Transfer</p>
                </div>
                <div  className='text-[#1AC888] shadow-xl p-3 cursor-pointer' onClick={()=> {
                  setOpenBankTransfer(false)
                  setOpenCryptoTransfer(!openCryptoTransfer)
                  setOpenInstrumentsTransfer(false)
                }}>
                  <i class="fa-brands fa-bitcoin text-6xl mb-3"></i>
                  <p>Crypto Transfer</p>
                </div>
                <div  className='text-[#1AC888] shadow-xl p-3 cursor-pointer' onClick={()=> {
                  setOpenBankTransfer(false)
                  setOpenCryptoTransfer(false)
                  setOpenInstrumentsTransfer(!openBankInstrumentsTransfer)
                }}>
                  <i class="fa-solid fa-credit-card text-6xl mb-3"></i>
                  <p>Card Payment</p>
                </div>
              </div>
              {openBankTransfer && !openCryptoTransfer && !openBankInstrumentsTransfer &&
                <div>
                  <p className='mt-4 mb-4 text-gray-600'>At the time of Payment Transaction. Make sure your minimum balance is <br /> sufficient to make purchase order</p>
                  <p className='text-gray-600 mb-5'>NOTE: Make sure you enter the memo code in your payment transaction</p>
                  <p className='mb-1 font-medium text-gray-700'>Bank Name: GT Bank</p>
                  <p className='mb-1 font-medium text-gray-700'>Account Holder Name: The Farm House Club</p>
                  <p className='mb-1 font-medium text-gray-700'>Bank Account No: 411011231213</p>
                  <p className='mb-1 font-medium text-gray-700'>Memo Code: CCC0EEE495</p>
                </div>
              }
              {!openBankTransfer && openCryptoTransfer && !openBankInstrumentsTransfer &&
                <div className='my-5 text-center'>
                  <h1><span className='font-bold'>Note:</span>You need to make trustline to transfer funds into your wallet</h1>
                  <button className='py-1 bg-[#1AC888] w-full text-white mt-3 rounded'>Trustline</button>
                </div>
              }
              {!openBankTransfer && !openCryptoTransfer && openBankInstrumentsTransfer &&
                <div className='mt-5'>
                  <div className=''>
                    <label className='block'>Amount</label>
                    <input type="text" onChange={(e)=> setAmount(e.target.value)} className='border border-slate-600 outline-none py-1 pl-3'/>
                  </div>
                  <div className='mt-3 border-b border-slate-400'>
                    <label className='block'>Public Key</label>
                    <div className='flex gap-1'>
                      <i className="ri-key-2-line"></i>
                      <input type="text" value={public_key} className='border-none outline-none py-[3px] pl-1 w-full'/>
                    </div>
                  </div>
                  {!loadFundButton ?
                    <button onClick={payWithPayStack} className='bg-[#1AC888] w-full text-white p-[5px] mt-3'>Fund</button>
                    :
                    <button className='bg-[#1AC888] w-full text-white p-[5px] mt-3'>
                      <i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i>
                    </button>
                   }
                </div>
              }
            </div>
          </div>
        }

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
          // <div className='verifyPaymentModdalBg'>
          //   <div className="verifyPaymentModal relative">
          //     <i className='absolute top-3 right-3 cursor-pointer' onClick={()=> setSuccessfulModal(false)}>x</i>
          //     <i className="fa-solid fa-check" style={{ color:"#1AC888", fontSize:"2rem", marginBottom:"20px" }}></i>
          //     <p>Payment has been successfull</p>
          //   </div>
          // </div>
        }
    </div>
  )
}

export default Dashboard