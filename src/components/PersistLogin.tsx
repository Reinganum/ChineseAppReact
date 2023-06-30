import {Outlet} from "react-router-dom";
import {useState, useEffect} from 'react';
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin=()=>{
    const [isLoading,setIsLoading]=useState<boolean>(true);
    const refresh=useRefreshToken();
    const {auth}=useAuth();
    useEffect(()=>{
        let isMounted=true;
        const verifyAccessToken=async()=>{
            try{
                console.log('trying to get new accessToken')
                await refresh();
            } catch( error){
                console.log(error)
            }
            finally{
               isMounted && setIsLoading(false)
            }
        }
        !auth?.accessToken ? verifyAccessToken() : setIsLoading(false);
    },[]);
    useEffect(()=>{
        console.log(isLoading)
        console.log(`AToken: ${JSON.stringify(auth?.accessToken)}`)
    },[isLoading])
    return (
        <>
            {
                isLoading
                ? <p>Loading...</p>
                : <Outlet/>
            }
        </>
    )
}

export {PersistLogin};