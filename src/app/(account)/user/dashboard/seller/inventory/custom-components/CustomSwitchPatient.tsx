import React from 'react'

type Props = {
    active: string;
    setActive: (id: string) => void
    switchTextArray: string[]
}

const CustomSwitchPatient = ({active, switchTextArray, setActive}: Props) => {
  return (
    <div className='flex p-1 bg-[#eaf2ff] w-full rounded-full'>
        {switchTextArray.map((switchText, index) => (
            <div onClick={() => setActive(switchText)} className={`flex-grow p-3 rounded-full ${active === switchText ? "bg-white text-black" : "bg-transparent text-gray-500"} font-bold text-center cursor-pointer`}>{switchText}</div>
        ))}
    </div>
  )
}

export default CustomSwitchPatient