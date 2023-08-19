import {useEffect} from 'react'
import LoggedInNav from '../../components/navbar/LoggedInNav'

const Governance = ({changemode, mode}) => {
  const user = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    if(!user) navigate("/")
  },[])
  return (
    <div className='h-[100vh]'>
        <LoggedInNav changemode={changemode} mode={mode}/>
        Governance
    </div>
  )
}

export default Governance