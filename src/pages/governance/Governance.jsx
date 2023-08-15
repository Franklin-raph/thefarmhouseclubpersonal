import {useEffect} from 'react'
import LoggedInNav from '../../components/navbar/LoggedInNav'

const Governance = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    if(!user) navigate("/")
  },[])
  return (
    <div>
        <LoggedInNav/>
        Governance
    </div>
  )
}

export default Governance