import React from 'react'

const Role = () => {
  return (
    <div>
      <section>
        <div>
          <header>
            <h1 className=' text-2xl text-[#1F2024] md:text-[40px] md:leading-[48.41px] font-[900] mt-[50px]'>
              Let’s know what you’re here to do!
            </h1>
            <p className='text-[14px] md:text-[18px] text-[#71727A] leading-[20px] md:leading-[16px] font-[400] mt-[16px]'>
              Choose your role.
            </p>
          </header>

          <div className="choose-role mt-[41px] flex flex-col gap-2">
            <div className="buy p-4 flex justify-between rounded-[12px] bg-[#EAF2FF] cursor-pointer">
              <p className='text-[14px] text-[#1F2024]'>Buy</p>
              <div className="checkbox h-6 w-6 border-[#C5C6CC] border-[1.5px] rounded-md">
                
              </div>
            </div>
            <div className="sell p-4 flex justify-between rounded-[12px] bg-[#ffffff] border-[#C5C6CC] border-[0.5px] cursor-pointer">
              <p className='text-[14px] text-[#1F2024]'>Sell</p>
              <div className="checkbox h-6 w-6 border-[#C5C6CC] border-[1.5px] rounded-md">
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Role