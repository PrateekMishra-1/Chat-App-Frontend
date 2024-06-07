import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';
import { USER_API_END_POINT } from '../utils/constant';

const Sidebar = () => {
    const navigate = useNavigate()

    const [search, setSearch] = useState('')
    const { otherUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`)
            navigate("/login")
            toast.success(res.data.message);
            dispatch(setAuthUser(null))
        } catch (error) {
            console.log(error);
        }
    }

    const searchSubmitHandler = (e) => {

        e.preventDefault();

        const conversationUser = otherUsers?.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase()))

        if (conversationUser) {
            dispatch(setOtherUsers([conversationUser]))
        }
        else {
            toast.error("User not found!")
        }
    }

    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2'>
                <input value={search} onChange={(e) => setSearch(e.target.value)} className='input input-bordered rounded-md' type="text" placeholder='Search...' />
                <button type='submit' className='btn bg-zinc-500 text-white'>
                    <BiSearchAlt2 className='w-6 h-6 outline-none' />
                </button>
            </form>
            <div className='divider px-3'></div>
            <OtherUsers />
            <div className='mt-2'>
                <button onClick={logoutHandler} className='btn btn-sm '>Logout</button>
            </div>
        </div>
    )
}

export default Sidebar