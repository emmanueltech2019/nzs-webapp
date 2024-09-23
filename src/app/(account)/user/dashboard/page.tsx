import React from 'react'
import Card from '@/components/cards/ProductCard';
import Header from '@/components/header/ProductHeader';
import Tabs from '@/components/tabs/ProductAndServiceTab';
import FloatingButton from '@/components/buttons/FloatingButton';
import Carousel from '@/components/carousel/Carousel';
import SortFilter from '@/components/SortFilter/SortFilter';
import ProductGrid from '@/components/Grid/ProductGrid';

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
  return (
    <div className="min-h-screen  md:px-10 px-2 ">

    <Header/>
    <Tabs/>
    <SortFilter/>
    <FloatingButton/>
    <Carousel/>
    <ProductGrid title='Perfect for you'/>
    <ProductGrid title='For this summer'/>
      {/* search component */}
      {/* <div className="grid grid-cols-2 py-10 sm:grid-cols-2 lg:grid-cols-2 gap-6 overflow-y-scroll	">
        {products.map((product, index) => (
          <Card key={index} title={product.title} price={product.price} />
        ))}
      </div> */}
    </div>
  )
}

export default page