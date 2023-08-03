import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import './Login.css';

const Login = () => {

    const {login} = useContext(AuthContext)
    const [currentuser, setCurrentUser] = useState({ email: "", password: "" });
    const router = useNavigate();

    const handleValue = (event) => {
        setCurrentUser({ ...currentuser, [event.target.name]: event.target.value })
    }

    const formSubmit = (event) => {
        event.preventDefault();
        var flag = false;
        if(currentuser.email && currentuser.password){
            const user = JSON.parse(localStorage.getItem("Users"));
            for (let i = 0; i < user.length; i++) {
                if(currentuser.email == user[i].email && currentuser.password == user[i].password){
                     localStorage.setItem("CurrentUser",JSON.stringify(user[i]))
                     login(user[i])
                     toast.success("Login Successful");
                     router("/");
                     setCurrentUser({email :"",password:""})
                     flag = true;
                     break;
                }
            }
            if(flag == false){
                toast.error("Email or Password is incorrect");
            }
        }
        else
        {
            toast.error("Please Fill All Detail");
        }
    }


    return (
        <div className='register-body-main'>
            <div className='register-inside-body'>
                <form onSubmit={formSubmit}>
                    <input className='form-input-css' type="email" value={currentuser?.email} name='email' onChange={handleValue} placeholder='Enter Email' />
                    <input className='form-input-css' type="password" value={currentuser.password} name="password" onChange={handleValue} placeholder='Enter Password' />
                    <input className='form-submit-css' type="submit" value="Login" />
                </form>
                <p>To create new account <span className='span-color-login' onClick={()=>router('/registration')}>click Here</span></p>
            </div>
        </div>
    )
}

export default Login