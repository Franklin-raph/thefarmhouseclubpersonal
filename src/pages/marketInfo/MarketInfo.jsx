import {useEffect, useState} from 'react'
import LoggedInNav from '../../components/navbar/LoggedInNav'
import {useNavigate, useParams} from "react-router-dom"
import DOMPurify from 'dompurify';
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
    const [fullProjectDesc, setFullProjectDesc] = useState(false)
    const [currentTab, setCurrentTab] = useState("")
    const [timeLine, setTimeLine] = useState([])
    const [myInvestMentInfo, setMyInvestMentInfo] = useState()
    const [numberOfDaysRemaining, setNumberOfDaysRemaining] = useState(0)

    const {id} = useParams()
    const [rawData, setRawData] = useState('lorem <b>ipsum</b>');

    useEffect(() =>{
      getAccountSummary()
      getProjectInfo()
      setCurrentTab("Deposit")
      getProjectTimeline()
      getMyInvestMentDetails()
      setDepositTab(true)
    },[])
    console.log(currentTab)

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
    console.log(data)
    setMarketInfo(data)
    const targetDate = new Date(data.vesting_period)
    const currentDate = new Date()
    const timeDifference = targetDate - currentDate;
    const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    if(remainingDays > 0){
      setNumberOfDaysRemaining(remainingDays)
    }else if (remainingDays === 0){
      setNumberOfDaysRemaining(0)
    }else{
      setNumberOfDaysRemaining(-1)
    }
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

  async function getProjectTimeline(){
    const resp = await fetch(`${baseUrl}/get_timelines/${id}/`,{
      headers:{
        Authorization: `Bearer ${user.access}`,
        "Content-Type":"application/json"
      }
    })
    const data = await resp.json()
    if(resp.ok){
      setTimeLine(data)
    }
    console.log(data)
  }

  async function getMyInvestMentDetails(){
    const resp = await fetch(`${baseUrl}/my-investment-detail/${id}/`,{
      headers:{
        Authorization: `Bearer ${user.access}`,
        "Content-Type":"application/json"
      }
    })
    const data = await resp.json()
    setMyInvestMentInfo(data)
    console.log(data)
  }
  console.log(myInvestMentInfo)

  return (
    <div className='h-[100%]'>
        <LoggedInNav changemode={changemode} mode={mode} />
        <div className='inline-flex items-center mt-[5rem]'></div>
        {
          marketInfo && 
            <div className="marketInfoFirstSection">
              <div className="marketCard w-full">
                <img src={marketInfo.proj_img} alt="" className='firstImage w-full' style={{ objectFit:"cover", height:"350px" }}/>
                  <div className="body">
                  <div className="author flex justify-between items-center px-4">
                    <img src={logo} alt="" width={"12%"} className='mt-[-1.8rem] bg-[#262626] rounded-full p-2'/>
                    {/* <p className='text-sm mt-1'>the Farmhouse Club</p> */}
                  </div>
                  {/* <h2 className='font-bold text-lg pl-3 mt-2 mb-5'>Farm House Club</h2> */}
                  <div className='flex items-center px-3 justify-between'>
                    <h2 className='font-bold text-lg mt-2 mb-5'>{marketInfo.project_name}</h2>
                    <div>
                      {!marketInfo.close === false ? 
                      <div className='flex items-center gap-2 border border-gray-700 text-sm rounded-md py-1 px-3'>
                        <span class="relative flex h-3 w-3">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        <p>Closed</p>
                      </div>
                      :
                      <div className='flex items-center gap-2 border border-gray-700 text-sm rounded-md py-1 px-3'>
                        <span class="relative flex h-3 w-3">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <p>Active</p>
                      </div>
                      }
                    </div>
                  </div>
                  <div className='footer flex items-center justify-between mt-9 px-4 pb-4 gap-3'>
                    <div className='w-full p-2 rounded-[5px]'>
                      <p className='text-gray-500 font-[600] mb-2'>TVL</p>
                      <h2 className='font-bold text-xl'>{(marketInfo.tvl).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</h2>
                    </div>
                    <div className='w-full p-2 rounded-[5px]'>
                      <p className='text-gray-500 font-[600] mb-2'>APY</p>
                      <h2 className='font-bold text-xl'>{marketInfo.apy === null ? "0" : marketInfo.apy}</h2>
                    </div>
                  </div>
                  <div className='footer flex items-center justify-between px-4 pb-4 gap-3'>
                    <div className='w-full p-2 rounded-[5px]'>
                      <p className='text-gray-500 font-[600] mb-2'>Profit Yield</p>
                      <h2 className='font-bold text-xl'>{marketInfo.profit_yield}</h2>
                    </div>
                    <div className='w-full p-2 rounded-[5px]'>
                      <p className='text-gray-500 font-[600] mb-2'>TVR</p>
                      <h2 className='font-bold text-xl'>{marketInfo.tvr === null ? "0" : (marketInfo.tvr).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</h2>
                    </div>
                  </div>
                  <div className='footer flex items-center justify-between px-4 pb-4 gap-3'>
                  <div className='w-full p-2 rounded-[5px]'>
                      <p className='text-gray-500 font-[600] mb-2'>Amount Invested</p>
                      <h2 className='font-bold text-xl'>${myInvestMentInfo && (myInvestMentInfo.amount_invested).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</h2>
                    </div>
                    <div className='w-full p-2 rounded-[5px]'>
                      <p className='text-gray-500 font-[600] mb-2'>My Profit</p>
                      <h2 className='font-bold text-xl'>{myInvestMentInfo && myInvestMentInfo.my_profit}%</h2>
                    </div>
                  </div>

                  <div className='footer flex items-center justify-between px-4 pb-4 gap-3'>
                    <div className='w-full p-2 rounded-[5px]'>
                      <div className='' style={{ border:"none" }}>
                        <p className='text-gray-500 font-[600] mb-2'>Investment Date</p>
                      <h2 className='font-bold text-xl'>{myInvestMentInfo && new Date(myInvestMentInfo.date_invested).toDateString().split(" ").slice(1, 4).join(" ")}</h2>
                      </div>
                    </div>
                  </div>

                  {/* <div className='footer flex items-center justify-between px-4 pb-4 gap-3'>
                    <div className='w-full p-2 rounded-[5px]'>
                      <div className='flex items-center justify-between' style={{ border:"none" }}>
                        <p className='text-gray-500 font-[600] mb-2'>Vesting Period</p>
                        <div className='hidden sm:block' style={{ border:"none" }}>
                          {+numberOfDaysRemaining > 0 && <i class="ri-time-line text-[#1AC888]"></i>}
                          {+numberOfDaysRemaining === 0 && <i class="ri-time-line text-[yellow]"></i>}
                          {+numberOfDaysRemaining < 0 && <i class="ri-time-line text-[red]"></i>}
                        </div>
                      </div>
                      <div className='block sm:flex items-center justify-between' style={{ border:"none" }}>
                        <h2 className='font-bold text-xl mb-2 sm:mb-0'>{marketInfo.vesting_period}</h2>
                        {numberOfDaysRemaining > 0 ? 
                          <p>{numberOfDaysRemaining} Days Remaining</p> : numberOfDaysRemaining === 0 ? 
                          <p>Less than a day</p> : <p>Vesting period expired</p> 
                        }
                      </div>
                    </div>
                  </div> */}
                  </div>
              </div>

              <div className="w-full">
                <div className='marketCard mb-5'>
                  <div className="tabHeader flex items-center justify-between pt-3 text-center font-bold">
                    <div className='tabBtn w-full p-3' onClick={() => {
                      setDepositTab(true)
                      setWithdrawTab(false)
                      setCurrentTab("Deposit")
                    }}>
                      {currentTab === "Deposit" ? <p className='text-[#1AC888]'>Deposit</p> : <p>Deposit</p>}
                      {/* {currentTab && currentTab === "Deposit" <p className='text-[#1AC888]'>Deposit</p>} */}
                    </div>
                    <div className='tabBtn w-full p-3'onClick={() => {
                      setDepositTab(false)
                      setWithdrawTab(true)
                      setCurrentTab("Withdrawal")
                    }}>{currentTab === "Withdrawal" ? <p className='text-[#1AC888]'>Withdraw</p> : <p>Withdraw</p>}</div>
                  </div>
                  <div className="body">
                    <div className="author flex justify-between items-center px-1 mt-5 gap-1 ml-3 py-2 rounded">
                        {currentTab}
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
                      <input type="number" className='depositFee font-bold text-3xl py-1 ml-5 bg-transparent outline-none my-3 w-full' value={stakeInput} onChange={(e)=> setStakeInput(e.target.value)} placeholder='0.0' style={{ color:"#000" }}/>
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
                  {depositTab && 
                    <div className='flex items-center justify-between my-2 font-medium'>
                      <p>Deposit Fee</p>
                      <p>{stakeInput}</p>
                    </div>
                  }
                  {withdrawTab && 
                    <div className='flex items-center justify-between my-2 font-medium'>
                      <p>Withdraw Fee</p>
                      <p>0</p>
                    </div>
                  }
                  <div className='flex items-center justify-between font-medium'>
                    <p>Network Fee</p>
                    <p>0.2 XLM</p>
                  </div>
                  <div className='flex items-center justify-between font-medium mt-2'>
                    <p>Total</p>
                    <p>{stakeInput + 0.2}</p>
                  </div>
                </div>
                {depositTab && 
                <>
                  {stakeInput <= 0 ? 
                    <button className='cursor-not-allowed mt-5 rounded-md bg-[#1AC888] opacity-50 text-center w-full py-2 font-medium text-white'>Invest ${stakeInput} in this project</button> 
                    : 
                    <button className='mt-5 rounded-md bg-[#1AC888] text-center w-full py-2 font-medium text-white' onClick={()=> setConfirmProjectInvestModal(true)}>Invest ${stakeInput} in this project</button> }
                </>
                }

                {withdrawTab && 
                <>
                  {stakeInput <= 0 ? 
                    <button className='cursor-not-allowed mt-5 rounded-md bg-[#1AC888] opacity-50 text-center w-full py-2 font-medium text-white'>Withdraw ${stakeInput}</button> 
                    : 
                    <button className='mt-5 rounded-md bg-[#1AC888] text-center w-full py-2 font-medium text-white' onClick={()=> setConfirmProjectInvestModal(true)}>Invest ${stakeInput} in this project</button> }
                </>
                }
              </div>

                <div>
                  <h4 className='text-xl font-bold my-4'>Project Description</h4>
                  {!fullProjectDesc &&
                   <>
                     <p className='text-justify' dangerouslySetInnerHTML={{__html: marketInfo.description.slice(0, 150)}}/> <span className='text-[#1AC888] underline mt-3 cursor-pointer' onClick={() => setFullProjectDesc(true)}>Read more</span>
                  </>
                  }
                 {fullProjectDesc && 
                  <>
                    <p className='text-justify' dangerouslySetInnerHTML={{__html: marketInfo.description}}/> <span className='text-[#1AC888] underline mt-3 cursor-pointer' onClick={() => setFullProjectDesc(false)}>Collapse</span>
                  </>
                 }
                  
                  <ul className='mt-5'>
                    <li className='my-2 border border-[#595959] rounded-md p-2'>
                      <p className='text-gray-500 font-[600]'>Maturity Date</p>
                      <p>12-10-2020</p>
                    </li>
                    <li className='my-4 border border-[#595959] rounded-md p-2'>
                      <p className='text-gray-500 font-[600]'>Unit Price</p>
                      <p>{(marketInfo.unit_price).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
                    </li>
                    <li className='my-4 border border-[#595959] rounded-md p-2'>
                      <p className='text-gray-500 font-[600]'>Investment Type</p>
                      <p>{marketInfo.project_type}</p>
                    </li>
                    <li className='my-2 border border-[#595959] rounded-md p-2'>
                      <p className='text-gray-500 font-[600]'>Vesting Period</p>
                      <p>{marketInfo.vesting_period}</p>
                      <div className="flex items-center gap-5">
                        {numberOfDaysRemaining > 0 ? 
                          <p>{numberOfDaysRemaining} Days Remaining</p> : numberOfDaysRemaining === 0 ? 
                          <p>Less than a day</p> : <p>Vesting period expired</p> 
                        }
                        <div className='hidden sm:block' style={{ border:"none" }}>
                          {+numberOfDaysRemaining < 0 && <i class="ri-time-line text-[red]"></i>}
                          {+numberOfDaysRemaining === 0 && <i class="ri-time-line text-[yellow]"></i>}
                          {+numberOfDaysRemaining > 0 && <i class="ri-time-line text-[#1AC888]"></i>}
                        </div>
                      </div>
                    </li>
                  </ul>
                  <button className='mt-4 border border-[#1AC888] hover:bg-[#1AC888] transition-all text-white p-2 w-full rounded-md'>Download full project description</button>
                </div>

                <div class="box">
                  <h1 className='text-xl font-bold my-4'>Project Timeline</h1>
                  <ul>
                  {timeLine &&
                    timeLine.map((timeline) => (
                    <li className='relative'>
                          <span></span>
                          <div class="title">{timeline.timeline_title}</div>
                          <div class="info">{timeline.timeline_description}</div>
                          {timeline.status === "In progress" && <div class="name">
                            <span className='bg-yellow-600 px-2"'>{timeline.status}</span>
                          </div>
                          }
                          {timeline.status === "Completed" && <div class="name">
                            <span className='bg-green-600 px-2"'>{timeline.status}</span>
                          </div>
                          }
                          {console.log(timeline.status)}
                          <div class="time">
                              <span>{new Date(timeline.start_date).toDateString().split(" ").slice(1, 3).join(" ")}</span>
                              <span>{new Date(timeline.end_date).toDateString().split(" ").slice(1, 3).join(" ")}</span>
                          </div>
                      </li>
                    ))}
                  </ul>
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
                <h1>Project Name: {marketInfo.project_name}</h1>
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