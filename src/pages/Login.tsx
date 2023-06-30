import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function Login() {
  const [form,setForm]=useState<boolean>(true)
  return (
    <>
        <div className="main-container">
            <div className="login-image"></div>
            <div className="form-container">
                {form?<LoginForm setFunction={setForm}/>:<RegisterForm setFunction={setForm}/>}
            </div>
        </div>
    </>
  );
}

export default Login;
