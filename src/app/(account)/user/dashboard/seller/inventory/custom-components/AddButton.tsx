import { useProvider } from '@/context/ServicesContext'
import { Ellipsis, Plus } from 'lucide-react'
import React from 'react'

type Props = {
    handleClick: () => void
}

const AddButton = ({handleClick}: Props) => {
  return (
    <div onClick={handleClick} className="flex justify-between items-center border-s-4 ps-5 py-2 border-[#006838] w-full">
        <div className="flex items-center gap-5">
        <p className="text-lg font-bold text-color-gray">NEW SPECIALTY</p>
        <div className="w-10 h-10 rounded-full border-2 border-gray-400 flex justify-center items-center text-lg font-bold">5</div>
        </div>
        <div className="flex items-center gap-3">
            <Ellipsis size={30} strokeWidth={1} className="text-gray-400 text-2xl" />
            <Plus size={30} strokeWidth={1} />
        </div>
    </div>
  )
}

export default AddButton