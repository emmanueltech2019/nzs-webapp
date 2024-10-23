
export interface AccordionPropsType {
    children: React.ReactNode
    title: string
    state: boolean
    onClick: () => void
    batch?: number
    subTitle?: string
  }