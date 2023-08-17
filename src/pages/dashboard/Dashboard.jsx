import {useEffect, useState} from 'react'
import LoggedInNav from '../../components/navbar/LoggedInNav'
import AVDACoin from "../../assets/images/advatoken.png"
import stellar from "../../assets/images/Stellar_Symbol.png"
import Navbar from '../../components/navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import TextTransition, { presets } from 'react-text-transition';
import PaystackPop from "@paystack/inline-js"
import SuccessAlert from '../../components/alert/SuccessAlert'

const Dashboard = ({changemode, mode, baseUrl}) => {

  const user = JSON.parse(localStorage.getItem("user"))

  const [walletModal, setWalletModal] = useState(false)
  const [fundAccountModal, setFundAccountModal] = useState(false)
  const [loadingAccount, setLoadingAccount] = useState(false)
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
    const response = await fetch(`${baseUrl}/myaccount-summary/`,{
      method:"POST",
      body: JSON.stringify({public_key:user.public_key}),
      headers:{
        Authorization: `Bearer ${user.access}`,
        "Content-Type":"application/json"
      }
    })
    const data = await response.json()
    if(response.ok){
      setDisplayDashboardInfo(data)
    }
    console.log(data)
  }

  async function handleVerifyAccountFund(reference, amount){
    // console.log(JSON.stringify({reference:reference, amount:amount, public_key:user.public_key}))
    const response = await fetch(`${baseUrl}/create-funded-account/`,{
      method:"POST",
      body: JSON.stringify({reference:reference, amount:amount, public_key:user.public_key}),
      headers:{
        Authorization: `Bearer ${user.access}`,
        "Content-Type":"application/json"
      }
    })
    if(response)setVerifyPaymentModal(false)
    if(response.ok) setSuccess("")
    const data = await response.json()
  console.log(response, data)
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
      },
      oncancel(){
        console.log("Failed Transaction")
      }
    })
  }

  return (
    <div className='market h-[100vh]'>
      <div className="balanceContainer">
        <div className="balances"></div>
        <div className="balances"></div>
        <div className="balances"></div>
      </div>
        <LoggedInNav fundAccount={fundAccount} setFundAccountModal={setFundAccountModal} setWalletModal={setWalletModal} changemode={changemode} mode={mode}/>
        
        {displayDashboardInfo ? 
            <div className='px-[9rem] pt-6 relative left-[7%] top-[10%]' id='dashboard'>
                <h3 className='text-2xl font-[600] text-[#888] mb-5'>ACCOUNTS</h3>
                <div className='gap-10' style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)" }}>
                  {/* {displayDashboardInfo.balances && displayDashboardInfo.balances.map(balance => (
                    <div className='flex items-center justify-between gap-10 p-5 rounded-lg relative pb-9 w-full' style={{ boxShadow:"0 0 20px #ccc" }}>
                      <img src="https://cdn.lumenswap.io/obm/xlm.png" width={"80px"} className='rounded-full' alt="" />
                      <div>
                        <p className='text-lg'>{balance.asset_type === "native" ? "XLM":""}</p>
                        <h3 className='font-bold text-xl'>{Number(balance.balance).toFixed(2)}</h3>
                        <p className='absolute'>{user.public_key.slice(0, 4)}...{user.public_key.slice(-4)}</p>
                      </div>
                    </div>
                  ))} */}
                  <div className='flex items-center justify-between gap-10 p-5 rounded-lg relative pb-9 dashboardInfo' style={{ boxShadow:"0 0 20px #ccc" }}>
                      <img src="https://cdn.lumenswap.io/obm/xlm.png" className='rounded-full' alt="" />
                      <div>
                        <p className='text-lg'>Nativ</p>
                        <h3 className='font-bold text-xl'>1000.00</h3>
                        <p className='absolute right-2 bottom-3'>{user.public_key.slice(0, 4)}...{user.public_key.slice(-4)}</p>
                      </div>
                    </div>

                    <div className='flex items-center justify-between gap-10 p-5 rounded-lg pb-9 relative dashboardInfo' style={{ boxShadow:"0 0 20px #ccc" }}>
                      <img src="https://cdn.lumenswap.io/obm/xlm.png" className='rounded-full' alt="" />
                      <div>
                        <p className='text-lg'>AVDA</p>
                        <h3 className='font-bold text-xl'>900</h3>
                        <p className='absolute right-2 bottom-3'>{user.public_key.slice(0, 4)}...{user.public_key.slice(-4)}</p>
                      </div>
                    </div>

                    <div className='flex items-center justify-between gap-10 p-5 rounded-lg pb-9 relative dashboardInfo' style={{ boxShadow:"0 0 20px #ccc" }}>
                      <img src="https://cdn.lumenswap.io/obm/xlm.png" className='rounded-full' alt="" />
                      <div>
                        <p className='text-lg'>USD</p>
                        <h3 className='font-bold text-xl'>30000</h3>
                        <p className='absolute right-2 bottom-3'>{user.public_key.slice(0, 4)}...{user.public_key.slice(-4)}</p>
                      </div>
                    </div>
                </div>
                <h3 className='text-2xl font-[600] text-[#888] mb-5 mt-[50px]'>MY STAKED PROJECTS</h3>
                <div>
                  
                </div>
            </div>
        : 
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
          <SuccessAlert success={"Payment has been successfull verified"} setSuccess={setSuccess}/>
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