import {useState} from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = useState("")

  async function handleForgotPassword(){

  }

  return (
    <div className='flex justify-center items-center forgotPassword w-full'>
      <form onSubmit={handleForgotPassword} className='flex justify-center items-center flex-col bg-[#84b943f7] p-5 text-white xl:w-[35%] lg:w-[45%] md:w-[55%] sm:w-[65%] w-[80%]'>
        <h1 className='text-xl mb-5'>Password Reset Link</h1>
        <div className="w-full">
          <label htmlFor="email" className='block my-2'>Password Request Link</label>
          <input type="text" placeholder='info@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} className='outline-none py-1 p-3 w-full bg-[#84b943f7] rounded-md border-2 border-white-500 mb-5'/>
        </div>
          <button type='submit' className="my-3 bg-white text-[#84b943f7] py-1 px-3 rounded-md">Submit</button>
          <Link to="/"><i class="fa-solid fa-house"></i> Go back home</Link>
      </form>
    </div>
  )
}

export default ForgotPassword