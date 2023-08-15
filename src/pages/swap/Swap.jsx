import React, { useState } from 'react'
import LoggedInNav from '../../components/navbar/LoggedInNav'

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
    <div>
        <LoggedInNav changemode={changemode} mode={mode}/>
        <div className='swapContainer'>
            <div className='py-5 px-5 swapDiv'>
                <div className="from border border-slate-400 rounded-md p-3">
                    <p className='text-sm'>From</p>
                    <div className='flex items-center gap-10 mt-5'>
                        <input type="text" className='border-none outline-none font-medium text-xl' placeholder='0.0' />
                        <div className="logo flex items-center gap-1">
                            <img src="https://static.moonpay.com/widget/currencies/ngn.svg" width={"20px"} className='rounded-full' alt="" />
                            <p className='mr-2'>NGN</p>
                            <i class="ri-arrow-down-s-line text-xl cursor-pointer"></i>
                        </div>
                    </div>
                </div>
                <i class="ri-arrow-down-s-line text-xl"></i>
                <div className="from border border-slate-400 rounded-md p-3">
                    <p className='text-sm'>To (estimated)</p>
                    <div className='flex items-center gap-10 mt-5'>
                        <input type="text" className='border-none outline-none font-medium text-xl' placeholder='0.0' />
                        <div className="logo flex items-center gap-1" onClick={() => setCoinsModal(true)}>
                            <img src={selectedToken.img} width={"20px"} className='rounded-full' alt="" />
                            <p className='mr-2'>{selectedToken.name}</p>
                            <i className="ri-arrow-down-s-line text-xl cursor-pointer"></i>
                        </div>
                    </div>
                </div>
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