import LoggedInNav from '../../components/navbar/LoggedInNav'
import cardImage1 from '../../assets/images/cover.jpeg'
import logo from "../../assets/images/thefarmhouseclublogo2.png.crdownload.png"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Markets = ({changemode, mode, baseUrl}) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()

  useEffect(() => {
    if(!user) navigate("/")
  },[])
  return (
    <div className='marketPlace h-[100%]'>
        <LoggedInNav changemode={changemode} mode={mode} />
        <div className='py-1 relative top-[17%]'>
          {/* <h1 className='font-bold text-3xl'>The Farm House Club Market Place</h1> */}
        </div>
        <div className="marketCardContainer mt-[7rem] relative left-[7%] w-[75%] mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="marketCard w-full cursor-pointer" onClick={()=> navigate("/marketinfo/123")}>
            <img src={cardImage1} alt="" className='firstImage'/>
              <div className="body">
              <div className="author flex justify-between items-center px-4">
                <img src={logo} alt="" width={"12%"} className='mt-[-1.8rem] bg-[#262626] rounded-full p-2'/>
                <p className='text-sm mt-1'>the Farmhouse Club</p>
              </div>
              <h2 className='font-bold text-lg pl-3 mt-2 mb-5'>Farm House Club</h2>
              <div className='footer flex items-center justify-between mt-9 px-4 pb-4 gap-3'>
                <div className='py-3 w-full p-2 rounded-[5px]'>
                  <p className='font-bold'>TVL</p>
                  <h2 className='font-bold text-xl'>$1.03M</h2>
                </div>
                <div className='py-3 w-full p-2 rounded-[5px]'>
                  <p className='font-bold'>APY</p>
                  <h2 className='font-bold text-xl'>3.2%</h2>
                </div>
              </div>
              </div>
          </div>
          
          <div className="marketCard w-full cursor-pointer" onClick={()=> navigate("/marketinfo/123")}>
            <img src={cardImage1} alt="" className='firstImage'/>
              <div className="body">
              <div className="author flex justify-between items-center px-4">
                <img src={logo} alt="" width={"12%"} className='mt-[-1.8rem] bg-[#262626] rounded-full p-2'/>
                <p className='text-sm mt-1'>the Farmhouse Club</p>
              </div>
              <h2 className='font-bold text-lg pl-3 mt-2 mb-5'>Farm House Club</h2>
              <div className='footer flex items-center justify-between mt-9 px-4 pb-4 gap-3'>
                <div className='py-3 w-full p-2 rounded-[5px]'>
                  <p className='font-bold'>TVL</p>
                  <h2 className='font-bold text-xl'>$1.03M</h2>
                </div>
                <div className='py-3 w-full p-2 rounded-[5px]'>
                  <p className='font-bold'>APY</p>
                  <h2 className='font-bold text-xl'>3.2%</h2>
                </div>
              </div>
              </div>
          </div>
          
          <div className="marketCard w-full cursor-pointer" onClick={()=> navigate("/marketinfo/123")}>
            <img src={cardImage1} alt="" className='firstImage'/>
              <div className="body">
              <div className="author flex justify-between items-center px-4">
                <img src={logo} alt="" width={"12%"} className='mt-[-1.8rem] bg-[#262626] rounded-full p-2'/>
                <p className='text-sm mt-1'>the Farmhouse Club</p>
              </div>
              <h2 className='font-bold text-lg pl-3 mt-2 mb-5'>Farm House Club</h2>
              <div className='footer flex items-center justify-between mt-9 px-4 pb-4 gap-3'>
                <div className='py-3 w-full p-2 rounded-[5px]'>
                  <p className='font-bold'>TVL</p>
                  <h2 className='font-bold text-xl'>$1.03M</h2>
                </div>
                <div className='py-3 w-full p-2 rounded-[5px]'>
                  <p className='font-bold'>APY</p>
                  <h2 className='font-bold text-xl'>3.2%</h2>
                </div>
              </div>
              </div>
          </div>
          
          <div className="marketCard w-full cursor-pointer" onClick={()=> navigate("/marketinfo/123")}>
            <img src={cardImage1} alt="" className='firstImage'/>
              <div className="body">
              <div className="author flex justify-between items-center px-4">
                <img src={logo} alt="" width={"12%"} className='mt-[-1.8rem] bg-[#262626] rounded-full p-2'/>
                <p className='text-sm mt-1'>the Farmhouse Club</p>
              </div>
              <h2 className='font-bold text-lg pl-3 mt-2 mb-5'>Farm House Club</h2>
              <div className='footer flex items-center justify-between mt-9 px-4 pb-4 gap-3'>
                <div className='py-3 w-full p-2 rounded-[5px]'>
                  <p className='font-bold'>TVL</p>
                  <h2 className='font-bold text-xl'>$1.03M</h2>
                </div>
                <div className='py-3 w-full p-2 rounded-[5px]'>
                  <p className='font-bold'>APY</p>
                  <h2 className='font-bold text-xl'>3.2%</h2>
                </div>
              </div>
              </div>
          </div>
          
          <div className="marketCard w-full cursor-pointer" onClick={()=> navigate("/marketinfo/123")}>
            <img src={cardImage1} alt="" className='firstImage'/>
              <div className="body">
              <div className="author flex justify-between items-center px-4">
                <img src={logo} alt="" width={"12%"} className='mt-[-1.8rem] bg-[#262626] rounded-full p-2'/>
                <p className='text-sm mt-1'>the Farmhouse Club</p>
              </div>
              <h2 className='font-bold text-lg pl-3 mt-2 mb-5'>Farm House Club</h2>
              <div className='footer flex items-center justify-between mt-9 px-4 pb-4 gap-3'>
                <div className='py-3 w-full p-2 rounded-[5px]'>
                  <p className='font-bold'>TVL</p>
                  <h2 className='font-bold text-xl'>$1.03M</h2>
                </div>
                <div className='py-3 w-full p-2 rounded-[5px]'>
                  <p className='font-bold'>APY</p>
                  <h2 className='font-bold text-xl'>3.2%</h2>
                </div>
              </div>
              </div>
          </div>

          <div className="marketCard w-full cursor-pointer" onClick={()=> navigate("/marketinfo/123")}>
            <img src={cardImage1} alt="" className='firstImage'/>
              <div className="body">
              <div className="author flex justify-between items-center px-4">
                <img src={logo} alt="" width={"12%"} className='mt-[-1.8rem] bg-[#262626] rounded-full p-2'/>
                <p className='text-sm mt-1'>the Farmhouse Club</p>
              </div>
              <h2 className='font-bold text-lg pl-3 mt-2 mb-5'>Farm House Club</h2>
              <div className='footer flex items-center justify-between mt-9 px-4 pb-4 gap-3'>
                <div className='py-3 w-full p-2 rounded-[5px]'>
                  <p className='font-bold'>TVL</p>
                  <h2 className='font-bold text-xl'>$1.03M</h2>
                </div>
                <div className='py-3 w-full p-2 rounded-[5px]'>
                  <p className='font-bold'>APY</p>
                  <h2 className='font-bold text-xl'>3.2%</h2>
                </div>
              </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Markets