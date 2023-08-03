import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css'
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Navbar = () => {

    const { state, login, logout } = useContext(AuthContext);
    const [userdata, setUserdata] = useState();
    const router = useNavigate();
    // console.log(userdata,'11');

    useEffect(() => {
        if (state?.user) {
            setUserdata(state?.user)
        }
        else {
            setUserdata({});
        }
    }, [state])

    const redirectLogin = () => {
        console.log(userdata.name,"name");
        if (userdata?.name) {
            router('/profile');
        }
        // else{
        // toast.error("Please login first");
        // router('/login');
        // }
    }


    return (
        <div className='navbar-body'>
            <div className="navbar-left">
                <img onClick={() => router('/')} src="https://www.shoppersstop.com/_ui/updated_path/images/shopperstopimgaes_web/newLogo.svg" alt="" />
            </div>
            <div className="navbar-right">
                <div><h3 onClick={() => router('/all-products')}>All Products</h3></div>
                {userdata?.role == "Seller" && <div><h3 onClick={() => router('/add-product')}>Add Product</h3></div>}
                {userdata?.email ? <div><h3 onClick={redirectLogin}>{userdata.name}</h3></div> : <div ><h3 onClick={redirectLogin}>Profile</h3></div>}
                {userdata?.role == "Buyer" && <div><h3 onClick={() => router('/cart')}>Cart</h3></div>}
                {userdata?.email ? <div><h3 onClick={logout}>Logout</h3></div> : <div><h3 onClick={() => router("/login")}>Login</h3></div>}
            </div>
        </div>
    )
}

export default Navbar
