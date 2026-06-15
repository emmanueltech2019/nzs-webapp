import HealthContext from '@/context/ServicesContext'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({children}: Props) => {
  return (
    <HealthContext>{children}</HealthContext>
  )
}

export default layout