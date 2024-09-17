import React, {useState} from 'react'

const useForm = (s:string) => {
  const [state, setState] = useState(s)
  type setEleType = (e:any) => void
  const setEle:setEleType = (e) => {
    setState(e.target.value)
  }
  const res:[string, setEleType] = [state, setEle]
  return res
}

export default useForm