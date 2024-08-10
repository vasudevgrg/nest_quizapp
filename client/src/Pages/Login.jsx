import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate= useNavigate();

  const handleLogin = () => {
   fetch("http://localhost:5002/user/login",{
    method: 'POST',
    body: JSON.stringify({
        email, password
    }),
    headers:{
        'Content-Type':'application/json'
    },
    credentials:'include'
   }).then(async e=>{
    if(!e.ok){
        const response= await e.json();
        throw new Error(response);
    }
    return e.json();
   }).then(e=> {console.log(e);
    if(e){
        navigate('/');
    }else{
        navigate('/login');
    }
   }).catch((error)=> console.log(error));
};

  return (
    <>
      <h1>Login Page</h1>
      <div>
        <label>
          enter email:
          <input onChange={(e) => setemail(e.target.value)} />
        </label>
        <label>
          enter password:
          <input onChange={(e) => setpassword(e.target.value)} />
        </label>
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
};

export default Login;
