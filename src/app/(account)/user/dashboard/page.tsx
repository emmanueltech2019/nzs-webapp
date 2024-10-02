"use client"
import React, { useState } from 'react'
import Card from '@/components/cards/ProductCard';
import Header from '@/components/header/ProductHeader';
import Tabs from '@/components/tabs/ProductAndServiceTab';
import FloatingButton from '@/components/buttons/FloatingButton';
import Carousel from '@/components/carousel/Carousel';
import SortFilter from '@/components/SortFilter/SortFilter';
import ProductGrid from '@/components/Grid/ProductGrid';
import { useRouter } from 'next/navigation';
import {default as Service} from './(services)/services/page'

const page = () => {
  const products = [
    { title: 'Amazing Shoes', price: '₦ 12.00' },
    { title: 'Fabulous Shoes', price: '₦ 15.00' },
    { title: 'Fantastic Shoes', price: '₦ 15.00' },
    { title: 'Spectacular Shoes', price: '₦ 12.00' },
    { title: 'Stunning Shoes', price: '₦ 12.00' },
    { title: 'Wonderful Shoes', price: '₦ 15.00' },
    { title: 'Stunning Shoes', price: '₦ 12.00' },
    { title: 'Wonderful Shoes', price: '₦ 15.00' },
  ];
  const [activeTab, setActiveTab] = useState('products');
  const router = useRouter();

  return (
    <div className="min-h-screen">{/*  md:w-[61vw]  */}
      <div className=''>


        <Header />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab == "products" ?
          <>
            <SortFilter />
            <FloatingButton onClick={() => {router.push('./dashboard/add-item')}} />
            <Carousel />
            <ProductGrid title='Perfect for you' />
            <ProductGrid title='For this summer' /></>
          : <>
            <FloatingButton />
            <Service />
          </>}


        {/* search component */}
        {/* <div className="grid grid-cols-2 py-10 sm:grid-cols-2 lg:grid-cols-2 gap-6 overflow-y-scroll	">
        {products.map((product, index) => (
          <Card key={index} title={product.title} price={product.price} />
        ))}
      </div> */}
      </div>

    </div>
  )
}

export default page