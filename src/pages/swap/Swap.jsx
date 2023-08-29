import React, { useEffect, useState } from 'react'
import LoggedInNav from '../../components/navbar/LoggedInNav'
import avda from "../../assets/images/WhatsApp-Image-2023-08-03-at-11.47.37-AM-300x225.jpeg"
import Ngn from "../../assets/images/nigerian-naira-logo.png"
import Euro from "../../assets/images/euro.jpg"
import QRCode from "react-qr-code";
import FundAccountModal from '../../components/fundAccountModal/FundAccountModal'
import PaystackPop from "@paystack/inline-js"
import SuccessAlert from '../../components/alert/SuccessAlert'

const Swap = ({changemode, mode, baseUrl}) => {
    const user = JSON.parse(localStorage.getItem("user"))

    const [fundAccountModal, setFundAccountModal] = useState(false)
    const [amount, setAmount] = useState("")

    const [coinsModal, setCoinsModal] = useState(false)
    const [fundOptions, setFundOptions] = useState(false)
    const [verifyPaymentModal, setVerifyPaymentModal] = useState(false)
    const [success, setSuccess] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const [bankDetails, setBankDetails] = useState(false)
    const funds = ["Fund with Bank", "Fund with Card", "Fund with Crypto"]
    const [availableCurrencies, setAvailablyCurrencies] = useState([
        {
            img:Ngn,
            name: "NGN"
        },
        {
            img:"https://cdn.lumenswap.io/obm/usdc.png",
            name: "USDC"
        },
        {
            img:Euro,
            name: "EURO"
        },
    ])

    const [selectedImg, setSelectedImg] = useState()
    const [selectedName, setSelectedName] = useState("")
    const [fundText, setFundText] = useState("Fund with Card")

    useEffect(() => {
        setSelectedImg("-")
        setSelectedName("-")
    },[])

    function selectCurrency(img, name){
        setSelectedName(name)
        setSelectedImg(img)
        setCoinsModal(false)
    }

    function selectFundType(fund){
        setFundText(fund)
    }

    function copyToClipBoard(){
        navigator.clipboard.writeText(user.public_key)
        setIsCopied(!isCopied)
        setTimeout(() => {setIsCopied(false)},5000)
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
        if(response){
          setVerifyPaymentModal(false)
        }
        if(response.ok) {
          setSuccess(true)
        //   getAccountSummary()
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

  return (
    <div className='relative h-full'>
        <LoggedInNav changemode={changemode} mode={mode}/>
        {fundAccountModal && <FundAccountModal payWithPayStack={payWithPayStack} setFundAccountModal={setFundAccountModal} amount={amount} setAmount={setAmount} user={user}/>}
        <div className='swapContainer h-[100vh]'>
            <div className='py-5 px-5 swapDiv'>
            <div className="swapTab flex items-center justify-start gap-5 w-full mb-3 relative">
                <p className='cursor-pointer bg-[#263042] px-4 py-1 rounded-full current text-sm' onClick={()=>setFundOptions(!fundOptions)}>
                    {fundText}
                <i class="ri-arrow-down-s-line ml-1"></i></p>
                <p className='cursor-pointer text-sm'>Swap</p>
                {fundOptions && 
                    <div className='fundOptions absolute text-[12px] top-10 left-2 bg-[#263042] py-1 px-2 flex flex-col gap-1'>
                        {funds.map(fund => (
                            <p className='cursor-pointer' onClick={() => {
                                selectFundType(fund)
                                setFundOptions(false)
                            }}>{fund}</p>
                        ))}
                    </div>
                }
            </div>
            {fundText === "Fund with Card" && 
                <>
                    <div className="from rounded-md w-full p-3">
                        <div className="flex justify-between items-center mb-3">
                            <input type="text" placeholder='0.0' value={amount} onChange={(e) => setAmount(e.target.value)} style={{ color:"#fff !important" }} className='bg-[transparent] outline-none text-[30px] text-white font-medium w-full'/>
                            <div className="logo flex items-center gap-1 bg-[#263042] px-2 py-1 rounded-full cursor-pointer" onClick={() => setCoinsModal(true)}>
                                <img src={selectedImg} width={"25px"} className='rounded-full' alt="" />
                                <p className='mr-2'>{selectedName}</p>
                                <i className="ri-arrow-down-s-line text-xl cursor-pointer"></i>
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-gray-500 font-medium">
                            <h3 className='text-[14px]'>$2359.75</h3>
                        </div>
                    </div>
                    <i class="ri-arrow-down-line text-xl bg-[#263042] rounded-full px-2 py-1 relative z-10"></i>
                    <div className="from rounded-md w-full p-3">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className='text-[30px] font-medium'>4034.34</h3>
                            <div className="logo flex items-center gap-2 cursor-pointer bg-[#263042] px-2 py-1 rounded-full">
                                <img src={avda} width={"25px"} className='rounded-full' alt="" />
                                <p className='mr-2'>AVDA</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-gray-500 font-medium">
                            <h3 className='text-[14px]'>$2305.16</h3>
                        </div>
                    </div>
                    <button className='bg-[#1AC888] w-full mt-3 py-2 rounded-md' onClick={payWithPayStack}>Fund</button>
                </>
            }

            {fundText === "Fund with Bank" && 
                <>
                    <div className="from rounded-md w-full p-3">
                        <div className="flex justify-between items-center mb-3">
                            <input type="text" placeholder='0.0' value={amount} onChange={(e) => setAmount(e.target.value)} style={{ color:"#fff !important" }} className='bg-[transparent] outline-none text-[30px] text-white font-medium w-full'/>
                            <div className="logo flex items-center gap-1 bg-[#263042] px-2 py-1 rounded-full cursor-pointer" onClick={() => setCoinsModal(true)}>
                                <img src={selectedImg} width={"25px"} className='rounded-full' alt="" />
                                <p className='mr-2'>{selectedName}</p>
                                <i className="ri-arrow-down-s-line text-xl cursor-pointer"></i>
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-gray-500 font-medium">
                            <h3 className='text-[14px]'>$2359.75</h3>
                        </div>
                    </div>
                    <i class="ri-arrow-down-line text-xl bg-[#263042] rounded-full px-2 py-1 relative z-10"></i>
                    <div className="from rounded-md w-full p-3">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className='text-[30px] font-medium'>4034.34</h3>
                            <div className="logo flex items-center gap-2 cursor-pointer bg-[#263042] px-2 py-1 rounded-full">
                                <img src={avda} width={"25px"} className='rounded-full' alt="" />
                                <p className='mr-2'>AVDA</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-gray-500 font-medium">
                            <h3 className='text-[14px]'>$2305.16</h3>
                        </div>
                    </div>
                    <button className='bg-[#1AC888] w-full mt-3 py-2 rounded-md'>Fund</button>
                </>
            }

            {fundText === "Fund with Crypto" && 
                <div className='crypto rounded-[12px] w-full'>
                    <div className="header flex items-center gap-3 mb-3 border-b border-[#595959] p-3">
                        <i class="fa-solid fa-wallet"></i>
                        <p>Wallet Address</p>
                    </div>
                    <div className='w-full p-5'>
                        <p className='text-sm'>You will use your cryptographic signature (private key) to authorize transactions</p>
                        <p className='text-sm mt-10 mb-2'>My wallet address is</p>
                        <div className="flex items-center gap-2">
                            <p className='py-1 px-2 border border-gray-700 rounded-md w-full hidden md:block'>{user && user.public_key.slice(0, 12)}...{user.public_key.slice(-12)}</p>
                            <p className='py-1 px-2 border border-gray-700 rounded-md w-full block md:hidden'>{user && user.public_key.slice(0, 6)}...{user.public_key.slice(-6)}</p>
                            {!isCopied?
                                <i class="ri-clipboard-fill cursor-pointer" onClick={()=> copyToClipBoard()}></i>
                                :
                                <i class="ri-check-double-fill px-2 py-1 bg-green-500 text-white rounded-full"></i>
                            }
                            
                        </div>
                        <div className="mt-3 text-center flex items-center justify-center">
                        <QRCode
                            value={user && user.public_key}
                            size="100"
                        />
                        </div>
                    </div>
                </div>
            }
                
            </div>
        </div>
        {coinsModal && 
            <div className='tokenModalBg'>
                <div className="tokenModal">
                    <div className="flex items-center justify-between mb-5 pb-3" style={{ borderBottom:"1px solid #bbb" }}>
                        <h1>Select a currency</h1>
                        <i class="ri-close-fill text-xl cursor-pointer" onClick={()=> setCoinsModal(false)}></i>
                    </div>
                    <input type="search" placeholder='Search for currency'/>
                    <div className="tokens mt-5">
                        {availableCurrencies && availableCurrencies.map(availableCurrency => (
                            <div className="flex items-center gap-2 cursor-pointer my-2" onClick={() => selectCurrency(availableCurrency.img, availableCurrency.name)}>
                                <img src={availableCurrency.img} width={"20px"} className='rounded-full' alt="" />
                                <p className='mr-2'>{availableCurrency.name}</p>
                            </div>
                        ))}
                    </div>
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
        }
    </div>
  )
}

export default Swap