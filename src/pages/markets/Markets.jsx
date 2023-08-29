import LoggedInNav from '../../components/navbar/LoggedInNav'
import cardImage1 from '../../assets/images/processingPlantImages.jpg'
import logo from "../../assets/images/thefarmhouseclublogo2.png.crdownload.png"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LoaderComponent from '../../components/loaderComponent/LoaderComponent'

const Markets = ({changemode, mode, baseUrl}) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const [investMents, setInvestMents] = useState()
  const [loadMarketsContent, setLoadMarketsContent] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if(!user) navigate("/")
    getInvestMentList()
  },[])

  async function getInvestMentList(){
    setLoadMarketsContent(true)
    const response = await fetch(`${baseUrl}/investments/`,{
      headers: {
        "Content-Type" : "application/json",
        Authorization: `Bearer ${user.access}`
      },
    })
    if(response) setLoadMarketsContent(false)
    const data = await response.json()
    console.log(response, data)
    if(response.ok){
      setInvestMents(data)
    }
  }

  function toggleNav(){
    document.querySelector(".market-nav").classList.toggle("showMarketNav")
  }

  return (
    <div className='marketPlace h-[100%]'>
        <LoggedInNav changemode={changemode} mode={mode} />
        {loadMarketsContent && 
          <div className='dashboardContentLoaderBg'>
              <LoaderComponent />
          </div>
          }
        <div className='py-5 relative'>
          <div className='market-nav'>
            <li>Processing</li>
            <li>Production</li>
            <li>Logistics</li>
            <li>Trading</li>
          </div>
          <div className='marketToggler fixed right-[5%] top-[20%] flex items-center gap-1 px-2 rounded-[5px]' style={{ border:"1px solid gray", zIndex:"99" }} onClick={()=> toggleNav()}>
            <p>Menu</p>
            <i className='ri-menu-line text-xl'></i>
          </div>
        </div>
        <div className="marketCardContainer mt-[9rem] relative left-[7%] w-[75%] mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {investMents && 
            investMents.map(investMent => (
              <div className="marketCard w-full cursor-pointer" onClick={()=> navigate(`/marketinfo/${investMent.id}`)}>
                <img src={investMent.proj_img} alt="" className='firstImage w-full' style={{ objectFit:"cover", height:"150px" }}/>
                  <div className="body">
                  <div className="author flex justify-between items-center px-4">
                    <img src={logo} alt="" width={"18%"} className='mt-[-1.8rem] bg-[#262626] rounded-full p-2'/>
                    {/* <p className='text-sm mt-1'>the Farmhouse Club</p> */}
                  </div>
                  <div className='flex items-center justify-between px-3'>
                    <h4 className='font-bold mt-2 mb-5'>{investMent.project_name}</h4>
                    {investMent.close === false ? 
                      <span class="relative flex h-3 w-3">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                      :
                      <span class="relative flex h-3 w-3">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                    }
                  </div>
                  <div className='footer flex items-center justify-between mt-5 px-4 pb-4 gap-3'>
                    <div className='w-full p-2 rounded-[5px]'>
                      <p className='font-bold'>TVR</p>
                      <h2 className='font-bold text-xl'>{investMent.tvl}</h2>
                    </div>
                    <div className='w-full p-2 rounded-[5px]'>
                      <p className='font-bold'>APY</p>
                      <h2 className='font-bold text-xl'>{investMent.apy === null ? "0" : investMent.apy}</h2>
                    </div>
                  </div>
                  <div className='footer flex items-center justify-between mt-1 px-4 pb-4 gap-3'>
                    <div className='w-full p-2 rounded-[5px]'>
                      <p className='font-bold'>Profit Yield</p>
                      <h2 className='font-bold text-xl'>{investMent.profit_yield}</h2>
                    </div>
                    <div className='w-full p-2 rounded-[5px]'>
                      <p className='font-bold'>Cost</p>
                      <h2 className='font-bold text-xl'>{investMent.cost === null ? "0" : investMent.cost}</h2>
                    </div>
                  </div>
                  </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default Markets