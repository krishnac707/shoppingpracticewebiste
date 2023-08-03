import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css'
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const { state, login, logout } = useContext(AuthContext);
  const [userdata, setUserdata] = useState();
  const router = useNavigate();

  useEffect(() => {
    if (state?.user) {
      setUserdata(state?.user)
    }
    else {
      setUserdata({});
    }
  }, [state])

  return (
    <div className="home-body">
      {userdata && <div>
        {userdata.role == "Seller" && <h3>Hello {userdata.name} seller</h3>}
        {userdata?.role == "Buyer" && <h3>hello {userdata.name} Buyer</h3>}
      </div>}
      <div className='home-image'>
        <img src="https://sslimages.shoppersstop.com/sys-master/root/h1b/he3/30383586738206/Menswear_top-banner-web_hp-main-caeousl23127.jpg" alt="" />
      </div>
    </div>
  )
}

export default Home
