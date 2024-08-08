import React, { useState } from 'react'

const SignUp = () => {
    const [email, setemail]= useState("");
    const [password, setpassword]= useState("");
    const [name, setName]= useState("");
    const [role, setRole]= useState('');

    const handleSignUp = () => {
        console.log(role);
        fetch('http://localhost:5002/user/createuser',{
            method:'POST',
            body : JSON.stringify({
                name, email, password, role
            }),
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include'
        }).then(e=>e.json()).then(e=> console.log(e));
    };
    
  return (
   <>
    <h1>SignUp Page</h1>
    <div>
        <label>
            Enter Name:
            <input onChange={e=> setName(e.target.value)}/>
        </label>
        <label>
            enter email:
            <input onChange={e=>setemail(e.target.value)}/>
        </label>
        <label>
            enter password:
            <input onChange={e=>setpassword(e.target.value)}/>
        </label>
        <label>
            enter Role:
            <select onChange={e=> setRole(e.target.value)}>
                <option value='admin'>admin</option>
                <option  value='student'> Student</option>
            </select>
        </label>
        <button onClick={handleSignUp}>Signup</button>
    </div>
   </>
  )
}

export default SignUp;