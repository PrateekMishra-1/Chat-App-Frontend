import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setOtherUsers } from '../redux/userSlice';
import { USER_API_END_POINT } from '../utils/constant';

const useGetOtherUsers = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${USER_API_END_POINT}/`);

                console.log(res);
                dispatch(setOtherUsers(res.data))

            } catch (error) {
                console.log(error);
            }
        }

        fetchOtherUsers();
    }, [])
}

export default useGetOtherUsers
