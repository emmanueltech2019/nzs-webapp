export type InterestItem = {
  interest: string
  state: boolean
  // Add other properties if needed
}


const initalState: InterestItem[] = [
  {
    interest: "Manufacturing & Equipment",
    state: false
  },
  {
    interest: "Food Stock",
    state: false
  },
  {
    interest: "General Retail",
    state: false
  },
  {
    interest: "Construction",
    state: false
  },
  {
    interest: "Furniture",
    state: false
  },
  {
    interest: "Stationery",
    state: false
  },
  {
    interest: "Medical Supplies",
    state: false
  },
  {
    interest: "Electronics",
    state: false
  },
]
export default initalState