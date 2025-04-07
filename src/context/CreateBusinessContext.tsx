// context/CreateBusinessContext.tsx
"use client"
import { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/navigation';

type CreateBusinessContextType = {
  currentIndex: number;
  handleNextStep: () => void;
}

const CreateBusinessContext = createContext<CreateBusinessContextType | undefined>(undefined)

export function CreateBusinessProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const stepsLength = 4; // Number of steps

  const handleNextStep = () => {
    setCurrentIndex((prevStep) => (prevStep === stepsLength - 1 ? 0 : prevStep + 1))

    if(currentIndex === stepsLength -1){
      router.push('./')
    }
  }

  return (
    <CreateBusinessContext.Provider value={{ currentIndex, handleNextStep }}>
      {children}
    </CreateBusinessContext.Provider>
  )
}

export function useCreateBusiness() {
  const context = useContext(CreateBusinessContext)
  if (context === undefined) {
    throw new Error('useCreateBusiness must be used within a CreateBusinessProvider')
  }
  return context
}