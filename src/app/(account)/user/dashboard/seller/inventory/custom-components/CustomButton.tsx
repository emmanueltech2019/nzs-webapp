'use client'
import React, { SetStateAction, useState } from 'react'

type Props = {
    text?: string;
    setActive?: React.Dispatch<SetStateAction<string>>;
    active?: string, 
    background?:string
    handleClick?: () => void
}

const CustomButton = ({text, setActive, active, background, handleClick}: Props) => {
  return (
    <div onClick={handleClick} className={`${active === text ? "bg-[#006838] text-[#eaf2ff]" : `${background || "bg-[#eaf2ff] text-[#006838]"}`} py-1 px-2 rounded-full`}>{text}</div>
  )
}

export default CustomButton