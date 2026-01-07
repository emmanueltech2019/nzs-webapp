import React, { Suspense } from 'react'
import ProductDetails from './_components/ProductDetails'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetails />
    </Suspense>
  )
}

export default page