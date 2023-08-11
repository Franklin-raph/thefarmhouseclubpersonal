import {useState} from 'react'
import LoggedInNav from '../../components/navbar/LoggedInNav'
import {useNavigate} from "react-router-dom"
import cardImage1 from '../../assets/images/cover.jpeg'
import logo from "../../assets/images/thefarmhouseclublogo2.png.crdownload.png"
import stellar from "../../assets/images/Stellar_Symbol.png"

const MarketInfo = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    const [walletModal, setWalletModal] = useState(false)
    const [fundAccountModal, setFundAccountModal] = useState(false)
    const [loadingAccount, setLoadingAccount] = useState(false)
    const [fundAccount, setFundAccount] = useState(false)
    const [openBankTransfer, setOpenBankTransfer] = useState(false)
    const [openCryptoTransfer, setOpenCryptoTransfer] = useState(false)
    const [openBankInstrumentsTransfer, setOpenInstrumentsTransfer] = useState(false)
    const [error, setError] = useState("")

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
    <div className='market h-[100%]'>
        <LoggedInNav />
        <div className='inline-flex items-center px-3 py-2 rounded-md bg-[#83B943] ml-5 text-white cursor-pointer mt-9' onClick={() => navigate("/markets")}>
            <i class="ri-arrow-left-s-line text-xl"></i>
            <p>Back</p>
        </div>
        <div className="marketInfoFirstSection">
          <div className="marketCard w-full" onClick={()=> navigate("/marketinfo/123")}>
            <img src={cardImage1} alt="" className='firstImage'/>
              <div className="body">
              <div className="author flex justify-between items-center px-4">
                <img src={logo} alt="" width={"12%"} className='mt-[-1.8rem] bg-[#262626] rounded-full p-2'/>
                <p className='text-sm mt-1'>the Farmhouse Club</p>
              </div>
              <h2 className='font-bold text-lg pl-3 mt-2 mb-5'>Farm House Club</h2>
              <div className='footer flex items-center justify-between mt-9 px-4 pb-4 gap-3'>
                <div className='py-3 w-full p-2 rounded-[5px]'>
                  <p className='font-bold'>TVL</p>
                  <h2 className='font-bold text-xl'>$1.03M</h2>
                </div>
                <div className='py-3 w-full p-2 rounded-[5px]'>
                  <p className='font-bold'>APY</p>
                  <h2 className='font-bold text-xl'>3.2%</h2>
                </div>
              </div>
              </div>
          </div>

          <div className="w-full">
            <div className='marketCard mb-5'>
              <div className="tabHeader flex items-center justify-between pt-3 text-center font-bold">
                <p className='tabBtn w-full p-3'>Deposit</p>
                <p className='tabBtn w-full p-3'>Withdraw</p>
                <p className='tabBtn w-full p-3'>Info</p>
              </div>
              <div className="body">
                <div className="author inline-flex justify-start items-center px-1 mt-5 gap-1 cursor-pointer ml-3 py-2 rounded">
                    <img src={logo} alt="" width={"40px"} className='bg-[#262626] rounded-full p-1'/>
                    <p className='text-lg font-bold'>The Farmhouse Club</p>
                  </div>
                  <input type="text" className='font-bold text-3xl py-1 ml-5 bg-transparent outline-none my-3' placeholder='0.0' style={{ color:"#000" }}/>
                  <div className="discount flex justify-between items-center p-5 gap-2">
                    <button className='bg-[#82CABB] w-full py-1 rounded-md'>25%</button>
                    <button className='bg-[#82CABB] w-full py-1 rounded-md'>50%</button>
                    <button className='bg-[#82CABB] w-full py-1 rounded-md'>75%</button>
                    <button className='bg-[#82CABB] w-full py-1 rounded-md'>100%</button>
                  </div>
              </div>
            </div>
            <div>
              <div className='flex items-center justify-between font-medium'>
                <p>Deposit Fee</p>
                <p>0%</p>
              </div>
              <div className='flex items-center justify-between my-2 font-medium'>
                <p>Withdraw Fee</p>
                <p>0%</p>
              </div>
              <div className='flex items-center justify-between font-medium'>
                <p>Performance Fee</p>
                <p>10%</p>
              </div>
            </div>
            {fundAccount ? 
              <button className='mt-5 rounded-md bg-[#83B943] text-center w-full py-2 font-bold text-white' onClick={()=> setFundAccountModal(true)}>Fund Account</button>
                : 
              <button className='mt-5 rounded-md bg-[#83B943] text-center w-full py-2 font-bold text-white' onClick={()=> setWalletModal(true)}>Connect your account to deposit</button>
            }
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

export default MarketInfo