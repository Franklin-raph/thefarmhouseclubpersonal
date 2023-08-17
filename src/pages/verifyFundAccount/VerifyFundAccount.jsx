import React, { useEffect } from 'react'
import LoggedInNav from '../../components/navbar/LoggedInNav'
import { useNavigate } from 'react-router-dom'

const VerifyFundAccount = ({changemode, mode}) => {
    const navigate = useNavigate()
  return (
    <div>
        <LoggedInNav changemode={changemode} mode={mode}/>
        <div className='pt-[90px] text-center'>
            <h1 className='text-[20px]'>Account Have been funded succcessfully</h1>
            <button className='bg-[#1AC888] py-1 px-[20px] rounded-md text-lg mt-3 text-white' onClick={()=> navigate("/dashboard")}>Ok</button>
        </div>
    </div>
  )
}

export default VerifyFundAccount