import {useState} from 'react'
import LoggedInNav from '../../components/navbar/LoggedInNav'
import AVDACoin from "../../assets/images/advaDashboardToken.png"
import stellar from "../../assets/images/Stellar_Symbol.png"

const Dashboard = () => {

  const user = JSON.parse(localStorage.getItem("user"))
  const [walletModal, setWalletModal] = useState(false)
  const [loadingAccount, setLoadingAccount] = useState(false)
  const [fundAccount, setFundAccount] = useState(false)
  const [error, setError] = useState("")
  console.log(user.public_key)

  async function connectAccount(){
      setLoadingAccount(true)
      const response = await fetch(`https://horizon-testnet.stellar.org/accounts/${user.public_key}`)
      const data = await response.json()
      if(response) {
          setLoadingAccount(false)
          setWalletModal(false)
      }

      if(response.status === 404) {
          setError("Unfunded account. Please fund your account")
          setFundAccount(true)
      }
      console.log(data)
  }

  return (
    <div className='market h-[100vh]'>
        <LoggedInNav fundAccount={fundAccount}/>
        <div className='py-2 px-5'>
            <h3 className='font-bold text-xl text-gray-500 mt-[5rem] text-center'>Welcome {user && user.user.username}, to Your Farmhouse Club Dashboard</h3>
            <div className='flex flex-col justify-center items-center text-center w-[80%] mx-auto mt-[6rem]'>
                <div className="connectWalletBox bg-[#84b943f7] w-full rounded-md py-5 text-white">
                    <img src={AVDACoin} alt="" style={{ width:"15%", margin:"-7rem auto 0" }}/>
                    <h3 className='font-bold'>Please, connect your account</h3>
                    <p className='my-5'>
                        Please connect your account to see your staked projects and return on investments.
                    </p>
                    <button className="bg-[#fff] w-[auto] mb-5 py-2 px-4 rounded-[6px] text-[#83B943] cursor-pointer" onClick={()=> setWalletModal(true)}>Connect Account</button>
                </div>
            </div>
        </div>
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
            <div className="connectAccountLoader fixed top-[50%] left-[50%] text-[#84b943f7]">
                <i className="fa-solid fa-gear fa-spin mb-4 text-3xl"></i>
            </div>
        }
        {error &&
            <div className="errorModalBg">
                <div className="failureModal" style={{ position:"relative" }}>
                    <i className="ri-close-circle-line cursor-pointer" style={{ fontSize:"20px", position:"fixed", top:"40%", right:"31%" }} onClick={()=> setError(false)}></i>
                    <i className="ri-close-circle-line text-red-600"></i>
                    <p>{error}</p>
                </div>
            </div>
        }
    </div>
  )
}

export default Dashboard