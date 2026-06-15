import React from 'react'

type Props = {
    text: string, 
    optionalText?: string
    number: number,
}

const TextNum = ({text, optionalText, number}: Props) => {
  return (
    <div className="flex items-center justify-between">
        <div className="flex flex-col">
            <p className="text-sm md:text-lg">{text}</p>
            <p className="text-sm text-gray-300">{optionalText}</p>
        </div>
        <div className="text-white w-5 h-5 rounded-full bg-[#006838] flex justify-center items-center">{number}</div>
    </div>
  )
}

export default TextNum