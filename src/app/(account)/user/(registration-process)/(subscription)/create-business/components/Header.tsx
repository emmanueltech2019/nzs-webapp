import React from 'react'

interface HeaderProps {
    title: string,
    text: string,
}
const Header: React.FC<HeaderProps> = ({title, text}) => {

  return (
    <div>
        <div>
            <header className='mt-3'>
                <h2 className='text-[16px] text-[#1F2024] font-[900] leading-[100%] text-left w-[90%]'>{title}</h2>
                <p className='text-[12px] text-[#71727A] leading-4 tracking-[1%] my-4'>{text}</p>
            </header>
        </div>
    </div>
  )
}

export default Header