// import logo from './logo.svg';
// import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './component/register/Register';
import Login from './component/login/Login';
import Navbar from './global/Navbar';
import Home from './global/Home';
import AllProducts from './component/all-product/AllProducts';
import AddProducts from './component/add-product/AddProducts';
import SingleProduct from './component/single-product/SingleProduct';
import Cart from './component/cart/Cart';
import Profile from './component/profile/Profile';
import UpdateProduct from './component/update-product/UpdateProduct';

function App() {
    return (
        <>
            <Navbar></Navbar>
            <Routes>
                <Route exact path='/registration' element={<Register />} />
                <Route exact path='/login' element={<Login />} /> 
                <Route exact path='/' element={<Home /> } />
                <Route exact path='/all-products' element={<AllProducts/>} />
                <Route exact path='/single-product/:id' element={<SingleProduct />} />
                <Route exact path='/add-product' element={<AddProducts/>} />
                <Route exact path='/cart' element={<Cart />} />
                <Route exact path='/profile' element={<Profile />} />
                <Route exact path='/update-product/:id' element={<UpdateProduct/>} />
            </Routes>
        </>
    );
}

export default App;
