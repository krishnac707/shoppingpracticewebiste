import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Profile = () => {

    const { login } = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const router = useNavigate();

    const handlingForm = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("CurrentUser"))
        if (!currentUser) {
            router('/login')
        }
        const allUser = JSON.parse(localStorage.getItem("Users"))
        for (var i = 0; i < allUser.length; i++) {
            if(allUser[i].email == currentUser.email && allUser[i].password == currentUser.password){
                setUserData(allUser[i])
            }
        }
    },[])

    const formValidation =() => {
        const currentUser = JSON.parse(localStorage.getItem("CurrentUser"))
        const allUser = JSON.parse(localStorage.getItem("Users"))
        for (var i = 0; i < allUser.length; i++) {
            if(allUser[i].email == currentUser.email && allUser[i].password == currentUser.password){
                allUser[i].name = userData.name;
                allUser[i].password = userData.password;
                currentUser.name= userData.name;
                currentUser.password = userData.password; 
            }
        }
        login(currentUser)
        localStorage.setItem("Users",JSON.stringify(allUser));
        localStorage.setItem("Currentuser",JSON.stringify(currentUser));
        setUserData({});
        toast.success("profile updated");
    }

    return (
        <div className='register-body-main'>
            <div className='register-inside-body'>
                <form onSubmit={formValidation}>
                    <input className='form-input-css' type="text" value={userData.name} name='name' onChange={handlingForm} />
                    <input className='form-input-css' type="text" value={userData.password} name="password" onChange={handlingForm} />
                    <input className='form-submit-css' type="submit" value="Update Profile" />
                </form>
            </div>
        </div>
    )
}

export default Profile
