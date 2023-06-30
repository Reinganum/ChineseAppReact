import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const refresh = async () => {
        const response = await axios.get('auth/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data);
            return {
                ...prev,
                selectedList:response.data.selectedList,
                accessToken: response.data.accessToken,
                userId:response.data.userId,
                auth:true,
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;