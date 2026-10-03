import React, { useContext } from 'react'
import AuthContext, { useAuth } from '../context/MyContext'
import { Navigate, Outlet, useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import useApi from '../shared/api'
import { useEffect } from 'react'

const PublicRoutes = () => {

    let { loggedInUser, accessToken } = useContext(AuthContext)
    const { openForm, setOpenForm,setAccessToken } = useAuth()
    const api = useApi()
    const navigate = useNavigate()

    useEffect(() => {
            const verifyUser = async () => {

            const response = await api.post(
                        "/auth/refresh-token",
                    );
            setAccessToken(response.data.data.accessToken)
            navigate("/main")
                    

            }

            verifyUser()
        }, [])

    // const user = api.post("/auth/refresh-token")
    // console.log(user);
    

    


    if (accessToken) {
        return (
            <Navigate to={'/main'} />
        )
    }
    const open = () => {
        setOpenForm(false)
    }

    // const close = ()=>{
    //     setOpenForm(false)
    // }

    return (
        <div>
            <Navigate to={''} />
            <Navbar openForm={open} />
            <Outlet />
        </div>
    )
}

export default PublicRoutes