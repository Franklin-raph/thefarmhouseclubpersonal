import {useEffect, useState} from 'react'
import LoggedInNav from '../../components/navbar/LoggedInNav'
import {useNavigate, useParams} from "react-router-dom"
import cardImage1 from '../../assets/images/cover.jpeg'
import cardImage2 from '../../assets/images/cocoa-plant.jpg'
import logo from "../../assets/images/thefarmhouseclublogo2.png.crdownload.png"
import stellar from "../../assets/images/Stellar_Symbol.png"
import LoaderComponent from '../../components/loaderComponent/LoaderComponent'
import ErrorAlert from '../../components/alert/ErrorAlert'
import SuccessAlert from '../../components/alert/SuccessAlert'

const MarketInfo = ({changemode, mode, baseUrl}) => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    const [walletModal, setWalletModal] = useState(false)
    const [loadingAccount, setLoadingAccount] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [stakeInput, setStakeInput] = useState(0)
    const [marketInfo, setMarketInfo] = useState()
    const [showBalance, setShowBalance] = useState(false)
    const [accountBalanceInfo, setAccountBalanceInfo] = useState()
    const [confirmProjectInvestModal, setConfirmProjectInvestModal] = useState(false)
    const [investLoader, setInvestLoader] = useState(false)
    const [depositTab, setDepositTab] = useState(false)
    const [withdrawTab, setWithdrawTab] = useState(false)
    // const [depositTab, setDepositTab] = useState(false)
    const {id} = useParams()

    useEffect(() =>{
      getAccountSummary()
      getProjectInfo()
      console.log(id)
    },[])

    async function getAccountSummary(){
      setLoadingAccount(true)
      const response = await fetch(`${baseUrl}/myaccount-balance/`,{
        method:"POST",
        body: JSON.stringify({public_key:user.public_key}),
        headers:{
          Authorization: `Bearer ${user.access}`,
          "Content-Type":"application/json"
        }
      })
      if(response) {
        setLoadingAccount(false)
      }
  
      const data = await response.json()
      console.log(data)
      if(response.ok){
        data.map(accBal => (
          accBal.asset_code === "AVDA" && setAccountBalanceInfo(accBal.balance)
         ))
      }
    }

  function calculateStakeAmount(depositPercent){
    // if(!stakeInput || stakeInput === 0) return
    if(accountBalanceInfo <= 0){
      return
    }else{
      setStakeInput(depositPercent/100 * accountBalanceInfo)
    }
  }

  async function getProjectInfo(){
    const response = await fetch(`${baseUrl}/investments/${id}/`,{
      headers:{
        Authorization: `Bearer ${user.access}`,
        "Content-Type":"application/json"
      }
    })
    const data = await response.json()
    setMarketInfo(data)
    console.log(data)
  }

  async function handleProjectInvestment(){
    console.log(JSON.stringify({amount_invested:stakeInput, project_id:id, public_key:user.public_key}))
    setInvestLoader(true)
    const response = await fetch(`${baseUrl}/invest/`, {
      method:"POST",
      body: JSON.stringify({amount_invested:stakeInput, project_id:id}),
      headers:{
        Authorization: `Bearer ${user.access}`,
        "Content-Type":"application/json"
      }
    })
    const data = await response.json()
    if(response) setInvestLoader(false)
    if(response.ok) {
      setConfirmProjectInvestModal(false)
      setSuccess(data.description)
    }
    if(!response.ok) setError(data.detail)
    console.log(response, data.description)
  }

  return (
    <div className='h-[100%]'>
        <LoggedInNav changemode={changemode} mode={mode} />
        <div className='inline-flex items-center mt-[5rem]'></div>
        {
          marketInfo && 
            <div className="marketInfoFirstSection">
              <div className="marketCard w-full">
                <img src={cardImage2} alt="" className='firstImage w-full'/>
                  <div className="body">
                  <div className="author flex justify-between items-center px-4">
                    <img src={logo} alt="" width={"12%"} className='mt-[-1.8rem] bg-[#262626] rounded-full p-2'/>
                    {/* <p className='text-sm mt-1'>the Farmhouse Club</p> */}
                  </div>
                  {/* <h2 className='font-bold text-lg pl-3 mt-2 mb-5'>Farm House Club</h2> */}
                  <h2 className='font-bold text-lg pl-3 mt-2 mb-5'>{marketInfo.project_name}</h2>
                  <div className='footer flex items-center justify-between mt-9 px-4 pb-4 gap-3'>
                    <div className='py-3 w-full p-2 rounded-[5px]'>
                      <p className='font-bold'>TVR</p>
                      <h2 className='font-bold text-xl'>{marketInfo.tvl}</h2>
                    </div>
                    <div className='py-3 w-full p-2 rounded-[5px]'>
                      <p className='font-bold'>APY</p>
                      <h2 className='font-bold text-xl'>{marketInfo.apy === null ? "0" : marketInfo.apy}</h2>
                    </div>
                  </div>
                  </div>
              </div>

              <div className="w-full">
                <div className='marketCard mb-5'>
                  <div className="tabHeader flex items-center justify-between pt-3 text-center font-bold">
                    <p className='tabBtn w-full p-3' onClick={() => {
                      setDepositTab(true)
                      setWithdrawTab(false)
                    }}>Deposit</p>
                    <p className='tabBtn w-full p-3'onClick={() => {
                      setDepositTab(false)
                      setWithdrawTab(true)
                    }}>Withdraw</p>
                    <p className='tabBtn w-full p-3'>Info</p>
                  </div>
                  <div className="body">
                    <div className="author flex justify-between items-center px-1 mt-5 gap-1 ml-3 py-2 rounded">
                        {/* <img src={logo} alt="" width={"40px"} className='bg-[#262626] rounded-full p-1'/> */}
                        {withdrawTab && <p>Withdraw Amount</p> }
                        {depositTab && <p>Deposit Amount</p> }
                        <div>
                          <div className='flex items-center pr-3 cursor-pointer gap-2' onClick={()=> setShowBalance(!showBalance)}>
                            <p className=''>Balance</p>
                            <i class="ri-arrow-down-s-line"></i>
                          </div>
                          {showBalance &&
                            <div>
                              {accountBalanceInfo}
                            </div>
                          }
                        </div>
                    </div>
                      <input type="text" className='depositFee font-bold text-3xl py-1 ml-5 bg-transparent outline-none my-3 w-full' value={stakeInput} onChange={(e)=> setStakeInput(e.target.value)} placeholder='0.0' style={{ color:"#000" }}/>
                      {accountBalanceInfo <= 0 ?
                      <div className="discount flex justify-between items-center p-5 gap-2">
                        <button className='cursor-not-allowed border border-[#595959] opacity-50 w-full py-1 rounded-md'>25%</button>
                        <button className='cursor-not-allowed border border-[#595959] opacity-50 w-full py-1 rounded-md'>50%</button>
                        <button className='cursor-not-allowed border border-[#595959] opacity-50 w-full py-1 rounded-md'>75%</button>
                        <button className='cursor-not-allowed border border-[#595959] opacity-50 w-full py-1 rounded-md'>100%</button>
                      </div>
                      : 
                        <div className="discount flex justify-between items-center p-5 gap-2">
                          <button className='border border-[#595959] w-full py-1 rounded-md' onClick={()=>calculateStakeAmount(25)}>25%</button>
                          <button className='border border-[#595959] w-full py-1 rounded-md' onClick={()=>calculateStakeAmount(50)}>50%</button>
                          <button className='border border-[#595959] w-full py-1 rounded-md' onClick={()=>calculateStakeAmount(75)}>75%</button>
                          <button className='border border-[#595959] w-full py-1 rounded-md' onClick={()=>calculateStakeAmount(100)}>100%</button>
                        </div>
                      }
                      
                  </div>
                </div>
                <div>
                  <div className='flex items-center justify-between font-medium'>
                    <p>Deposit Fee</p>
                    <p>0</p>
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
                {depositTab && 
                <>
                  {stakeInput <= 0 ? <button className='cursor-not-allowed mt-5 rounded-md bg-[#1AC888] opacity-50 text-center w-full py-2 font-medium text-white'>Invest ${stakeInput} in this project</button> : <button className='mt-5 rounded-md bg-[#1AC888] text-center w-full py-2 font-medium text-white' onClick={()=> setConfirmProjectInvestModal(true)}>Invest ${stakeInput} in this project</button> }
                </>
                }

                {withdrawTab && 
                <>
                  {stakeInput <= 0 ? <button className='cursor-not-allowed mt-5 rounded-md bg-[#1AC888] opacity-50 text-center w-full py-2 font-medium text-white'>Withdraw ${stakeInput}</button> : <button className='mt-5 rounded-md bg-[#1AC888] text-center w-full py-2 font-medium text-white' onClick={()=> setConfirmProjectInvestModal(true)}>Invest ${stakeInput} in this project</button> }
                </>
                }
                
              </div>

                <div>
                  <h4 className='text-xl font-bold my-4'>Project Description</h4>
                  <p className='text-justify mb-5'>{marketInfo.description.substring(0, 500)}</p>
                  <ul className=''>
                    <li className='my-2'>
                      <span className='mr-2'>1.</span>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere, ullam?
                    </li>
                    <li className='my-2'>
                      <span className='mr-2'>2.</span>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere, ullam?
                    </li>
                    <li className='my-2'>
                      <span className='mr-2'>3.</span>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere, ullam?
                    </li>
                    
                  </ul>
                  <button className='mt-4 border border-[#1AC888] hover:bg-[#1AC888] transition-all text-white p-2 w-full rounded-md'>Download full project description</button>
                </div>
              
            </div>
        }
          
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
            <div className='dashboardContentLoaderBg'>
              <LoaderComponent />
            </div>
        }

        {error &&
            <ErrorAlert error={error} setError={setError}/>
        }
        {success &&
            <SuccessAlert success={success} setSuccess={setSuccess}/>
        }

        {confirmProjectInvestModal &&
          <div className='confirmProjectInvestModalBg'>
            <div className="confirmProjectInvestModal bg-white px-5 pb-10 rounded-md relative">
            <i className="ri-close-circle-line text-red-600 text-2xl absolute top-5 right-5 cursor-pointer" onClick={()=> setConfirmProjectInvestModal(false)}></i>
              <div className="header my-8">
                <h1 className='font-bold text-2xl mb-3'>Project Investment</h1>
                <p>Please use the button below to confirm your investment for {marketInfo.project_name}</p>
              </div>
              <div className="body grid gap-5 mt-9">
                <h1>Investment Amount: ${stakeInput}</h1>
                <h1>Project Name: ${marketInfo.project_name}</h1>
              </div>
              <div className="footer mt-9 flex text-center items-center justify-center gap-5">
                {!investLoader ? 
                  <button className='cursor-pointer rounded-md bg-[#1AC888] text-center py-2 px-5 font-medium text-white' onClick={handleProjectInvestment}>
                    Confirm
                  </button>
                  : 
                  <button className='cursor-pointer rounded-md bg-[#1AC888] text-center py-2 px-5 font-medium text-white'>
                    <i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i>
                  </button>
                }
                
                <button className='cursor-pointer rounded-md bg-red-600 text-center py-2 px-5 font-medium text-white' onClick={()=> setConfirmProjectInvestModal(false)}>Cancel </button>
              </div>
            </div>
          </div>
        }
    </div>
  )
}

export default MarketInfo