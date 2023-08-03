import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {

    const [userdata, setuserdata] = useState({ name: '', email: '', password: '', role: 'Buyer' })
    const router = useNavigate();

    const handleValue = (event) => {
        setuserdata({ ...userdata, [event.target.name]: event.target.value })
    }

    const selectRole = (event) => {
        setuserdata({ ...userdata, ["role"]: event.target.value })
    }

    const formSubmit = (event) => {
        event.preventDefault();
        if (userdata.name && userdata.email && userdata.password) {
            if (userdata.role == "Buyer") {
                const userArray = JSON.parse(localStorage.getItem("Users")) || [];
                console.log(userArray,"24");
                const userObj = {
                    name: userdata.name,
                    email: userdata.email,
                    password: userdata.password,
                    role: userdata.role,
                    cart: []
                }
                userArray.push(userObj);
                localStorage.setItem("Users", JSON.stringify(userArray));
                toast.success("Registration Successfull");
                router("/login");
            }
            else {
                const users = JSON.parse(localStorage.getItem("Users")) || [];
                users.push(userdata);
                localStorage.setItem("Users",JSON.stringify(users));
                toast.success("Registration Successfull");
                router("/login");
            }
        }
        else {
            toast.error("Please Fill All Detail");
        }
    }

    return (
        <div className='register-body-main'>
            <div className='register-inside-body'>
                <form onSubmit={formSubmit}>
                    <input className='form-input-css' type="text" name='name' onChange={handleValue} placeholder='Enter Name' />
                    <input className='form-input-css' type="email" name='email' onChange={handleValue} placeholder='Enter Email' />
                    <input className='form-input-css' type="password" name="password" onChange={handleValue} placeholder='Enter Password' />
                    <select className='form-select-css' onChange={selectRole}>
                        <option value="Buyer">Buyer</option>
                        <option value="Seller">Seller</option>
                    </select>
                    <input className='form-submit-css' type="submit" value="Register" />
                </form>
                <p>Already have account <span className='span-color-login' onClick={() => router('/login')}>click Here</span></p>
            </div>
        </div>
    )
}

export default Register
