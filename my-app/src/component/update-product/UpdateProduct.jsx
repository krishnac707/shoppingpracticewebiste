import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const UpdateProduct = () => {

    const { id } = useParams();
    const [productData, setproductData] = useState({});
    const [singleProduct, setSingleProduct] = useState();
    const router = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("CurrentUser"));
        if (user) {
            if (user?.role == "Buyer") {
                toast.error("You are not a seller");
                router('/')
            }
        }
        else {
            toast.error("Please login first");
            router('/login')
        }
    }, [])

    const handlingForm = (event) => {
        setSingleProduct({ ...singleProduct, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        const product = JSON.parse(localStorage.getItem("Products"));
        if (product) {
            setproductData(product);
        }
    }, [])

    useEffect(() => {
        if (id && productData.length) {
            const result = productData.find((product) => product.id == id)
            console.log(result, "result");
            setSingleProduct(result);
        }
    }, [productData, id])

    const formValidation = () => {
        const product = JSON.parse(localStorage.getItem("Products"));
        for (var i = 0; i < product.length; i++) {
            if (product[i].id == id) {
                product[i].name = singleProduct.name;
                product[i].price = singleProduct.price;
                product[i].image = singleProduct.image;
            }
        }
        localStorage.setItem("Products", JSON.stringify(product));
        setSingleProduct({});
        toast.success("product updated");
    }


    return (
        <div className='register-body-main'>
            <div className='register-inside-body'>
                {singleProduct &&
                <form onSubmit={formValidation}>
                    <input className='form-input-css' type="text" value={singleProduct.name} name='name' onChange={handlingForm} />
                    <input className='form-input-css' type="text" value={singleProduct.price} name="price" onChange={handlingForm} />
                    <input className='form-input-css' type="text" value={singleProduct.image} name='image' onChange={handlingForm} />
                    <input className='form-submit-css' type="submit" value="Update Profile" />

                </form>
                }
            </div>
        </div>
    )
}

export default UpdateProduct