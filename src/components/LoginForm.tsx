import { useState , useEffect} from "react";
import axios from "../api/axios";
import { AxiosError } from "axios";
import useAuth from "../hooks/useAuth";
import { useNavigate , useLocation } from "react-router-dom";

type loginFormData={
    email:string,
    password:string
}
type props={
    setFunction: React.Dispatch<React.SetStateAction<boolean>>
}

const LOGIN_URL='auth/login'

function LoginForm({setFunction}:props) {
    const [errMsg, setErrMsg]=useState('')
    const {auth,setAuth}=useAuth();
    const location=useLocation();
    const navigate=useNavigate();
    const from=location.state?.from?.pathname||'/';
    const [formData,setFormData]=useState<loginFormData>({email:'',password:''});
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if (formData.email===''||formData.password===''){
            return alert('missing required fields');
        }
        try{
            const response=await axios.post(LOGIN_URL,formData,{
                withCredentials: true
            });
            setAuth({auth:true,userId:response.data.userId,accessToken:response.data.accessToken,selectedList:response.data.selectedList,avatar:response.data.avatar});
            console.log(auth)
            navigate('/home');
        } catch(error){
            const err = error as AxiosError
            if (!err?.response){
                alert('No server response')
            } else if (err.response?.status===401){
                alert('User unauthorized')
            } else {
                alert('Login failed')
            }
        }
    }
    const changeRenderedForm=()=>{
        setFunction(false)
    }
  return (
    <>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <h1>LOGIN</h1>
            <div className="login-form-container">
                <label htmlFor="email"></label>
                <input value={formData.email} onChange={handleChange} type="email" placeholder="youremail@gmail.com" id="email" name="email" onFocus={(e) => e.target.placeholder = ""} />
                <label htmlFor="password"></label>
                <input value={formData.password} onChange={handleChange} type="password" placeholder="*********" id="password" name="password"/>
                <button type="submit" onClick={()=>handleSubmit}>Submit</button>
                <a onClick={changeRenderedForm}>Don't have an account? Create new one!</a>
                {auth.auth===true?<h1>{auth.userId}</h1>:null}
            </div>
        </form>
    </>
  );
}

export default LoginForm;