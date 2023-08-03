import React, {  useEffect, useState } from 'react'
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Cart = () => {

    const [usercart, setUsercart] = useState([]);
    const [finalPrice, setFinalPrice] = useState();
    const router = useNavigate();

    // console.log(userCart,"11");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("CurrentUser"));
        if (user?.email) {
            const allUser = JSON.parse(localStorage.getItem("Users"));
            for (var i = 0; i < allUser.length; i++) {
                if (allUser[i].email == user.email && allUser[i].password == user.password) {
                    setUsercart(allUser[i].cart);
                    break;
                }
            }
        }
        else {
            toast.error("Please Login first to add product");
            router("/login");
        }
    }, [])

    useEffect(() => {
        var totalPrice = 0
        if (usercart?.length) {
            for(var i = 0;i<usercart.length;i++){
                totalPrice = totalPrice + parseInt(usercart[i].price);
            }
            setFinalPrice(totalPrice);
        }
    }, [usercart])

    const buyProduct = () => {
        const user = JSON.parse(localStorage.getItem("CurrentUser"));
        if (usercart.length) {
            if (user?.email) {
                const allUser = JSON.parse(localStorage.getItem("Users"));
                for (var i = 0; i < allUser.length; i++) {
                    if (allUser[i].email == user.email && allUser[i].password == user.password) {
                        allUser[i].cart = [];
                        localStorage.setItem("Users", JSON.stringify(allUser));
                        break;
                    }
                }
                setFinalPrice(0);
                setUsercart([]);
                return toast.success("Product will delivered Soon!!!")
            }
        }
        else {
            toast.error("please add product first")
            router('/all-products')
        }
    }

    const removeProduct = (id) => {
        const user = JSON.parse(localStorage.getItem("CurrentUser"));
        var removeItem;
        if (user?.email) {
            const allUser = JSON.parse(localStorage.getItem("Users"));
            for (var i = 0; i < allUser.length; i++) {
                if (allUser[i].email == user.email && allUser[i].password == user.password) {
                    removeItem = usercart.filter((item) => item.id !== id);
                    allUser[i].cart = removeItem;
                    localStorage.setItem("Users", JSON.stringify(allUser));
                    break;
                }
            }
        }
        setFinalPrice(0);
        setUsercart(removeItem);
    }


    return (
        <div className='cart-heading'>
            <h1 className='cart-heading-div'>cart</h1>
            <div className="cart-whole-div">
                <div className='inside-cart-div'>
                    {
                        usercart?.length ? <div className='cart-outside-css'>
                            {usercart.map((cartProduct) => (
                                <div className='cart-product-css'>
                                    <img src={cartProduct.image} alt="" />
                                    <h3>{cartProduct.name} {cartProduct.category}</h3>
                                    <h3>Price : {cartProduct.price} RS</h3>
                                    <button className='button-single-product' style={{ width: "50%", marginTop: "5%" }} onClick={() => removeProduct(cartProduct.id)}>Remove Product</button>
                                </div>
                            ))
                            }
                        </div>
                            : <h1>No Product in the cart</h1>
                    }
                </div>
                <div className="right-cart-div">
                    <h2 style={{ textAlign: "center" }}>Total</h2>
                    <h3>Original Amount : {finalPrice && finalPrice + finalPrice} Rs</h3>
                    <h3>Final Amount : {finalPrice && finalPrice} Rs</h3>
                    <button onClick={buyProduct} className='button-single-product' style={{ marginLeft: "35%" }}>Buy Now</button>
                </div>
            </div>
        </div>
    )
}

export default Cart