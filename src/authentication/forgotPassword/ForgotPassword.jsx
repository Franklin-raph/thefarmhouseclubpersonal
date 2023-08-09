import {useState} from 'react'

const ForgotPassword = () => {
  const [email, setEmail] = useState("")

  async function handleForgotPassword(){

  }

  return (
    <div className='flex justify-center items-center forgotPassword w-full'>
      <form onSubmit={handleForgotPassword} className='flex justify-center items-center flex-col bg-[#84b943f7] p-3 text-white w-[30%]'>
        <div className="w-full">
          <label htmlFor="email" className='block'>Email</label>
          <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='outline-none py-1 text-black p-3 w-full'/>
        </div>
          <button type='submit' className="mt-3 bg-white text-[#84b943f7] py-1 px-3 rounded-md">Submit</button>
      </form>
    </div>
  )
}

export default ForgotPassword