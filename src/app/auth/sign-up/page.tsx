import { Suspense } from 'react'
import SignupContent from './_components/SignupContent'


const page = () => {
  return (
    <Suspense fallback={<div className='w-full h-screen flex items-center justify-center'><span className='text-sm text-gray-500'>Loading...</span></div>}>
      <SignupContent />
    </Suspense>
  )
}

export default page