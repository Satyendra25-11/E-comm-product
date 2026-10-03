import axios from "axios";
import { useAuth } from "../context/MyContext";
import { use } from "react";


const api = axios.create({
    baseURL: "https://e-comm-product-tawny.vercel.app/api",
    
})


const useApi = ()=>{

    const {accessToken} = useAuth()    

    api.interceptors.request.use(
        (config)=>{
            if(accessToken){
                config.headers.Authorization = `Bearer ${accessToken}`
            }
            return config
        },
        (error)=>{
            return Promise.reject(error)
        }
        
    )
    return api

}


export default useApi