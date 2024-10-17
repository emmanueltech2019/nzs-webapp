import React, { useState } from 'react'

import productImg from './img/product-1.png'

import Card from '@/components/cards/ProductCard'

import Profile from './Profile'


const SellerProfile = () => {

  const products = [
    { title: "Amazing Shoes", price: "N 12.00", image: productImg },
    { title: "Amazing Shoes", price: "N 12.00", image: productImg },
    { title: "Amazing Shoes", price: "N 12.00", image: productImg },
    { title: "Amazing Shoes", price: "N 12.00", image: productImg },
    { title: "Amazing Shoes", price: "N 12.00", image: productImg },
    { title: "Amazing Shoes", price: "N 12.00", image: productImg },
    { title: "Amazing Shoes", price: "N 12.00", image: productImg },
    { title: "Amazing Shoes", price: "N 12.00", image: productImg },
  ]

  return (
    <div className='px-4 md:w-[95%] m-auto'>
      <div className='md:hidden'>
        <Profile />
      </div>

      <div className='hidden md:grid grid-cols-2 gap-3 mt-36'>
        {
          products.map((product, index) => (
            <div key={index}>
              <Card title={product.title} price={product.price} image={product.image} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SellerProfile