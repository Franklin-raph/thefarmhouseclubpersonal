import {useEffect} from 'react'
import LoggedInNav from '../../components/navbar/LoggedInNav'
import Logo from '../../assets/images/uni-thumbnail.svg'
import strike from '../../assets/images/bolt-thumbnail.svg'
import gradient from '../../assets/images/gradient-thumbnail.svg'


const Governance = ({changemode, mode}) => {
  const user = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    if(!user) navigate("/")
  },[])
  return (
    <div className='h-[100%] governance-page-container'>
      <div>
          <LoggedInNav changemode={changemode} mode={mode}/>
      </div>

      <div className="top-[20%] relative left-[7%] w-[75%] mx-auto governance-page py-[8rem]">
        <div>
            <h1 className='text-[#848484]'>THE GOVERNANCE APPS</h1>
            <p className='text-[20px] mt-4'>Share your opinions and shape the future of the protocol</p>
        </div>

        <div className="grid grid-cols-3 justify-between gap-[50px] mt-5 government-boxes pb-[4.5rem]">
          <div className='border rounded-xl p-7 border-gray-600 cursor-pointer hover:shadow-2xl'>
            <img src={Logo} alt="" />
            <h3 className='mt-3 mb-4 font-[500] text-[20px]'>Governance Forum</h3>
            <p className='text-[14px] leading-6 text-gray-400'>
              A forum for governance-related discussion. Share proposals, provide feedback, and shape the future of the protocol with the Uniswap community.
            </p>
          </div>

          <div className='border rounded-xl p-7 border-gray-600 cursor-pointer hover:shadow-2xl'>
            <div>
              <img src={gradient} alt="" />
            </div>
            <h3 className='mt-3 mb-4 font-[500] text-[20px]'>Governance Portal</h3>
            <p className='text-[14px] leading-6 text-gray-400'>
              The official governance voting portal. Review live governance proposals and cast your vote on-chain.
            </p>
          </div>

          <div className='border rounded-xl p-7 border-gray-600 cursor-pointer hover:shadow-2xl'>
            <div>
              <img src={strike} alt="" />
            </div>
            <h3 className='mt-3 mb-4 font-[500] text-[20px]'>Governance Forum</h3>
            <p className='text-[14px] leading-6 text-gray-400'>
              A simple off-chain voting interface for community members to signal sentiment during the early stages of a proposal’s life cycle
            </p>
          </div>
        </div>

        <div className='pt-[4.5rem]' style={{ borderTop:"1px solid gray" }}>
          <h1>THE GOVERNANCE PROCESS</h1>
          <div className='flex items-start gap-[30px] md:gap-[80px] flex-col md:flex-row'>
            <div className='flex flex-row md:flex-col md:items-start items-center md:gap-0 gap-5'>
              <div className='border border-slate-400 cursor-pointer py-3 px-5 rounded-lg mt-2 w-[100%]'>
                Phase 1: Temperature Check
              </div>
              <div className='cursor-pointer my-4 border border-slate-700 text-gray-600 py-3 px-5 rounded-lg w-[100%]'>
                Phase 2: Consensus Check
              </div>
              <div className='cursor-pointer mb-2 border border-slate-700 text-gray-600 py-3 px-5 rounded-lg w-[100%]'>
                Phase 3: Governance Proposal
              </div>
            </div>
            <div className='w-[100%] md:w-[50%]'>
              <h1 className='mb-2 text-2xl font-[500]'>Temperatue Check</h1>
              <p className='text-gray-400 text-[14px]'>
                The Temperature Check process determines whether there is sufficient will to make changes to the status quo. At the end of the two days, a majority vote with a 25k UNI yes-vote threshold wins. If the Temperature check does not suggest a change from the status quo, the topic will be closed on the governance site. If the Temperature Check does suggest a change, proceed to Stage 2: Consensus Check.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Governance