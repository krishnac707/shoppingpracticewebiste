import React, { useEffect, useState } from 'react';
import './AllProducts.css';
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {

  const [isProductPresent, setProductPresent] = useState(false)
  const [allProducts, setAllProducts] = useState();
  const router = useNavigate();

  console.log(allProducts,"11");

  useEffect(() => {
    const product = JSON.parse(localStorage.getItem("Products"));
    if (product) {
      setAllProducts(product);
      setProductPresent(true);
    }
    else {
      setProductPresent(false)
    }
  }, [])

  const redirect = (id) => {
    router(`/single-product/${id}`)
  }

  return (
    <div className='all-product-body'>
      {
        !isProductPresent ?
          <div className='no-product-div-show'>
            <h1>No Products</h1>
          </div>
          :
          <>
            <h1 className='all-product-heading'>All Products</h1>
            <div className='all-product-show-div'>
              {allProducts && allProducts.map((pro) => (
                <div key={pro.id} className='all-product-single-div' onClick={()=>redirect(pro.id)}>
                  <div className='all-product-image-div'>
                    <img src={pro.image} alt="" />
                  </div>
                  <h3>{pro.name} {pro.category} Shoes</h3>
                  <h3>{pro.price} Rs</h3>
                </div>
              ))}
            </div>
          </>
      }
    </div>
  )
}

export default AllProducts