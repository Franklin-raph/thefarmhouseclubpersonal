import LoggedInNav from "../../components/navbar/LoggedInNav"



const Dashboard = () => {



    // console.log(user.public_key)

  return (
    <div>
       
        <LoggedInNav />
        <div className="balance">
            <p>Balance</p>
        </div>
    </div>
  )
}

export default Dashboard