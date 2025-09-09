import { SetStateAction } from 'react'

export default interface general_type {
    handleBtnFunc: (...args: any[]) => any
    setCount: React.Dispatch<SetStateAction<number>>
    setSection: React.Dispatch<SetStateAction<1 | 2 | 3 | 'done'>>
    setDisplayCircle?: React.Dispatch<SetStateAction<boolean>>
    setBtnText?: React.Dispatch<SetStateAction<string>>
}