import React, { useState } from 'react'
import LoggedInNav from '../../components/navbar/LoggedInNav'
import avda from "../../assets/images/WhatsApp-Image-2023-08-03-at-11.47.37-AM-300x225.jpeg"

const Swap = ({changemode, mode}) => {

    const [coinsModal, setCoinsModal] = useState(false)
    const [selectedToken, setSelectedToken] = useState({
        img:"https://cdn.lumenswap.io/obm/xlm.png",
        name: "XLM"
    })

    function selectToken(){
        
    }

    console.log(selectedToken.name)

  return (
    <div className='relative h-full'>
        <LoggedInNav changemode={changemode} mode={mode}/>
        <div className='swapContainer h-[100vh]'>
            <div className='py-5 px-5 swapDiv'>
                <div className="from border border-slate-400 rounded-md w-full p-3">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className='text-[30px] font-medium'>1.4</h3>
                        <div className="logo flex items-center gap-1 bg-[#263042] px-2 py-1 rounded-full" onClick={() => setCoinsModal(true)}>
                            <img src={selectedToken.img} width={"25px"} className='rounded-full' alt="" />
                            <p className='mr-2'>{selectedToken.name}</p>
                            <i className="ri-arrow-down-s-line text-xl cursor-pointer"></i>
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-gray-500 font-medium">
                        <h3 className='text-[14px]'>$2359.75</h3>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <i className="fa-solid fa-wallet"></i>
                            <p className='mr-2'>0.00</p>
                        </div>
                    </div>
                </div>
                <i class="ri-arrow-down-line text-xl bg-[#263042] rounded-full px-2 py-1 relative z-10"></i>
                <div className="from border border-slate-400 rounded-md w-full p-3">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className='text-[30px] font-medium'>4034.34</h3>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <img src={avda} width={"25px"} className='rounded-full' alt="" />
                            <p className='mr-2'>AVDA</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-gray-500 font-medium">
                        <h3 className='text-[14px]'>$2305.16</h3>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <i className="fa-solid fa-wallet"></i>
                            <p className='mr-2'>0.00</p>
                        </div>
                    </div>
                </div>
                {/* <div className="from border border-slate-400 rounded-md p-3">
                    <p className='text-sm'>To (estimated)</p>
                    <div className='flex items-center gap-10 mt-5'>
                        <input type="text" className='border border-gray-300 rounded-md px-2 py-2 outline-none' placeholder='0.0' />
                        <div className="logo flex items-center gap-1" onClick={() => setCoinsModal(true)}>
                            <img src={selectedToken.img} width={"20px"} className='rounded-full' alt="" />
                            <p className='mr-2'>{selectedToken.name}</p>
                            <i className="ri-arrow-down-s-line text-xl cursor-pointer"></i>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
        {coinsModal && 
            <div className='tokenModalBg'>
                <div className="tokenModal">
                    <div className="flex items-center justify-between mb-5 pb-3" style={{ borderBottom:"1px solid #bbb" }}>
                        <h1>Choose a Token</h1>
                        <i class="ri-close-fill text-xl cursor-pointer" onClick={()=> setCoinsModal(false)}></i>
                    </div>
                    <input type="search" placeholder='Search a token'/>
                    <div className="tokens mt-5">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <img src="https://cdn.lumenswap.io/obm/xlm.png" width={"20px"} className='rounded-full' alt="" />
                            <p className='mr-2'>XLM</p>
                        </div>
                        <div className="flex items-center gap-2 my-4 cursor-pointer">
                            <img src="https://cdn.lumenswap.io/obm/usdc.png" width={"20px"} className='rounded-full' alt="" />
                            <p className='mr-2'>USDC</p>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <img src="https://cdn.lumenswap.io/obm/xlm.png" width={"20px"} className='rounded-full' alt="" />
                            <p className='mr-2'>AVDA</p>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default Swap