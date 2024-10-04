"use client"
import React, { useState, Suspense } from 'react'
import Card from '@/components/cards/ProductCard';
import Header from '@/components/header/ProductHeader';
import Tabs from '@/components/tabs/ProductAndServiceTab';
import FloatingButton from '@/components/buttons/FloatingButton';
import Carousel from '@/components/carousel/Carousel';
import SortFilter from '@/components/SortFilter/SortFilter';
import ProductGrid from '@/components/Grid/ProductGrid';
import { useRouter } from 'next/navigation'; //useSearchParams
import Services from './Services';

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
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const main = searchParams.get('main') || '';
  const [activeTab, setActiveTab] = useState('products');

  return (
    <Suspense fallback={<div>loading...</div>}>
    <div className="min-h-screen">{/*  md:w-[61vw]  */}
      <div className=''>

        <Header />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab == "products" ?
          <>
            <SortFilter />
            <FloatingButton color="bg-[#006838]" onClick={() => {router.push('./dashboard/add-item')}} />
            <Carousel />
            <ProductGrid title='Perfect for you' />
            <ProductGrid title='For this summer' /></>
          : <>
            <FloatingButton />
            <Services />
          </>}


        {/* search component */}
        {/* <div className="grid grid-cols-2 py-10 sm:grid-cols-2 lg:grid-cols-2 gap-6 overflow-y-scroll	">
        {products.map((product, index) => (
          <Card key={index} title={product.title} price={product.price} />
        ))}
      </div> */}
      </div>

    </div>
    </Suspense>
  )
}

export default page