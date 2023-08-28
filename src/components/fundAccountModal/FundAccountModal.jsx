import {useState} from 'react'

const FundAccountModal = ({user, setFundAccountModal, payWithPayStack, amount, setAmount, loadFundButton}) => {
    const [openBankTransfer, setOpenBankTransfer] = useState(false)
    const [openCryptoTransfer, setOpenCryptoTransfer] = useState(false)
    const [openBankInstrumentsTransfer, setOpenInstrumentsTransfer] = useState(false)
    const [public_key, setPublicKey] = useState(user.public_key)

  return (
    <div>
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
                    <input type="text" value={amount} onChange={(e)=> setAmount(e.target.value)} className='border border-slate-600 outline-none py-1 pl-3'/>
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
    </div>
  )
}

export default FundAccountModal