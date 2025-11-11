import { Suspense } from "react"
import Main from "./_components/Main"


const page = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
    <div className='px-4 lg:px-[74px]'>
        <Main />
    </div>
    </Suspense>
  )
}

export default page