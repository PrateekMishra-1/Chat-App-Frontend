import React from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { USER_API_END_POINT } from '../utils/constant'

const Signup = () => {

  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  })

  const navigate = useNavigate();

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender: gender })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })

      if (res?.data?.success) {
        navigate('/login')
        toast.success(res?.data?.message)
      }

    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.log(error);
    }

    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: ""
    })
  }
  return (
    <div className='min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center text-black'>Signup</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className='label p-2'><span className='text-base label-text text-black'>Full Name</span></label>
            <input value={user.fullName} onChange={(e) => setUser({ ...user, fullName: e.target.value })} className='w-full input input-bordered h-10 bg-white' type="text" placeholder='Full Name' />
          </div>
          <div>
            <label className='label p-2'><span className='text-base label-text text-black'>Username</span></label>
            <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className='w-full input input-bordered h-10 bg-white' type="text" placeholder='Username' />
          </div>
          <div>
            <label className='label p-2'><span className='text-base label-text text-black'>Password</span></label>
            <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className='w-full input input-bordered h-10 bg-white' type="password" placeholder='Password' />
          </div>
          <div>
            <label className='label p-2'><span className='text-base label-text text-black'>Confirm Password</span></label>
            <input value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} className='w-full input input-bordered h-10 bg-white' type="password" placeholder='Confirm Password' />
          </div>
          <div className='flex items-center my-4'>
            <div className='flex items-center'>
              <p className='text-black'>Male</p>
              <input checked={user.gender === "male"} onChange={() => handleCheckbox("male")} type="checkbox" defaultChecked className="checkbox mx-2" />
            </div>
            <div className='flex items-center'>
              <p className='text-black'>Female</p>
              <input checked={user.gender === "female"} onChange={() => handleCheckbox("female")} type="checkbox" className="checkbox mx-2" />
            </div>
          </div>
          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700 bg-white'>Signup</button>
          </div>
          <p type='submit' className='text-center text-black my-2'>Already have an account?<Link to={"/login"}>  Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signup