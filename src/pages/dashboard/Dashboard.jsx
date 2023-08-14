import {useEffect, useState} from 'react'
import LoggedInNav from '../../components/navbar/LoggedInNav'
import AVDACoin from "../../assets/images/advaDashboardToken.png"
import stellar from "../../assets/images/Stellar_Symbol.png"
import Navbar from '../../components/navbar/Navbar'
import { useNavigate } from 'react-router-dom'

const Dashboard = ({changemode, mode}) => {

  const user = JSON.parse(localStorage.getItem("user"))

  const [walletModal, setWalletModal] = useState(false)
  const [fundAccountModal, setFundAccountModal] = useState(false)
  const [loadingAccount, setLoadingAccount] = useState(false)
  const [fundAccount, setFundAccount] = useState(false)
  const [openBankTransfer, setOpenBankTransfer] = useState(false)
  const [openCryptoTransfer, setOpenCryptoTransfer] = useState(false)
  const [openBankInstrumentsTransfer, setOpenInstrumentsTransfer] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    if(!user) navigate("/")
  },[])

  async function connectAccount(){
      setLoadingAccount(true)
      const response = await fetch(`https://horizon-testnet.stellar.org/accounts/${user.public_key}`)
      const data = await response.json()
      if(response) {
          setLoadingAccount(false)
          setWalletModal(false)
      }

      if(response.status === 404) {
          setError("Unfunded account. Please fund your account")
          setFundAccount(true)
      }
      console.log(data)
  }

  return (
    <div className='market h-[100vh]'>
        {/* <Navbar /> */}
        <LoggedInNav fundAccount={fundAccount} setFundAccountModal={setFundAccountModal} setWalletModal={setWalletModal} changemode={changemode} mode={mode}/>
        <div className='py-2 px-5 relative left-[7%] top-[10%]' id='dashboard'>
            <h3 className='font-bold text-xl text-gray-500 mt-[5rem] text-center mb-[9rem]'>Welcome {user && user.user.username}, to Your Farmhouse Club Dashboard</h3>
            <div className='flex flex-col justify-center items-center text-center w-[80%] mx-auto mt-[6rem]'>
                <div className="connectWalletBox bg-[#84b943f7] w-full rounded-md py-5 text-white">
                    <img src={AVDACoin} alt="" style={{ width:"15%", margin:"-7rem auto 0" }}/>
                    <h3 className='font-bold'>Please, {fundAccount ? "fund" : "connect"} your account</h3>
                    <p className='my-5'>
                        Please {fundAccount ? "fund" : "connect"} your account to see your staked projects and return on investments.
                    </p>
                    {fundAccount ? 
                      <button className="bg-[#fff] w-[auto] mb-5 py-2 px-4 rounded-[6px] text-[#83B943] cursor-pointer" onClick={()=> setFundAccountModal(true)}>Fund Account</button>
                        : 
                      <button className="bg-[#fff] w-[auto] mb-5 py-2 px-4 rounded-[6px] text-[#83B943] cursor-pointer" onClick={()=> setWalletModal(true)}>Connect Account</button>
                    }
                </div>
            </div>
        </div>
        {walletModal && 
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
        }
        {loadingAccount && 
            <div className="connectAccountLoader fixed top-[50%] left-[50%] text-[#84b943f7]">
                <i className="fa-solid fa-gear fa-spin mb-4 text-3xl"></i>
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
        {fundAccountModal &&
          <div className='modalBg fixed top-0 left-0 w-full h-[100vh]'>
            <div className="modal bg-white px-5 pb-10 rounded-md relative">
            <i className="ri-close-circle-line text-red-600 text-2xl absolute top-5 right-5 cursor-pointer" onClick={()=> setFundAccountModal(false)}></i>
              <div className="header my-8">
                <h1 className='font-bold text-2xl mb-3'>Fund your Account</h1>
                <p>Use any of the options below to add funds to your wallet to buy commodities.</p>
              </div>
              <div className="body flex items-center justify-between text-center mt-9">
                <div className='text-[#83B943] shadow-xl p-3 cursor-pointer' onClick={()=> {
                  setOpenBankTransfer(!openBankTransfer)
                  setOpenCryptoTransfer(false)
                  setOpenInstrumentsTransfer(false)
                }}>
                  <i class="fa-solid fa-building-columns text-6xl mb-2"></i>
                  <p>Bank Transfer</p>
                </div>
                <div  className='text-[#83B943] shadow-xl p-3 cursor-pointer' onClick={()=> {
                  setOpenBankTransfer(false)
                  setOpenCryptoTransfer(!openCryptoTransfer)
                  setOpenInstrumentsTransfer(false)
                }}>
                  <i class="fa-brands fa-bitcoin text-6xl"></i>
                  <p>Crypto Transfer</p>
                </div>
                <div  className='text-[#83B943] shadow-xl p-3 cursor-pointer' onClick={()=> {
                  setOpenBankTransfer(false)
                  setOpenCryptoTransfer(false)
                  setOpenInstrumentsTransfer(!openBankInstrumentsTransfer)
                }}>
                  <i class="fa-brands fa-bitcoin text-6xl"></i>
                  <p>Bank Instruments</p>
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
                  <button className='py-1 bg-[#83B943] w-full text-white mt-3 rounded'>Trustline</button>
                </div>
              }
              {!openBankTransfer && !openCryptoTransfer && openBankInstrumentsTransfer &&
                <div>Instrument</div>
              }
            </div>
          </div>
        }
    </div>
  )
}

export default Dashboard