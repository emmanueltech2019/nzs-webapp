import React from 'react'
type layoutType = {
    children: React.ReactNode
  
}
const layout = ({children}:layoutType) => {
  return (
    <div>{children}</div>
  )
}

export default layout