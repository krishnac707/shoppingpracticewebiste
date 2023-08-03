import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './SingleProduct.css';
import { AuthContext } from '../../context/auth.context';
import { toast } from 'react-hot-toast';

const SingleProduct = () => {
    const { id } = useParams();
    const [allProducts, setAllProducts] = useState([]);
    const [singleproduct, setSingleProduct] = useState({});
    const [userdata, setUserData] = useState();
    const [isuserLogin, setUserLogin] = useState(false);
    const [currentEmail, setCurrentEmail] = useState("");
    // const { state } = useContext(AuthContext);
    const router = useNavigate();

    // console.log(allProducts,"16");

    useEffect(() => {
        const product = JSON.parse(localStorage.getItem("Products"));
        if (product) {
            for (var i = 0; i < product.length; i++) {
                setAllProducts(product);
            }
        }
    }, [])

    useEffect(() => {
        if (id && allProducts.length) {
            const result = allProducts.find((product) => product.id == id)
            // console.log(result, "result");
            setSingleProduct(result);
        }
    }, [allProducts, id])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("CurrentUser"));
        if (user) {
            setUserLogin(true);
            setUserData(user);
            setCurrentEmail(user?.email);
        }
    }, [])

    const cartProduct = () => {
        if (isuserLogin) {
            if (userdata?.role == "Buyer") {
                const alluser = JSON.parse(localStorage.getItem("Users"));
                for (var i = 0; i < alluser.length; i++) {
                    if (alluser[i].email == currentEmail) {
                        alluser[i]?.cart.push(singleproduct);
                        localStorage.setItem("Users",JSON.stringify(alluser));
                        toast.success("Product Added Successfully");
                        router("/all-products");
                        break;
                    }
                }
            }
            else {
                toast.error("Sorry!!! You are a seller. you won't be able to buy product")
            }
        }
        else {
            toast.error("please login first");
            router('/login');
        }
    }

    const redirect = (id) => {
        router(`/update-product/${id}`);
    }

    return (
        <div>
            {singleproduct &&
                <div className='single-product-main-div'>
                    <div className='single-product-left-div'>
                        <img src={singleproduct.image} alt="" />
                    </div>

                    <div className="single-product-right-div">
                        <p><span>{singleproduct.name}</span> <span>{singleproduct.category}</span> Shoes</p>
                        <div className='single-product-price-margin-css'>
                            <p>{singleproduct.price} Rs</p>
                        </div>
                        <div><button className='button-single-product' onClick={cartProduct}>Add to Cart</button></div>
                        <div>{userdata?.role == "Seller" && <button className='button-single-product' onClick={()=>redirect(singleproduct.id)}>Update product</button>}</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default SingleProduct
