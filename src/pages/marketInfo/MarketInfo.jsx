import React from 'react'
import LoggedInNav from '../../components/navbar/LoggedInNav'
import {useNavigate} from "react-router-dom"

const MarketInfo = () => {
    const navigate = useNavigate()

  return (
    <div className='market h-[100vh]'>
        <LoggedInNav />
        <div className='inline-flex items-center px-3 py-2 rounded-md bg-[#83B943] ml-5 text-white cursor-pointer' onClick={() => navigate("/markets")}>
            <i class="ri-arrow-left-s-line text-xl"></i>
            <p>Back</p>
        </div>
    </div>
  )
}

export default MarketInfo