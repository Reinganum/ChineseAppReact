import { useState } from "react";
import axios from "../api/axios";

type registerFormData={
    email:string,
    password:string,
    repeatPassword:string
}

type props={
    setFunction: React.Dispatch<React.SetStateAction<boolean>>
}

function RegisterForm({setFunction}:props) {
    const REGISTER_URL='/auth/register';
    const [formData,setFormData]=useState<registerFormData>({email:'',password:'',repeatPassword:''})
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }
    const handleSubmit=async(e:React.FormEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const {email,password,repeatPassword}=formData
        if (password!==repeatPassword){
            alert('passwords dont match')
        }
        try{
            const response=await axios.post(REGISTER_URL,formData)
            console.log(response.data)
            setFunction(true)
        }catch(error){
            console.log(error)
        }
    }
    const changeRenderedForm=()=>{
        setFunction(true)
    }
  return (
    <>
        <form onSubmit={e=>handleSubmit}>
            <h1>REGISTER</h1>
            <div className="login-form-container">
                <label htmlFor="email"></label>
                <input value={formData.email} onChange={handleChange} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password"></label>
                <input value={formData.password} onChange={handleChange} type="password" placeholder="*********" id="password" name="password"/>
                <label htmlFor="repeatPassword"></label>
                <input value={formData.repeatPassword} onChange={handleChange} type="password" placeholder="*********" id="repeatPassword" name="repeatPassword"/>
                <button type="submit" onClick={handleSubmit}>Submit</button>
                <a onClick={changeRenderedForm}>Already have an account? Login!</a>
            </div>
        </form>
        
    </>
  );
}

export default RegisterForm;