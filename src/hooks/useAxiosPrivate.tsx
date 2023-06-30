import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                console.log("REQUEST intercept")
                console.log(auth.accessToken)
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                console.log("RESPONSE intercept")
                console.log(auth.accessToken)
                const prevRequest = error?.config;
                if (error?.response && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    console.log("newAccessToken")
                    console.log(newAccessToken)
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;